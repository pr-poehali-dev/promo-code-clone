import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { SUPPORT_URL } from '@/lib/support';

interface Chat {
  id: number;
  visitor_name: string;
  status: string;
  updated_at: string;
  last_text: string | null;
  total: number;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  created_at: string;
}

const statusLabel: Record<string, string> = {
  waiting: 'Ждёт ответа',
  active: 'В работе',
  closed: 'Закрыт',
};

const KEY_STORAGE = 'support_admin_key';

const SupportAdmin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [checking, setChecking] = useState(false);
  const adminKey = useRef('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(KEY_STORAGE);
    if (saved) {
      adminKey.current = saved;
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    const load = async () => {
      try {
        const res = await fetch(
          `${SUPPORT_URL}?action=chats&key=${encodeURIComponent(adminKey.current)}`,
          { headers: { 'X-Admin-Key': adminKey.current } },
        );
        if (res.status === 401) {
          localStorage.removeItem(KEY_STORAGE);
          setAuthed(false);
          return;
        }
        const data = await res.json();
        setChats(data.chats || []);
      } catch {
        /* игнорируем разрыв сети */
      }
    };
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, [authed]);

  useEffect(() => {
    if (!activeId || !authed) return;
    const load = async () => {
      try {
        const res = await fetch(`${SUPPORT_URL}?action=messages&chatId=${activeId}&after=0`);
        const data = await res.json();
        setMessages(data.messages || []);
      } catch {
        /* игнорируем разрыв сети */
      }
    };
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [activeId]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const value = text.trim();
    if (!value || !activeId) return;
    setText('');
    setMessages((prev) => [
      ...prev,
      { id: -Date.now(), sender: 'operator', text: value, created_at: new Date().toISOString() },
    ]);
    await fetch(`${SUPPORT_URL}?action=send&key=${encodeURIComponent(adminKey.current)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey.current },
      body: JSON.stringify({ chatId: activeId, sender: 'operator', text: value }),
    });
    try {
      const res = await fetch(`${SUPPORT_URL}?action=messages&chatId=${activeId}&after=0`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      /* обновится следующим циклом */
    }
  };

  const closeChat = async () => {
    if (!activeId) return;
    await fetch(`${SUPPORT_URL}?action=status&key=${encodeURIComponent(adminKey.current)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey.current },
      body: JSON.stringify({ chatId: activeId, status: 'closed' }),
    });
  };

  const login = async () => {
    const value = password.trim();
    if (!value) return;
    setChecking(true);
    setAuthError('');
    try {
      const res = await fetch(`${SUPPORT_URL}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password: value }),
      });
      if (res.ok) {
        adminKey.current = value;
        localStorage.setItem(KEY_STORAGE, value);
        setPassword('');
        setAuthed(true);
      } else {
        setAuthError('Неверный пароль');
      }
    } catch {
      setAuthError('Не удалось подключиться');
    } finally {
      setChecking(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(KEY_STORAGE);
    adminKey.current = '';
    setAuthed(false);
    setChats([]);
    setActiveId(null);
    setMessages([]);
  };

  const waiting = chats.filter((c) => c.status === 'waiting').length;
  const active = chats.find((c) => c.id === activeId);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-card border border-border rounded-xl p-6">
          <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center mb-4">
            <Icon name="Lock" size={22} className="text-accent" />
          </div>
          <h1 className="text-xl font-bold mb-1">Панель поддержки</h1>
          <p className="text-sm text-muted-foreground mb-5">
            Введите пароль оператора, чтобы открыть диалоги.
          </p>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Пароль"
            className="mb-3"
            autoFocus
          />

          {authError && <p className="text-sm text-red-500 mb-3">{authError}</p>}

          <Button
            onClick={login}
            disabled={checking}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {checking ? 'Проверяем...' : 'Войти'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="bg-secondary border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <Icon name="Headset" size={19} className="text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-bold leading-tight">Панель поддержки</h1>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Диалоги с посетителями сайта
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {waiting > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-yellow-500 font-semibold">{waiting} ждут ответа</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
            <Icon name="LogOut" size={15} />
            Выйти
          </Button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="w-72 border-r border-border overflow-y-auto shrink-0">
          {chats.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Пока нет обращений
            </div>
          )}
          {chats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full text-left px-3 py-3 border-b border-border transition-colors ${
                activeId === c.id ? 'bg-accent/10' : 'hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">
                  {c.visitor_name} #{c.id}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    c.status === 'waiting'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : c.status === 'active'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {statusLabel[c.status] ?? c.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{c.last_text}</p>
            </button>
          ))}
        </aside>

        <section className="flex-1 flex flex-col min-w-0">
          {!activeId ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Icon name="MessagesSquare" size={48} />
              <p className="text-sm">Выберите диалог слева</p>
            </div>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="text-sm font-semibold">
                  {active?.visitor_name} #{activeId}
                </div>
                <Button variant="outline" size="sm" onClick={closeChat} className="gap-1.5">
                  <Icon name="CheckCheck" size={15} />
                  Закрыть обращение
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === 'operator' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                        m.sender === 'operator'
                          ? 'bg-accent text-accent-foreground rounded-br-sm'
                          : m.sender === 'system'
                            ? 'bg-muted text-muted-foreground text-xs'
                            : 'bg-secondary rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={bottom} />
              </div>

              <div className="border-t border-border p-3 flex gap-2">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ответ оператора..."
                />
                <Button
                  onClick={send}
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Icon name="Send" size={16} />
                  Отправить
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default SupportAdmin;