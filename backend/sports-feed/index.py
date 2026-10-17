import gzip
import json
import re
import time
import html
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

from matches import parse_day, day_urls

MSK = timezone(timedelta(hours=3))
UA = 'Mozilla/5.0 (compatible; BKrating/1.0)'
CACHE: dict = {}
TTL = {'matches': 90, 'forecasts': 600, 'sport': 300, 'news': 300}

FEEDS = {
    'forecasts': [('https://www.championat.com/rss/news/bets/', 'Чемпионат')],
    'sport': [
        ('https://www.sports.ru/rss/all_news.xml', 'Sports.ru'),
        ('https://www.championat.com/rss/news/', 'Чемпионат'),
    ],
    'news': [
        ('https://www.sport-express.ru/services/materials/news/se/', 'Спорт-Экспресс'),
        ('https://www.sports.ru/rss/topnews.xml', 'Sports.ru'),
        ('https://www.championat.com/rss/news/bets/', 'Чемпионат'),
    ],
}

SPORT_MAP = {
    'футбол': 'Футбол', 'хоккей': 'Хоккей', 'теннис': 'Теннис', 'баскетбол': 'Баскетбол',
    'бокс': 'Единоборства', 'мма': 'Единоборства', 'биатлон': 'Биатлон', 'формула': 'Авто', 'авто': 'Авто',
    'фигурн': 'Фигурное катание',
}

CORS = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}


def fetch(url: str, timeout: float = 2.5) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Encoding': 'gzip'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
        return gzip.decompress(data) if r.headers.get('Content-Encoding') == 'gzip' else data


def clean(text: str) -> str:
    text = re.sub(r'<[^>]+>', ' ', html.unescape(text or ''))
    return re.sub(r'\s+', ' ', text.replace('\xa0', ' ')).strip()


def sport_of(cats: list) -> str:
    for c in cats:
        low = (c or '').lower()
        for k, v in SPORT_MAP.items():
            if k in low:
                return v
    return 'Другое'


def parse_feed(url: str, source: str) -> list:
    try:
        root = ET.fromstring(fetch(url))
    except Exception:
        return []
    items = []
    for it in root.findall('channel/item'):
        title = clean(it.findtext('title'))
        link = (it.findtext('link') or '').strip()
        if not title or not link:
            continue
        try:
            dt = parsedate_to_datetime(it.findtext('pubDate') or '')
        except Exception:
            continue
        cats = [c.text or '' for c in it.findall('category') if not c.get('domain')]
        img = it.find('enclosure')
        items.append({
            'title': title,
            'link': link,
            'text': clean(it.findtext('description'))[:220],
            'date': dt.astimezone(timezone.utc).isoformat(),
            'source': source,
            'sport': sport_of(cats + [link]),
            'image': img.get('url') if img is not None and (img.get('type') or '').startswith('image') else None,
        })
    return items


def is_forecast(title: str) -> bool:
    t = title.lower()
    return '—' in title or 'прогноз' in t or 'ставк' in t or 'фаворит' in t


def build_feed(kind: str) -> list:
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda f: parse_feed(*f), FEEDS[kind]))
    items = [i for r in results for i in r]
    if kind == 'forecasts':
        items = [i for i in items if is_forecast(i['title'])]
    if kind == 'news':
        items = [i for i in items if not (i['source'] == 'Чемпионат' and is_forecast(i['title']))]
    seen, out = set(), []
    for i in sorted(items, key=lambda x: x['date'], reverse=True):
        key = i['title'].lower()[:60]
        if key in seen:
            continue
        seen.add(key)
        out.append(i)
    return out[:60]


def build_matches(day_idx: int) -> list:
    url, day = day_urls()[day_idx]
    try:
        items = parse_day(fetch(url, 4.3).decode('utf-8', 'ignore'), day)
    except Exception as e:
        print(f'matches {url}: {e!r}')
        return []
    seen, out = set(), []
    for m in sorted(items, key=lambda x: (x['date'], x['order'])):
        if m['id'] in seen:
            continue
        seen.add(m['id'])
        out.append(m)
    return out


def handler(event: dict, context) -> dict:
    """Живые данные для разделов сайта: матчи, прогнозы, спорт, новости."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {
            'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    qs = event.get('queryStringParameters') or {}
    kind = (qs.get('type') or 'news').lower()
    day_idx = int(qs.get('day') or 0) if str(qs.get('day') or '0') in ('0', '1', '2') else 0
    if kind not in TTL:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'unknown type'})}

    ckey = f'{kind}:{day_idx}' if kind == 'matches' else kind
    ttl = TTL[kind] if kind != 'matches' or day_idx == 0 else 900
    cached = CACHE.get(ckey)
    if cached and time.time() - cached[0] < ttl:
        items = cached[1]
    else:
        items = build_matches(day_idx) if kind == 'matches' else build_feed(kind)
        if items:
            CACHE[ckey] = (time.time(), items)
        elif cached:
            items = cached[1]

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Cache-Control': f'public, max-age={60 if kind != "matches" or day_idx == 0 else 600}'},
        'body': json.dumps({'type': kind, 'updated': datetime.now(timezone.utc).isoformat(), 'items': items}, ensure_ascii=False),
    }
