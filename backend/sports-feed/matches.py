import re
import html as H
from datetime import datetime, timedelta, timezone

MSK = timezone(timedelta(hours=3))

TOP = {
    'Чемпионат России. Премьер-лига': ('РПЛ', 'football', 1),
    'Лига чемпионов': ('Лига чемпионов', 'football', 2),
    'Лига Европы': ('Лига Европы', 'football', 3),
    'Лига конференций': ('Лига конференций', 'football', 4),
    'Кубок России': ('Кубок России', 'football', 5),
    'Чемпионат Англии. Премьер-лига': ('АПЛ', 'football', 6),
    'Чемпионат Испании. Ла лига': ('Ла Лига', 'football', 7),
    'Чемпионат Италии. Серия А': ('Серия А', 'football', 8),
    'Чемпионат Германии. Бундеслига 1': ('Бундеслига', 'football', 9),
    'Чемпионат Франции. Лига 1': ('Лига 1', 'football', 10),
    'Россия. Лига PARI (ФНЛ)': ('Первая лига', 'football', 11),
    'FONBET Чемпионат КХЛ': ('КХЛ', 'hockey', 12),
    'НХЛ. Регулярный чемпионат': ('НХЛ', 'hockey', 13),
    'НХЛ. Плей-офф': ('НХЛ', 'hockey', 13),
    'Единая лига ВТБ': ('Единая лига ВТБ', 'basketball', 14),
}

COMP_RE = re.compile(r'class="se-matchcenter-sports-list__competition">')
H3_RE = re.compile(r'<h3>(.*?)</h3>', re.S)
MATCH_RE = re.compile(
    r'<a href="([^"]+)"\s+class="se-matchcenter-matches__match se-matchcenter-matches__match--status-([\w-]+)">(.*?)</a>',
    re.S,
)
TIME_RE = re.compile(r'__match-date">\s*([^<]*?)\s*</div>', re.S)
STATUS_RE = re.compile(r'__match-status">\s*([^<]*?)\s*</div>', re.S)
NAME_RE = re.compile(r'__match-team__name" title="([^"]*)"')
LOGO_RE = re.compile(r'__match-team__logo">\s*<img src="([^"]+)"')
SCORE_RE = re.compile(r'__match-score">\s*([^<]*?)\s*<', re.S)


def _key(title: str):
    t = title.strip()
    if t in TOP:
        return TOP[t]
    for k, v in TOP.items():
        if t.startswith(k):
            return v
    return None


def match_by_title(title: str):
    return _key(H.unescape(title))


def parse_day(page: str, day: datetime) -> list:
    out = []
    starts = [m.start() for m in COMP_RE.finditer(page)] + [len(page)]
    for a, b in zip(starts, starts[1:]):
        block = page[a:b]
        h = H3_RE.search(block)
        if not h:
            continue
        info = match_by_title(re.sub(r'<[^>]+>', '', h.group(1)))
        if not info:
            continue
        league, sport, order = info
        for m in MATCH_RE.finditer(block):
            href, status_cls, body = m.groups()
            names = NAME_RE.findall(body)
            if len(names) < 2:
                continue
            logos = LOGO_RE.findall(body)
            tm = (TIME_RE.search(body) or [None, ''])[1].strip()
            st = H.unescape((STATUS_RE.search(body) or [None, ''])[1]).strip().lower()
            score = H.unescape((SCORE_RE.search(body) or [None, ''])[1]).replace('\xa0', ' ').strip()
            sc = re.findall(r'\d+', score)
            if status_cls == 'fin' or 'заверш' in st:
                state = 'post'
            elif status_cls in ('not-started', '0') and ('не начал' in st or not sc):
                state = 'pre'
            else:
                state = 'in'
            try:
                hh, mm = [int(x) for x in tm.split(':')]
                dt = day.replace(hour=hh, minute=mm)
            except Exception:
                dt = day.replace(hour=12, minute=0)
            if href.startswith('//'):
                href = 'https:' + href
            ids = re.findall(r'\d+', href)
            out.append({
                'id': f"{sport}-{ids[-1] if ids else href}",
                'date': dt.astimezone(timezone.utc).isoformat(),
                'league': league,
                'order': order,
                'sport': sport,
                'state': state,
                'clock': st if state == 'in' and st and 'не начал' not in st else None,
                'link': href,
                'home': {'name': H.unescape(names[0]).strip(), 'logo': logos[0] if len(logos) > 0 else None,
                         'score': sc[0] if state != 'pre' and len(sc) >= 2 else None},
                'away': {'name': H.unescape(names[1]).strip(), 'logo': logos[1] if len(logos) > 1 else None,
                         'score': sc[1] if state != 'pre' and len(sc) >= 2 else None},
            })
    return out


def day_urls() -> list:
    today = datetime.now(MSK).replace(hour=0, minute=0, second=0, microsecond=0)
    res = []
    for d in (0, 1, 2):
        day = today + timedelta(days=d)
        url = 'https://www.sport-express.ru/live/' if d == 0 else f'https://www.sport-express.ru/live/{day:%d-%m-%Y}/'
        res.append((url, day))
    return res
