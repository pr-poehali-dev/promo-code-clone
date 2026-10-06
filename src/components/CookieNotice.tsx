import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-card border border-border rounded-lg shadow-2xl p-5">
        <button
          onClick={handleAccept}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>
        
        <div className="pr-6">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Продолжая работу с сайтом, вы подтверждаете использование cookies.{' '}
            <a 
              href="/privacy" 
              className="text-primary hover:underline"
            >
              Подробнее
            </a>
          </p>
          
          <button
            onClick={handleAccept}
            className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity px-4 py-2 rounded-md text-sm font-medium"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
