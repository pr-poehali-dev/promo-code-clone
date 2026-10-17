import { useQuery } from '@tanstack/react-query';

export interface FeedItem {
  title: string;
  link: string;
  text: string;
  date: string;
  source: string;
  sport: string;
  image: string | null;
}

export interface MatchTeam {
  name: string;
  logo?: string;
  score: string | null;
}

export interface Match {
  id: string;
  date: string;
  league: string;
  sport: 'football' | 'hockey' | 'basketball';
  link?: string;
  order?: number;
  state: 'pre' | 'in' | 'post';
  clock: string | null;
  home: MatchTeam;
  away: MatchTeam;
}

const FEED_URL = 'https://functions.poehali.dev/824b1d14-e69b-4ead-afe4-c863074a7028';

export const useFeed = (type: 'news' | 'sport' | 'forecasts') =>
  useQuery({
    queryKey: ['feed', type],
    queryFn: async (): Promise<FeedItem[]> => {
      const r = await fetch(`${FEED_URL}?type=${type}`);
      if (!r.ok) throw new Error('feed');
      const d = await r.json();
      return d.items ?? [];
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
  });

const loadDay = async (day: number): Promise<Match[]> => {
  const r = await fetch(`${FEED_URL}?type=matches&day=${day}`);
  if (!r.ok) throw new Error('matches');
  const d = await r.json();
  return d.items ?? [];
};

export const useMatches = () =>
  useQuery({
    queryKey: ['matches'],
    queryFn: async (): Promise<Match[]> => {
      const res = await Promise.allSettled([0, 1, 2].map(loadDay));
      const all = res.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
      if (res.every((r) => r.status === 'rejected')) throw new Error('matches');
      const seen = new Set<string>();
      return all
        .filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
        .sort((a, b) => a.date.localeCompare(b.date));
    },
    staleTime: 60 * 1000,
    refetchInterval: 90 * 1000,
    retry: 2,
  });
