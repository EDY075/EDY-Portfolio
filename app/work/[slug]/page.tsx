import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { getProject, projects } from '@/data/projects';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { ProjectVisual } from '@/components/ProjectVisual';
import { NextChapter } from '@/components/NextChapter';
import { pageSocialMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const image = project.caseImage ?? project.image;
  return {
    title: project.title,
    description: project.summary,
    ...pageSocialMetadata(`/work/${project.slug}`, `${project.title} — EDY GOMES`, project.summary, image),
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const current = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[current + 1];

  return (
    <SiteFrame>
      <main className="case-page">
        <section className={`case-hero case-hero-${project.slug}`}>
          <p className="page-kicker"><span>{project.number} / CASE STUDY</span><span>{project.keywords.join(' / ')}</span></p>
          <Link href="/work" prefetch={false} className="back-link"><ArrowLeft aria-hidden="true" /> All work</Link>
          <PageReveal><h1><small>EDY</small>{project.displayTitle}</h1></PageReveal>
          <PageReveal className="case-subtitle"><p>{project.subtitle}</p></PageReveal>
          <ImageReveal className={`case-art case-art-real project-art project-art-real project-art-${current + 1}`}>
            <ProjectVisual
              image={project.caseImage ?? project.image}
              sizes="(max-width: 900px) 90vw, 58vw"
            />
          </ImageReveal>
        </section>

        <section className="case-overview section-pad">
          <PageReveal className="overview-title"><span>01 / OVERVIEW</span><h2>A system built<br />for <em>clarity.</em></h2></PageReveal>
          <PageReveal className="overview-copy"><p>{project.summary}</p></PageReveal>
        </section>

        <section className="case-duo section-pad">
          <PageReveal><span className="section-index">02 / PROBLEM</span><h2>The friction</h2><p>{project.problem}</p></PageReveal>
          <PageReveal delay={.08}><span className="section-index">03 / SOLUTION</span><h2>The response</h2><p>{project.solution}</p></PageReveal>
        </section>

        <section className="case-features section-pad">
          <PageReveal className="feature-heading"><span className="section-index">04 / KEY FEATURES</span><h2>What it<br /><em>brings together.</em></h2></PageReveal>
          <div className="feature-list">
            {project.features.map((feature, index) => (
              <PageReveal key={feature} className="feature-row" delay={index * .04}>
                <span>{String(index + 1).padStart(2, '0')}</span><p>{feature}</p>
              </PageReveal>
            ))}
          </div>
        </section>

        <section className="case-outcome section-pad">
          <div><span className="section-index">05 / STACK</span><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <PageReveal><span className="section-index">06 / OUTCOME</span><blockquote>{project.outcome}</blockquote></PageReveal>
        </section>

        <NextChapter
          eyebrow={next ? 'PRÓXIMO PROJETO' : 'VER TODOS OS PROJETOS'}
          number={next?.number}
          title={next ? next.title : 'ALL WORK'}
          subtitle={next?.subtitle}
          href={next ? `/work/${next.slug}` : '/work'}
        />
      </main>
    </SiteFrame>
  );
}
