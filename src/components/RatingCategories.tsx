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

const groups = ['По видам спорта', 'Букмекерские конторы', 'Зарубежные букмекеры'];

const RatingCategories = ({ items, active, onSelect }: Props) => (
  <aside className="rounded-2xl bg-secondary p-5 ring-1 ring-border">
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

    <div className="mt-4 space-y-2">
      {groups.map((g) => (
        <div
          key={g}
          className="flex items-center justify-between rounded-lg bg-muted/70 px-3 py-2.5 text-sm text-muted-foreground"
        >
          <span>{g}</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      ))}
    </div>
  </aside>
);

export default RatingCategories;
