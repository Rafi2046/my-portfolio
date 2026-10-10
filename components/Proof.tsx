import Image from "next/image";
import { ContributionGraph } from "@/components/ContributionGraph";
import { ArrowUpRight, CountUp, Panel, SectionTitle } from "@/components/Section";
import { getContributions, GITHUB_USER } from "@/lib/github";
import { ownershipCopy, projects, storeProof } from "@/lib/content";

function Stars({ value }: { value: number }) {
  return (
    <span aria-hidden className="relative inline-block text-sm leading-none tracking-[0.12em]">
      <span className="text-ink/20">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden text-[#fbbf24]" style={{ width: `${(value / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

/** Live apps, public store ratings and a year of commits — numbers anyone can check. */
export async function Proof() {
  const contributions = await getContributions();
  const live = storeProof.apps.map((s) => ({ ...s, project: projects.find((p) => p.id === s.id)! }));
  const platforms = live.filter((a) => "appStore" in a).length;

  let stats: { label: string; value: string }[] | null = null;
  if (contributions) {
    const days = contributions.days;
    let longest = 0;
    let run = 0;
    for (const d of days) {
      run = d.count > 0 ? run + 1 : 0;
      longest = Math.max(longest, run);
    }
    const busiest = Math.max(...days.map((d) => d.count));
    stats = [
      { label: "Active days", value: String(days.filter((d) => d.count > 0).length) },
      { label: "Longest streak", value: `${longest}d` },
      { label: "Busiest day", value: String(busiest) },
    ];
  }

  const tiles = [
    { value: String(live.length), label: "Apps live on the stores", note: `${platforms} on both Google Play and the App Store` },
    { value: "5.0", label: "App Store rating", note: "RUSHD and Al Quran Majeed" },
    { value: "4.7", label: "Google Play rating", note: "Al Quran Majeed" },
    contributions
      ? { value: String(contributions.total), label: "GitHub contributions", note: "in the last 12 months · updated daily" }
      : { value: "436", label: "Commits at Onesttech", note: "April – October 2026" },
  ];

  return (
    <Panel id="proof" tone="gray" labelledBy="proof-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <SectionTitle id="proof-heading" title="Proof" counter="03" kicker="Shipped, rated, still committing" aside={`Store data · ${storeProof.checked}`} />

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-line-strong bg-line-strong lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="bg-panel p-5 sm:p-7">
            <dt className="sr-only">{t.label}</dt>
            <dd className="display text-6xl sm:text-7xl">
              <CountUp value={t.value} />
            </dd>
            <dd className="mt-3 font-medium">{t.label}</dd>
            <dd className="mt-1 text-sm text-muted">{t.note}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 grid min-w-0 gap-3">
        {/* Store listings */}
        <ul className="grid min-w-0 gap-px overflow-hidden rounded-[1.5rem] border border-line-strong bg-line-strong sm:grid-cols-2">
          {live.map(({ project: p, play, ...rest }) => {
            const app = "appStore" in rest ? rest.appStore : undefined;
            return (
              <li key={p.id} className="grid grid-cols-[52px_1fr] content-start items-start gap-x-4 gap-y-3 bg-panel-2 p-5 sm:p-6">
                <Image src={p.icon} alt="" width={52} height={52} className="h-13 w-13 rounded-2xl" />
                <div className="min-w-0">
                  <p className="text-lg font-semibold leading-tight">{p.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{ownershipCopy[p.ownership].short}</p>
                </div>
                <div className="col-span-2 flex flex-wrap gap-2 text-sm sm:col-start-2 sm:col-end-3">
                  {p.android ? (
                    <a href={p.android} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 transition hover:border-ink/50">
                      <span className="whitespace-nowrap text-muted">Play</span>
                      {"rating" in play ? (
                        <>
                          <Stars value={play.rating} /> {play.rating.toFixed(1)}
                        </>
                      ) : null}
                      <span>{play.installs} installs</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : null}
                  {p.ios && app ? (
                    <a href={p.ios} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 transition hover:border-ink/50">
                      <span className="whitespace-nowrap text-muted">App Store</span>
                      {"rating" in app ? (
                        <>
                          <Stars value={app.rating} /> {app.rating.toFixed(1)}
                          <span className="text-muted">({app.ratings})</span>
                        </>
                      ) : null}
                      <span>v{app.version}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        {/* GitHub activity */}
        <div className="grid min-w-0 gap-6 rounded-[1.5rem] border border-line-strong p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
          <div className="min-w-0">
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold">GitHub activity</p>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
            >
              @{GITHUB_USER} <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-6 min-w-0">
            {contributions ? (
              <ContributionGraph days={contributions.days} />
            ) : (
              <p className="text-sm text-muted">GitHub is unreachable right now — see the profile for live activity.</p>
            )}
          </div>
          </div>
          <div className="flex flex-col">
          {stats ? (
            <dl className="grid grid-cols-3 lg:grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line-strong bg-line-strong">
              {stats.map((x) => (
                <div key={x.label} className="bg-panel-2 p-4">
                  <dt className="text-xs text-muted">{x.label}</dt>
                  <dd className="display mt-1 text-3xl sm:text-4xl">{x.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <p className="mt-6 text-sm leading-relaxed text-muted lg:mt-auto lg:pt-6">
            Public contributions only. Most of my day-to-day work is in Onesttech&apos;s private repositories —
            436 commits between April and October 2026.
          </p>
          </div>
        </div>
      </div>
    </Panel>
  );
}
