import json
import os
import uuid
from datetime import datetime

import psycopg2
import psycopg2.extras

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Visitor-Id, X-Admin-Key',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
}


def _conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _esc(value: str) -> str:
    return str(value).replace("'", "''")


def _resp(status: int, body):
    return {
        'statusCode': status,
        'headers': CORS,
        'isBase64Encoded': False,
        'body': json.dumps(body, ensure_ascii=False, default=str),
    }


def handler(event: dict, context) -> dict:
    """Чат поддержки: посетитель создаёт диалог и пишет сообщения, оператор отвечает и видит список диалогов"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    if not action:
        try:
            action = (json.loads(event.get('body') or '{}') or {}).get('action', '')
        except Exception:
            action = ''
    headers = event.get('headers') or {}
    visitor_id = headers.get('X-Visitor-Id') or headers.get('x-visitor-id') or ''
    admin_key = headers.get('X-Admin-Key') or headers.get('x-admin-key') or ''
    admin_password = os.environ.get('SUPPORT_ADMIN_PASSWORD', '')
    is_admin = bool(admin_password) and admin_key == admin_password

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            body = {}

    conn = _conn()
    conn.autocommit = True
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        if method == 'POST' and action == 'start':
            vid = visitor_id or uuid.uuid4().hex
            name = _esc(body.get('name') or 'Гость')
            cur.execute(
                f"INSERT INTO support_chats (visitor_id, visitor_name, status) "
                f"VALUES ('{_esc(vid)}', '{name}', 'waiting') "
                f"ON CONFLICT (visitor_id) DO UPDATE SET updated_at = NOW() "
                f"RETURNING id, visitor_id, status"
            )
            chat = cur.fetchone()
            cur.execute(
                f"SELECT COUNT(*) AS c FROM support_messages WHERE chat_id = {chat['id']}"
            )
            if cur.fetchone()['c'] == 0:
                cur.execute(
                    f"INSERT INTO support_messages (chat_id, sender, text) VALUES "
                    f"({chat['id']}, 'system', 'Здравствуйте! Опишите ваш вопрос — оператор скоро подключится.')"
                )
            return _resp(200, {'chatId': chat['id'], 'visitorId': chat['visitor_id'], 'status': chat['status']})

        if method == 'POST' and action == 'send':
            text = (body.get('text') or '').strip()
            sender = body.get('sender', 'user')
            chat_id = int(body.get('chatId') or 0)
            if not text or not chat_id:
                return _resp(400, {'error': 'text and chatId required'})
            if sender != 'operator' or not is_admin:
                sender = 'user'
            cur.execute(
                f"INSERT INTO support_messages (chat_id, sender, text) "
                f"VALUES ({chat_id}, '{sender}', '{_esc(text)}') RETURNING id, created_at"
            )
            msg = cur.fetchone()
            new_status = 'active' if sender == 'operator' else 'waiting'
            cur.execute(
                f"UPDATE support_chats SET updated_at = NOW(), "
                f"status = CASE WHEN status = 'closed' THEN 'waiting' ELSE '{new_status}' END "
                f"WHERE id = {chat_id}"
            )
            return _resp(200, {'id': msg['id'], 'createdAt': msg['created_at']})

        if method == 'GET' and action == 'messages':
            chat_id = int(params.get('chatId') or 0)
            after = int(params.get('after') or 0)
            if not chat_id:
                return _resp(400, {'error': 'chatId required'})
            cur.execute(
                f"SELECT id, sender, text, created_at FROM support_messages "
                f"WHERE chat_id = {chat_id} AND id > {after} ORDER BY id"
            )
            rows = cur.fetchall()
            cur.execute(f"SELECT status FROM support_chats WHERE id = {chat_id}")
            st = cur.fetchone()
            return _resp(200, {
                'messages': rows,
                'status': st['status'] if st else 'waiting',
            })

        if action == 'login':
            provided = body.get('password', '') if method == 'POST' else ''
            if admin_password and provided == admin_password:
                return _resp(200, {'ok': True})
            return _resp(401, {'ok': False, 'error': 'Неверный пароль'})

        if method == 'GET' and action == 'chats':
            if not is_admin:
                return _resp(401, {'error': 'unauthorized'})
            cur.execute(
                "SELECT c.id, c.visitor_name, c.status, c.updated_at, "
                "(SELECT text FROM support_messages m WHERE m.chat_id = c.id ORDER BY m.id DESC LIMIT 1) AS last_text, "
                "(SELECT COUNT(*) FROM support_messages m WHERE m.chat_id = c.id) AS total "
                "FROM support_chats c ORDER BY c.updated_at DESC LIMIT 100"
            )
            return _resp(200, {'chats': cur.fetchall()})

        if method == 'POST' and action == 'status':
            if not is_admin:
                return _resp(401, {'error': 'unauthorized'})
            chat_id = int(body.get('chatId') or 0)
            status = body.get('status', 'active')
            if status not in ('waiting', 'active', 'closed'):
                status = 'active'
            cur.execute(
                f"UPDATE support_chats SET status = '{status}', updated_at = NOW() WHERE id = {chat_id}"
            )
            return _resp(200, {'ok': True, 'status': status})

        return _resp(200, {'ok': True, 'service': 'support'})
    finally:
        cur.close()
        conn.close()