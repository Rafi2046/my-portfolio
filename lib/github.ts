export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4; count: number };
export type Contributions = { total: number; days: ContributionDay[] };

export const GITHUB_USER = "Rafi2046";

/**
 * Last year of public GitHub contributions, scraped from the profile calendar
 * and refreshed once a day. Returns null if GitHub can't be reached, so the
 * page still renders.
 */
export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
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

    const days: ContributionDay[] = [];
    for (const m of html.matchAll(/data-date="([\d-]+)" id="(contribution-day-component-\d+-\d+)" data-level="(\d)"/g)) {
      days.push({ date: m[1], level: Number(m[3]) as ContributionDay["level"], count: counts.get(m[2]) ?? 0 });
    }
    if (days.length === 0) return null;

    days.sort((a, b) => a.date.localeCompare(b.date));
    return { total: days.reduce((n, d) => n + d.count, 0), days };
  } catch {
    return null;
  }
}
