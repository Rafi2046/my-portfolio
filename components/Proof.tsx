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

  const lastYear = contributions?.[0];

  const tiles = [
    { value: String(live.length), label: "Apps live on the stores", note: `${platforms} on both Google Play and the App Store` },
    { value: "5.0", label: "App Store rating", note: "RUSHD and Quran Audio" },
    { value: "4.7", label: "Google Play rating", note: "Quran Audio" },
    lastYear
      ? { value: lastYear.total.toLocaleString("en-US"), label: "GitHub contributions", note: "in the last 12 months · updated daily" }
      : { value: "1,541", label: "Commits at Onesttech", note: "Five apps, three built solo" },
  ];

  return (
    <Panel id="proof" tone="gray" labelledBy="proof-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <SectionTitle id="proof-heading" title="Proof" counter="04" kicker="Shipped, rated, still committing" aside={`Store data · ${storeProof.checked}`} />

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
              <li key={p.id} data-spotlight className="grid grid-cols-[52px_1fr] content-start items-start gap-x-4 gap-y-3 bg-panel-2 p-5 sm:p-6">
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
        <div className="grid min-w-0 gap-6 rounded-[1.5rem] border border-line-strong p-5 sm:p-6 lg:gap-8">
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
              <ContributionGraph
                ranges={contributions}
                note="Public contributions only. Most of my day-to-day work is in Onesttech’s private repositories — 1,500+ commits on five apps in 2026."
              />
            ) : (
              <p className="text-sm text-muted">GitHub is unreachable right now — see the profile for live activity.</p>
            )}
          </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
