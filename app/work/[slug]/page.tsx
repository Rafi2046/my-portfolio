import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ScreensMarquee } from "@/components/ScreensMarquee";
import { Walkthrough } from "@/components/Walkthrough";
import { PageTransition, StageMorph } from "@/components/PageTransition";
import { ProjectStage } from "@/components/ProjectStage";
import { ArrowUpRight, Panel, SectionTitle } from "@/components/Section";
import { ownershipCopy, projects, site, statusCopy } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${site.fullName}`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Status", value: statusCopy[project.status] },
    { label: "Platforms", value: project.platforms },
  ];

  return (
    <>
      <PageTransition>
      <main className="flex-1 pt-2 sm:pt-3">
        <Panel tone="light" labelledBy="case-title" className="px-5 pb-10 pt-24 sm:px-10 sm:pb-14 sm:pt-28">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/#projects"
              transitionTypes={["nav-back"]}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition hover:bg-ink hover:text-panel"
            >
              <span aria-hidden>←</span> Back
            </Link>
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium">
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${project.status === "live" ? "bg-live" : "bg-muted"}`}
              />
              {statusCopy[project.status]}
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2">
                <h1 id="case-title" className="display text-[22vw] sm:text-9xl">
                  {project.title}
                </h1>
                <p className="pb-2 text-lg text-muted">
                  /{ownershipCopy[project.ownership].long}
                </p>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.android ? (
                  <a
                    href={project.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-panel transition hover:opacity-85"
                  >
                    Google Play <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                {project.ios ? (
                  <a
                    href={project.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-semibold transition hover:bg-ink hover:text-panel"
                  >
                    App Store <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href="/#contact"
                  className="focus-ring inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-semibold transition hover:bg-ink hover:text-panel"
                >
                  Contact me
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-6 border-t border-line-strong pt-6 sm:grid-cols-3 lg:grid-cols-1 lg:border-0 lg:pt-0 lg:text-right">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="eyebrow text-muted">{m.label}</dt>
                  <dd className="mt-1.5 font-medium">{m.value}</dd>
                </div>
              ))}
              <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                <dt className="eyebrow text-muted">App</dt>
                <dd className="mt-2 flex lg:justify-end">
                  <Image src={project.icon} alt={`${project.title} icon`} width={56} height={56} className="h-14 w-14 rounded-2xl border border-line" />
                </dd>
              </div>
            </dl>
          </div>

          <StageMorph id={project.id}>
            <ProjectStage
              project={project}
              interactive
              priority
              className="mx-auto mt-12 aspect-[4/3] max-w-6xl rounded-[1.5rem] sm:mt-16 sm:aspect-[16/10]"
            />
          </StageMorph>
        </Panel>

        <Panel tone="gray" labelledBy="story-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
          <SectionTitle id="story-heading" title="The story" counter="01" kicker="Problem · approach · result" />
          <ol className="mt-10 grid gap-4 lg:grid-cols-3">
            <li className="rounded-[1.5rem] border border-line-strong bg-panel p-6 sm:p-8">
              <p className="eyebrow text-muted">01 · Problem</p>
              <p className="mt-4 text-lg leading-relaxed sm:text-xl">{project.story.problem}</p>
            </li>
            <li className="rounded-[1.5rem] border border-line-strong bg-panel p-6 sm:p-8">
              <p className="eyebrow text-muted">02 · Approach</p>
              <p className="mt-4 leading-relaxed text-muted sm:text-lg">{project.story.approach}</p>
            </li>
            <li className="rounded-[1.5rem] bg-inverse p-6 text-on-inverse sm:p-8">
              <p className="eyebrow text-on-inverse-muted">03 · Result</p>
              <ul className="mt-4 space-y-3">
                {project.story.results.map((r) => (
                  <li key={r} className="flex gap-3 text-lg leading-snug">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-live" />
                    {r}
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </Panel>

        {project.video ? (
          <Panel tone="light" labelledBy="motion-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
            <SectionTitle id="motion-heading" title="In motion" counter="02" kicker="Walkthrough" aside={`${project.video.chapters.length} chapters`} />
            <Walkthrough video={project.video} title={project.title} tint={project.tint} />
          </Panel>
        ) : null}

        <Panel tone="inverse" labelledBy="built-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
          <SectionTitle
            id="built-heading"
            title={project.ownership === "team" ? "My contribution" : "What I built"}
            counter="03"
            kicker={project.ownership === "team" ? "My part of the team’s work" : "Highlights"}
          />
          <ol className="mt-10 border-t border-inverse-line">
            {project.highlights.map((h, i) => (
              <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-inverse-line py-6 sm:grid-cols-[6rem_1fr] sm:py-8">
                <span className="display text-3xl text-on-inverse-muted sm:text-5xl">0{i + 1}</span>
                <p className="text-lg leading-relaxed sm:text-2xl">{h}</p>
              </li>
            ))}
          </ol>
        </Panel>

        {project.gallery ? (
          <Panel tone="gray" labelledBy="screens-heading" className="mt-3 py-14 sm:py-20">
            <div className="px-5 sm:px-10">
              <SectionTitle
                id="screens-heading"
                title="Screens"
                counter="04"
                kicker="From the app"
                aside={`${project.gallery.length} ${project.gallery.length === 1 ? "screen" : "screens"}`}
              />
            </div>
            <div className="mt-6">
              <ScreensMarquee shots={project.gallery} />
            </div>
          </Panel>
        ) : null}

        <Panel tone="light" className="mt-3">
          <Link
            href={`/work/${next.id}`}
            transitionTypes={["nav-forward"]}
            className="focus-ring group flex items-center justify-between gap-6 px-5 py-10 sm:px-10 sm:py-14"
          >
            <div className="min-w-0">
              <p className="eyebrow text-muted">Next project</p>
              <p className="display mt-3 truncate text-6xl transition-transform duration-500 group-hover:translate-x-3 sm:text-8xl">
                {next.title}
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong transition group-hover:bg-ink group-hover:text-panel sm:h-20 sm:w-20">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </Link>
        </Panel>
      </main>
      </PageTransition>
      <Footer />
    </>
  );
}
