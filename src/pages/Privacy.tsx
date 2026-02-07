import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Вернуться на главную
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-6">
          Политика использования cookies
        </h1>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Что такое cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве 
              при посещении веб-сайтов. Они помогают сайту запоминать информацию о вашем визите, 
              что делает последующие посещения более удобными и полезными.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Какие cookies мы используем?
            </h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Необходимые cookies
                </h3>
                <p className="text-muted-foreground text-sm">
                  Эти файлы необходимы для базовой работы сайта. Они позволяют вам 
                  перемещаться по сайту и использовать его функции. Без этих cookies 
                  некоторые сервисы не могут быть предоставлены.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Функциональные cookies
                </h3>
                <p className="text-muted-foreground text-sm">
                  Эти файлы позволяют сайту запоминать сделанный вами выбор и 
                  предоставлять расширенные персональные функции. Например, сохранение 
                  ваших предпочтений и настроек.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Аналитические cookies
                </h3>
                <p className="text-muted-foreground text-sm">
                  Эти файлы собирают информацию о том, как посетители используют сайт. 
                  Данные используются для улучшения работы сайта и понимания того, 
                  какие страницы наиболее популярны.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Как управлять cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Большинство браузеров автоматически принимают cookies, но вы можете изменить 
              настройки своего браузера, чтобы отклонять cookies, если хотите. Это может 
              помешать вам воспользоваться всеми возможностями сайта.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Вы можете удалить все cookies, которые уже есть на вашем устройстве, и 
              настроить большинство браузеров так, чтобы они не сохранялись. Однако в 
              этом случае вам, возможно, придется каждый раз вручную настраивать некоторые 
              параметры при посещении сайта.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Изменения в политике
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы можем периодически обновлять настоящую Политику использования cookies. 
              Любые изменения будут опубликованы на этой странице с указанием даты 
              последнего обновления.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Контакты
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Если у вас есть вопросы о том, как мы используем cookies, пожалуйста, 
              свяжитесь с нами через форму обратной связи на главной странице.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Последнее обновление: Февраль 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
