export interface Bookmaker {
  id: number;
  name: string;
  logo: string;
  image?: string;
  wideLogo?: boolean;
  short?: string;
  color?: string;
  route?: string;
  siteUrl?: string;
  rating: number;
  bonus: string;
  bonusNote: string;
  bonusTerms: string;
  promo?: string;
  reviews: number;
  minDeposit: string;
  payout: string;
  license: string;
  features: string[];
  scores: { odds: number; payout: number; app: number; support: number };
}

export const bookmakers: Bookmaker[] = [
  {
    id: 3,
    name: 'Fonbet',
    logo: '🏆',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/4525a0ea-f40b-4528-b706-3a236ddfe490.png',
    wideLogo: true,
    route: '/bk/fonbet',
    siteUrl: 'https://clck.ru/3VtMMk',
    rating: 4.9,
    bonus: '15 000₽',
    bonusNote: 'фрибет за первый депозит',
    bonusTerms:
      'Зарегистрируйтесь, пройдите идентификацию и пополните счёт от 100₽ — фрибет начисляется в размере депозита, максимум 15 000₽. Отыграть нужно за 14 дней ставками с коэффициентом от 1.50.',
    promo: 'BONUS15',
    reviews: 912,
    minDeposit: '100₽',
    payout: 'до 2 часов',
    license: 'ЕЦУПИС',
    features: ['Надежная БК', 'Пункты приема ставок', 'Акции и бонусы'],
    scores: { odds: 4.8, payout: 5.0, app: 4.9, support: 4.8 },
  },
  {
    id: 6,
    name: 'Winline',
    logo: '💎',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/8d6270e2-1647-4fdf-9a47-adce0f72b65c.png',
    wideLogo: true,
    route: '/bk/winline',
    siteUrl: 'https://clck.ru/3VtMFT',
    rating: 4.9,
    bonus: '10 000₽',
    bonusNote: 'фрибет новичкам',
    bonusTerms:
      'Фрибет выдаётся после регистрации и первого пополнения от 100₽. Ставку можно сделать на любое событие с коэффициентом от 1.80, выигрыш зачисляется на основной счёт без вычета суммы фрибета.',
    promo: 'START3000',
    reviews: 289,
    minDeposit: '100₽',
    payout: 'до 3 часов',
    license: 'ЕЦУПИС',
    features: ['Простая регистрация', 'Быстрая верификация', 'Поддержка 24/7'],
    scores: { odds: 4.7, payout: 4.9, app: 5.0, support: 4.9 },
  },
  {
    id: 1,
    name: 'BetBoom',
    logo: '🎰',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/ea087e06-1d7a-4562-8333-979f9ef17a88.png',
    wideLogo: true,
    route: '/bk/betboom',
    siteUrl: 'https://clck.ru/3VtMVA',
    rating: 4.9,
    bonus: '10 000₽',
    bonusNote: 'бонус на первый депозит',
    bonusTerms:
      'Бонус удваивает первое пополнение до 10 000₽. Для вывода средств нужно прокрутить сумму бонуса пять раз ординарами или экспрессами с коэффициентом от 1.40 в течение 30 дней.',
    promo: 'BOOM10',
    reviews: 847,
    minDeposit: '100₽',
    payout: 'до 1 часа',
    license: 'ЕЦУПИС',
    features: ['Высокие коэффициенты', 'Быстрый вывод', 'Мобильное приложение'],
    scores: { odds: 4.9, payout: 5.0, app: 4.8, support: 4.7 },
  },
  {
    id: 5,
    name: 'Leon',
    logo: '🦁',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/7fe075d0-0cb7-4fd7-95d0-c3310a9f6e66.png',
    wideLogo: true,
    route: '/bk/leon',
    siteUrl: '',
    rating: 4.6,
    bonus: '1 000₽',
    bonusNote: 'приветственный пакет',
    bonusTerms:
      'Пакет из нескольких фрибетов на общую сумму до 40 000₽ выдаётся частями: за регистрацию, за первое пополнение и за первую ставку. Каждый фрибет действует 7 дней.',
    promo: 'LEON40',
    reviews: 734,
    minDeposit: '100₽',
    payout: 'до 12 часов',
    license: 'ЕЦУПИС',
    features: ['Удобный интерфейс', 'Бонусы новичкам', 'Стабильная работа'],
    scores: { odds: 4.5, payout: 4.4, app: 4.7, support: 4.6 },
  },
  {
    id: 4,
    name: 'Melbet',
    logo: '🎯',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/aabf2f54-1325-4b18-9682-d8138a5d6248.png',
    wideLogo: true,
    route: '/bk/melbet',
    siteUrl: 'https://clck.ru/3VtMKf',
    rating: 4.7,
    bonus: '30 000₽',
    bonusNote: 'бонус на первый депозит',
    bonusTerms:
      'Стартовый бонус до 30 000₽ начисляется на бонусный счёт после пополнения от 50₽. Отыгрыш пятикратный, засчитываются экспрессы из трёх и более событий с коэффициентом от 1.40.',
    promo: 'MEL30',
    reviews: 456,
    minDeposit: '50₽',
    payout: 'до 24 часов',
    license: 'ЕЦУПИС',
    features: ['Киберспорт', 'Live-ставки', 'Промокоды'],
    scores: { odds: 4.7, payout: 4.3, app: 4.6, support: 4.5 },
  },
  {
    id: 7,
    name: 'Париматч',
    route: '/bk/pari',
    siteUrl: 'https://clck.ru/3VtMCv',
    logo: '🎪',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/00a4177a-1afb-4e61-b1a8-9a10ef9395ad.png',
    wideLogo: true,
    short: 'ПМ',
    color: 'bg-amber-500',
    rating: 4.6,
    bonus: '5 000₽',
    bonusNote: 'фрибет за регистрацию',
    bonusTerms:
      'Фрибет до 5 000₽ доступен после регистрации и идентификации. Размер зависит от суммы первого депозита, ставку нужно сделать в течение 7 дней на событие с коэффициентом от 1.50.',
    promo: 'PM5000',
    reviews: 512,
    minDeposit: '100₽',
    payout: 'до 4 часов',
    license: 'ЕЦУПИС',
    features: ['Быстрая линия', 'Экспресс-бонус', 'Кэшаут'],
    scores: { odds: 4.6, payout: 4.6, app: 4.5, support: 4.5 },
  },
  {
    id: 8,
    name: 'Лига Ставок',
    route: '/bk/ligastavok',
    siteUrl: '',
    logo: '🏅',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/b62536c7-77c8-4d46-9a63-86c4f9beeda1.png',
    wideLogo: true,
    short: 'ЛС',
    color: 'bg-blue-600',
    rating: 4.5,
    bonus: '8 000₽',
    bonusNote: 'страховка первой ставки',
    bonusTerms:
      'Если первая ставка до 8 000₽ окажется проигрышной, сумма возвращается фрибетом. Условие — пройденная идентификация и коэффициент события не ниже 1.50.',
    promo: 'LS8000',
    reviews: 638,
    minDeposit: '50₽',
    payout: 'до 6 часов',
    license: 'ЕЦУПИС',
    features: ['Официальный партнёр РФС', 'Клубные ставки', 'Бонусная программа'],
    scores: { odds: 4.4, payout: 4.5, app: 4.6, support: 4.7 },
  },
  {
    id: 9,
    name: 'Betcity',
    route: '/bk/betcity',
    siteUrl: '',
    logo: '🌆',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/671cb343-0526-43bc-9a85-6f37e64a742a.png',
    wideLogo: true,
    short: 'BC',
    color: 'bg-red-600',
    rating: 4.4,
    bonus: '2 000₽',
    bonusNote: 'фрибет новым игрокам',
    bonusTerms:
      'Фрибет 2 000₽ выдаётся за первое пополнение от 100₽. Использовать его нужно одной ставкой на событие с коэффициентом от 2.00, срок действия — 10 дней.',
    promo: 'BC2000',
    reviews: 374,
    minDeposit: '100₽',
    payout: 'до 8 часов',
    license: 'ЕЦУПИС',
    features: ['Глубокая роспись', 'Ставки на политику', 'Мультиставка'],
    scores: { odds: 4.5, payout: 4.2, app: 4.3, support: 4.4 },
  },
  {
    id: 10,
    name: 'Марафон',
    route: '/bk/marathon',
    siteUrl: 'https://clck.ru/3VtM9s',
    logo: '🏃',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/daa7a66f-c360-435e-b09d-51867b3e2d6d.png',
    wideLogo: true,
    short: 'MB',
    color: 'bg-emerald-700',
    rating: 4.5,
    bonus: '30 000₽',
    bonusNote: 'бонус к депозиту',
    bonusTerms:
      'Бонус до 30 000₽ начисляется на первое пополнение. Отыгрыш трёхкратный ставками с коэффициентом от 1.60, срок — 30 дней с момента активации.',
    promo: 'MB30000',
    reviews: 421,
    minDeposit: '100₽',
    payout: 'до 5 часов',
    license: 'ЕЦУПИС',
    features: ['Низкая маржа', 'Высокие лимиты', 'Без резки счетов'],
    scores: { odds: 4.9, payout: 4.4, app: 4.2, support: 4.3 },
  },
  {
    id: 12,
    name: 'Олимпбет',
    route: '/bk/olimpbet',
    siteUrl: '',
    logo: '🔥',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/622ad6e2-e39f-4b68-8035-b02b03563832.png',
    wideLogo: true,
    short: 'OB',
    color: 'bg-orange-600',
    rating: 4.4,
    bonus: '15 000₽',
    bonusNote: 'до 100% на первый депозит',
    bonusTerms:
      'Удвоение первого депозита до 15 000₽. Бонусные средства отыгрываются ставками с коэффициентом от 1.50, оборот — четырёхкратный, срок 21 день.',
    promo: 'OB15',
    reviews: 349,
    minDeposit: '100₽',
    payout: 'до 6 часов',
    license: 'ЕЦУПИС',
    features: ['Много акций', 'Ставки на киберспорт', 'Live-трансляции'],
    scores: { odds: 4.4, payout: 4.3, app: 4.5, support: 4.4 },
  },
  {
    id: 15,
    name: 'BetM',
    route: '/bk/betm',
    siteUrl: '',
    logo: '🅱️',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/913163ae-8a81-412e-adfa-f426d36cd2b3.png',
    wideLogo: true,
    short: 'BM',
    color: 'bg-indigo-600',
    rating: 4.3,
    bonus: '3 000₽',
    bonusNote: 'фрибет за первый депозит',
    bonusTerms:
      'Фрибет до 3 000₽ начисляется после регистрации и пополнения счёта от 100₽. Ставку нужно сделать в течение 14 дней на событие с коэффициентом от 1.60.',
    promo: 'BETM3000',
    reviews: 214,
    minDeposit: '100₽',
    payout: 'до 8 часов',
    license: 'ЕЦУПИС',
    features: ['Удобное приложение', 'Быстрые выплаты', 'Частые акции'],
    scores: { odds: 4.3, payout: 4.4, app: 4.4, support: 4.2 },
  },
  {
    id: 16,
    name: 'Балтбет',
    route: '/bk/baltbet',
    siteUrl: '',
    logo: '🟢',
    image:
      'https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/0dee2a2b-2e22-4083-ae84-a57e8fc9de18.png',
    wideLogo: true,
    short: 'ББ',
    color: 'bg-green-600',
    rating: 4.4,
    bonus: '8 000₽',
    bonusNote: 'фрибет за первый депозит',
    bonusTerms:
      'Фрибет до 8 000₽ начисляется после регистрации, идентификации и первого пополнения от 100₽. Ставку нужно сделать в течение 14 дней на событие с коэффициентом от 1.50.',
    promo: 'BALT8000',
    reviews: 398,
    minDeposit: '100₽',
    payout: 'до 6 часов',
    license: 'ЕЦУПИС',
    features: ['Пункты приема ставок', 'Экспресс дня', 'Кэшаут'],
    scores: { odds: 4.4, payout: 4.5, app: 4.3, support: 4.4 },
  },
];