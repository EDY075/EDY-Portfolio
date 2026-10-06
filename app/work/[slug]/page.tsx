import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { getProject, projects } from '@/data/projects';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { ProjectVisual } from '@/components/ProjectVisual';
import { CaseGallery } from '@/components/CaseGallery';
import { NextChapter } from '@/components/NextChapter';
import { pageSocialMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const image = project.image;
  return {
    title: project.title,
    description: project.summary,
    ...pageSocialMetadata(`/work/${project.slug}`, `${project.title} — EDY GOMES`, project.summary, image),
    ...(['assistente-personalizado', 'edy-shadowcat'].includes(project.slug) ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'assistente-da-raquel') redirect('/work/assistente-personalizado');
  const project = getProject(slug);
  if (!project) notFound();
  const current = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[current + 1];
  const caseSlides = [
    ...(project.caseImage ? [{ image: project.caseImage, title: project.caseImageTitle ?? 'Interface do projeto', caption: project.caseImageContext ?? project.caseImage.alt }] : []),
    ...(project.caseGallery ?? []),
  ];

  return (
    <SiteFrame>
      <main className="case-page">
        <section className={`case-hero case-hero-${project.slug}`}>
          <p className="page-kicker"><span>PROJETO</span><span>{project.keywords.join(' / ')}</span></p>
          <Link href="/work" prefetch={false} className="back-link">Todos os projetos</Link>
          <PageReveal><h1>{project.title.startsWith('EDY ') && <small>EDY</small>}{project.displayTitle}</h1></PageReveal>
          <PageReveal className="case-subtitle"><p>{project.subtitle}</p></PageReveal>
          <PageReveal className="case-status"><p>{project.status}</p></PageReveal>
          <ImageReveal className={`case-art case-art-real project-art project-art-real project-art-${current + 1}`}>
            <ProjectVisual
              image={project.heroImage ?? project.image}
              sizes="(max-width: 900px) 90vw, 58vw"
            />
          </ImageReveal>
        </section>

        <section id="detalhes" className="case-overview section-pad">
          <PageReveal className="overview-title"><span>VISÃO GERAL</span><h2>O projeto<br /><em>em contexto.</em></h2></PageReveal>
          <PageReveal className="overview-copy"><p>{project.summary}</p></PageReveal>
          {project.links.length > 0 && <div className="case-links" aria-label="Links públicos do projeto">
            {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
          </div>}
          <nav className="case-detail-nav" aria-label="Seções do projeto">
            <a href="#desafio">Problema e solução</a>
            <a href="#recursos">Recursos</a>
            <a href="#tecnologias">Tecnologias e estado</a>
          </nav>
        </section>

        {caseSlides.length > 0 && <CaseGallery title={project.title} slides={caseSlides} />}

        <section id="desafio" className="case-duo section-pad">
          <PageReveal><span className="section-index">PROBLEMA</span><h2>O desafio</h2><p>{project.problem}</p></PageReveal>
          <PageReveal delay={.08}><span className="section-index">SOLUÇÃO</span><h2>A resposta</h2><p>{project.solution}</p></PageReveal>
        </section>

        <section id="recursos" className="case-features section-pad">
          <PageReveal className="feature-heading"><span className="section-index">RECURSOS</span><h2>O que o projeto<br /><em>reúne.</em></h2></PageReveal>
          <div className="feature-list">
            {project.features.map((feature, index) => (
              <PageReveal key={feature} className="feature-row" delay={index * .04}>
                <p>{feature}</p>
              </PageReveal>
            ))}
          </div>
        </section>

        <section id="tecnologias" className="case-outcome section-pad">
          <div><span className="section-index">TECNOLOGIAS</span><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <PageReveal><span className="section-index">ESTADO ATUAL</span><blockquote>{project.outcome}</blockquote></PageReveal>
        </section>

        <NextChapter
          eyebrow={next ? 'PRÓXIMO PROJETO' : 'VER TODOS OS PROJETOS'}
          title={next ? next.title : 'TODOS OS PROJETOS'}
          subtitle={next?.subtitle}
          href={next ? `/work/${next.slug}` : '/work'}
        />
      </main>
    </SiteFrame>
  );
}
