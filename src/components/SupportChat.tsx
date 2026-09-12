import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { SUPPORT_URL } from '@/lib/support';

interface Message {
  id: number;
  sender: string;
  text: string;
  created_at: string;
}

const VISITOR_KEY = 'support_visitor_id';
const CHAT_KEY = 'support_chat_id';

const getVisitorId = () => {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
};

const SupportChat = () => {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('waiting');
  const lastId = useRef(0);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(CHAT_KEY);
    if (saved) {
      setChatId(Number(saved));
      setStarted(true);
    }
  }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!chatId || !open) return;

    const load = async () => {
      try {
        const res = await fetch(
          `${SUPPORT_URL}?action=messages&chatId=${chatId}&after=${lastId.current}`,
        );
        const data = await res.json();
        if (data.messages?.length) {
          lastId.current = data.messages[data.messages.length - 1].id;
          setMessages((prev) => [...prev, ...data.messages]);
        }
        if (data.status) setStatus(data.status);
      } catch {
        /* сеть недоступна — попробуем в следующий раз */
      }
    };

    load();
    const timer = setInterval(load, 3000);
    return () => clearInterval(timer);
  }, [chatId, open]);

  const startChat = async () => {
    setConnecting(true);
    try {
      const res = await fetch(`${SUPPORT_URL}?action=start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Visitor-Id': getVisitorId() },
        body: JSON.stringify({ name: 'Гость' }),
      });
      const data = await res.json();
      if (data.chatId) {
        localStorage.setItem(CHAT_KEY, String(data.chatId));
        setChatId(data.chatId);
        setStarted(true);
      }
    } finally {
      setConnecting(false);
    }
  };

  const send = async () => {
    const value = text.trim();
    if (!value || !chatId) return;
    setText('');
    setMessages((prev) => [
      ...prev,
      { id: -Date.now(), sender: 'user', text: value, created_at: new Date().toISOString() },
    ]);
    await fetch(`${SUPPORT_URL}?action=send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, sender: 'user', text: value }),
    });
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Открыть чат поддержки"
        >
          <Icon name="MessageCircle" size={26} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-40 w-[calc(100vw-2.5rem)] sm:w-[370px] h-[520px] max-h-[80vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-secondary px-4 py-3 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                <Icon name="Headset" size={18} className="text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold">Поддержка</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}
                  />
                  {status === 'active' ? 'Оператор на связи' : 'Обычно отвечаем за 5 минут'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Закрыть чат"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {!started ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
                <Icon name="MessagesSquare" size={30} className="text-accent" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Нужна помощь?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ответим на вопросы о букмекерах, бонусах и работе сайта.
                </p>
              </div>
              <Button
                onClick={startChat}
                disabled={connecting}
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
              >
                {connecting ? 'Подключаем оператора...' : 'Задать вопрос'}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-accent text-accent-foreground rounded-br-sm'
                          : m.sender === 'system'
                            ? 'bg-muted text-muted-foreground text-xs'
                            : 'bg-secondary rounded-bl-sm'
                      }`}
                    >
                      {m.sender === 'operator' && (
                        <div className="text-[10px] text-accent font-semibold mb-0.5">
                          Оператор
                        </div>
                      )}
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={bottom} />
              </div>

              <div className="border-t border-border p-2 flex gap-2">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Напишите сообщение..."
                  className="h-10"
                />
                <Button
                  onClick={send}
                  size="icon"
                  className="h-10 w-10 shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Icon name="Send" size={17} />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SupportChat;
