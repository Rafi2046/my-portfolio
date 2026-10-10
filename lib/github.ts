export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4; count: number };
/** One selectable calendar: the last 12 months, or a calendar year. */
export type ContributionRange = { id: string; label: string; total: number; days: ContributionDay[] };

export const GITHUB_USER = "Rafi2046";
/** The year the GitHub account was opened; the year picker starts here. */
const FIRST_YEAR = 2023;

/** Scrapes one profile calendar (the last year, or `from`–`to` when given). */
async function fetchCalendar(query = ""): Promise<ContributionDay[] | null> {
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions${query}`, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const counts = new Map<string, number>();
    for (const m of html.matchAll(/for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]+)</g)) {
      const n = /^(\d+) contribution/.exec(m[2]);
      counts.set(m[1], n ? Number(n[1]) : 0);
    }

    const today = new Date().toISOString().slice(0, 10);
    const days: ContributionDay[] = [];
    for (const m of html.matchAll(/data-date="([\d-]+)" id="(contribution-day-component-\d+-\d+)" data-level="(\d)"/g)) {
      // The current year's calendar runs to 31 December; drop the days still to come.
      if (m[1] > today) continue;
      days.push({ date: m[1], level: Number(m[3]) as ContributionDay["level"], count: counts.get(m[2]) ?? 0 });
    }
    if (days.length === 0) return null;
    return days.sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return null;
  }
}

const total = (days: ContributionDay[]) => days.reduce((n, d) => n + d.count, 0);

/**
 * Public GitHub contributions for the last 12 months and for every year since
 * the account opened, refreshed once a day. Returns null if GitHub can't be
 * reached, so the page still renders; a year that fails is just left out.
 */
export async function getContributions(): Promise<ContributionRange[] | null> {
  const current = new Date().getUTCFullYear();
  const years = Array.from({ length: current - FIRST_YEAR + 1 }, (_, i) => current - i);
  const [last, ...perYear] = await Promise.all([
    fetchCalendar(),
    ...years.map((y) => fetchCalendar(`?from=${y}-01-01&to=${y}-12-31`)),
  ]);
  if (!last) return null;

  const ranges: ContributionRange[] = [{ id: "last", label: "Last 12 months", total: total(last), days: last }];
  perYear.forEach((days, i) => {
    if (days) ranges.push({ id: String(years[i]), label: String(years[i]), total: total(days), days });
  });
  return ranges;
}
