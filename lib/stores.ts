import { projects, storeProof } from "@/lib/content";

type PlayStats = { installs: string; rating?: number };
type AppStoreStats = { version: string; rating?: number; ratings?: number };
export type StoreStats = { id: string; play: PlayStats; appStore?: AppStoreStats };

const DAY = 86400;

/** Install band from the public Play listing ("10+", "1K+"). Play renders ratings client-side, so those stay manual. */
async function fetchPlayInstalls(url: string): Promise<string | null> {
  const id = new URL(url).searchParams.get("id");
  if (!id) return null;
  try {
    const res = await fetch(`https://play.google.com/store/apps/details?id=${id}&hl=en&gl=US`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: DAY },
    });
    if (!res.ok) return null;
    return />([\d.,]+[KMB]?\+)<\/div><div[^>]*>Downloads</.exec(await res.text())?.[1] ?? null;
  } catch {
    return null;
  }
}

/** Version and rating from Apple's public lookup API. */
async function fetchAppStore(url: string): Promise<AppStoreStats | null> {
  const id = /\/id(\d+)/.exec(url)?.[1];
  if (!id) return null;
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=us`, { next: { revalidate: DAY } });
    if (!res.ok) return null;
    const app = (await res.json()).results?.[0];
    if (!app?.version) return null;
    const ratings: number = app.userRatingCount ?? 0;
    return ratings > 0
      ? { version: app.version, rating: Math.round(app.averageUserRating * 10) / 10, ratings }
      : { version: app.version };
  } catch {
    return null;
  }
}

/**
 * Store numbers for every live app, refreshed once a day. Anything a store
 * won't give us falls back to the hand-checked values in `storeProof`, so the
 * page always renders. `live` says whether any number came from a store.
 */
export async function getStoreStats(): Promise<{ apps: StoreStats[]; live: boolean }> {
  let live = false;
  const apps = await Promise.all(
    storeProof.apps.map(async (fallback): Promise<StoreStats> => {
      const project = projects.find((p) => p.id === fallback.id);
      const [installs, appStore] = await Promise.all([
        project?.android ? fetchPlayInstalls(project.android) : null,
        project?.ios && "appStore" in fallback ? fetchAppStore(project.ios) : null,
      ]);
      if (installs || appStore) live = true;
      return {
        id: fallback.id,
        play: { ...fallback.play, ...(installs ? { installs } : {}) },
        ...("appStore" in fallback ? { appStore: appStore ?? fallback.appStore } : {}),
      };
    }),
  );
  return { apps, live };
}
