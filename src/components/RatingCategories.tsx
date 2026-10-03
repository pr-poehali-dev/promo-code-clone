import Icon from '@/components/ui/icon';

export interface CategoryItem {
  id: string;
  label: string;
}

interface Props {
  items: CategoryItem[];
  active: string;
  onSelect: (id: string) => void;
}

const RatingCategories = ({ items, active, onSelect }: Props) => (
  <>
    <div className="lg:hidden">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Подборки
      </div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
              active === c.id
                ? 'bg-[hsl(var(--violet))] text-white shadow-sm'
                : 'bg-white text-muted-foreground ring-1 ring-border'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>

    <aside className="hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border lg:block">
      <h3 className="mb-4 text-lg font-bold text-secondary-foreground">Рейтинги букмекеров</h3>

      <ul className="space-y-1">
        {items.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                active === c.id
                  ? 'bg-muted font-semibold text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-secondary-foreground'
              }`}
            >
              <span>{c.label}</span>
              {active === c.id && (
                <Icon name="Check" size={16} className="text-accent shrink-0" />
              )}
            </button>
          </li>
        ))}
      </ul>

    </aside>
  </>
);

export default RatingCategories;
