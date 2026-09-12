CREATE TABLE IF NOT EXISTS support_chats (
    id SERIAL PRIMARY KEY,
    visitor_id VARCHAR(64) NOT NULL UNIQUE,
    visitor_name VARCHAR(120) DEFAULT 'Гость',
    status VARCHAR(20) NOT NULL DEFAULT 'waiting',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL REFERENCES support_chats(id),
    sender VARCHAR(20) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_support_messages_chat ON support_messages(chat_id, id);
CREATE INDEX IF NOT EXISTS idx_support_chats_updated ON support_chats(updated_at DESC);
