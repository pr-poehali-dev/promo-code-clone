import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

type DiscountType = 'percent' | 'fixed' | 'free_delivery';

interface Promo {
  id: number;
  store: string;
  logo: string;
  code: string;
  description: string;
  discount: string;
  type: DiscountType;
  expiresAt: string;
}

const promos: Promo[] = [
  {
    id: 1,
    store: 'Ozon',
    logo: '🛒',
    code: 'SAVE2024',
    description: 'Скидка на первый заказ',
    discount: '15%',
    type: 'percent',
    expiresAt: '31.12.2024'
  },
  {
    id: 2,
    store: 'Wildberries',
    logo: '🛍️',
    code: 'WB1000',
    description: 'Скидка 1000₽ на заказ от 5000₽',
    discount: '1000₽',
    type: 'fixed',
    expiresAt: '15.01.2025'
  },
  {
    id: 3,
    store: 'Lamoda',
    logo: '👗',
    code: 'FREESHIP',
    description: 'Бесплатная доставка при заказе от 2000₽',
    discount: 'Доставка',
    type: 'free_delivery',
    expiresAt: '28.02.2025'
  },
  {
    id: 4,
    store: 'Яндекс Маркет',
    logo: '🏪',
    code: 'YANDEX20',
    description: 'Скидка на электронику',
    discount: '20%',
    type: 'percent',
    expiresAt: '10.03.2025'
  },
  {
    id: 5,
    store: 'М.Видео',
    logo: '📱',
    code: 'MVIDEO500',
    description: 'Скидка на смартфоны',
    discount: '500₽',
    type: 'fixed',
    expiresAt: '05.02.2025'
  },
  {
    id: 6,
    store: 'СберМегаМаркет',
    logo: '🛒',
    code: 'SBER25',
    description: 'Скидка для новых покупателей',
    discount: '25%',
    type: 'percent',
    expiresAt: '20.03.2025'
  },
  {
    id: 7,
    store: 'Яндекс Еда',
    logo: '🍕',
    code: 'YANDEXEDA',
    description: 'Бесплатная доставка еды',
    discount: 'Доставка',
    type: 'free_delivery',
    expiresAt: '31.01.2025'
  },
  {
    id: 8,
    store: 'Читай-город',
    logo: '📚',
    code: 'BOOK300',
    description: 'Скидка на книги',
    discount: '300₽',
    type: 'fixed',
    expiresAt: '15.02.2025'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<DiscountType[]>([]);
  const { toast } = useToast();

  const toggleType = (type: DiscountType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const copyPromoCode = (code: string, store: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Промокод скопирован!',
      description: `${store}: ${code}`,
    });
  };

  const filteredPromos = promos.filter(promo => {
    const matchesSearch = promo.store.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(promo.type);
    return matchesSearch && matchesType;
  });

  const getTypeLabel = (type: DiscountType) => {
    const labels = {
      percent: 'Процент',
      fixed: 'Рубли',
      free_delivery: 'Доставка'
    };
    return labels[type];
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-secondary-foreground py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">ПромоКоды</h1>
          <p className="text-sm mt-2 opacity-90">Актуальные промокоды от популярных магазинов</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск по магазину..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-foreground mr-2 self-center">Тип скидки:</span>
            {(['percent', 'fixed', 'free_delivery'] as DiscountType[]).map(type => (
              <Badge
                key={type}
                variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => toggleType(type)}
              >
                {getTypeLabel(type)}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromos.map(promo => (
            <Card key={promo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{promo.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{promo.store}</CardTitle>
                      <CardDescription className="text-xs">до {promo.expiresAt}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-base font-bold">
                    {promo.discount}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{promo.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted px-4 py-2 rounded-md font-mono text-sm font-semibold text-center border-2 border-dashed border-border">
                    {promo.code}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyPromoCode(promo.code, promo.store)}
                    className="shrink-0"
                  >
                    <Icon name="Copy" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPromos.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Промокоды не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </main>

      <footer className="bg-secondary text-secondary-foreground py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2024 ПромоКоды. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;