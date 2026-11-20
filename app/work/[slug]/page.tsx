import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { getProject, projects } from '@/data/projects';
import { ProjectVisual } from '@/components/ProjectVisual';
import { CaseGallery } from '@/components/CaseGallery';
import { NextChapter } from '@/components/NextChapter';
import { pageSocialMetadata } from '@/lib/seo';
import { CaseDemo } from '../CaseDemo';

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    ...pageSocialMetadata(`/work/${project.slug}`, `${project.title} — EDY GOMES`, project.summary, project.image),
    ...(['assistente-personalizado', 'edy-shadowcat'].includes(project.slug) ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'assistente-da-raquel') redirect('/work/assistente-personalizado');
  const project = getProject(slug);
  if (!project) notFound();

  const next = projects[projects.findIndex(item => item.slug === project.slug) + 1];
  const caseSlides = [
    ...(project.caseImage ? [{ image: project.caseImage, title: project.caseImageTitle ?? 'Interface do projeto', caption: project.caseImageContext ?? project.caseImage.alt }] : []),
    ...(project.caseGallery ?? []),
  ];

  return (
    <SiteFrame>
      <main className="pf-page pf-case">
        <section className={`pf-hero case-hero case-hero-${project.slug}`} data-portfolio-theme="dark" aria-labelledby="pf-case-title">
          <div className="pf-hero-copy pf-case-heading">
            <p className="page-kicker pf-label">{project.keywords.join(' / ')}</p>
            <Link href="/work" prefetch={false} className="back-link">Todos os projetos</Link>
            <h1 id="pf-case-title" className="pf-title">
              {project.title.startsWith('EDY ') && <small>EDY</small>}
              {project.displayTitle}
            </h1>
            <p className="pf-lead">{project.subtitle}</p>
            <p className="case-status">{project.status}</p>
            {project.coverNote && <p className="pf-cover-note">{project.coverNote}</p>}
          </div>
          <figure className="case-art pf-case-cover">
            <ProjectVisual image={project.heroImage ?? project.image} sizes="(max-width: 900px) 94vw, 54vw" priority />
          </figure>
        </section>

        <section id="detalhes" className="pf-section pf-section-paper pf-details" aria-labelledby="pf-case-overview">
          <div className="pf-section-split">
            <PageReveal><h2 id="pf-case-overview" className="pf-heading"><em>O projeto</em><br />em contexto</h2></PageReveal>
            <PageReveal className="pf-reading"><p>{project.summary}</p></PageReveal>
          </div>

          {project.links.length > 0 && (
            <div className="case-links pf-case-links" aria-label="Links públicos do projeto">
              {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="pf-action">{link.label}</a>)}
            </div>
          )}

          <nav className="pf-internal-nav pf-case-index" aria-label="Seções do projeto">
            {project.origin && <a href="#origem">Origem</a>}
            {project.demo && <><a href="#demonstracao">Demonstração</a><a href="#identidade">Identidade visual</a></>}
            {caseSlides.length > 0 && <a href="#galeria">Imagens do projeto</a>}
            <a href="#desafio">Problema e solução</a>
            <a href="#recursos">Recursos</a>
            <a href="#tecnologias">Tecnologias e estado</a>
          </nav>
        </section>

        {project.origin && (
          <section id="origem" className="pf-section pf-section-dark pf-section-split pf-contour" aria-labelledby="pf-case-origin">
            <PageReveal><h2 id="pf-case-origin" className="pf-heading">A origem</h2></PageReveal>
            <PageReveal className="pf-reading"><p>{project.origin}</p></PageReveal>
          </section>
        )}

        {project.demo && <CaseDemo demo={project.demo} />}

        {caseSlides.length > 0 && <CaseGallery title={project.title} slides={caseSlides} />}

        <section id="desafio" className="pf-section pf-section-paper pf-editorial-grid pf-editorial-grid-two" aria-label="Problema e solução">
          <PageReveal className="pf-panel"><h2>O desafio</h2><p>{project.problem}</p></PageReveal>
          <PageReveal className="pf-panel" delay={.08}><h2>A resposta</h2><p>{project.solution}</p></PageReveal>
        </section>

        <section id="recursos" className="pf-section pf-section-dark pf-section-split" aria-labelledby="pf-case-features">
          <PageReveal><h2 id="pf-case-features" className="pf-heading">Recursos</h2></PageReveal>
          <ul className="pf-index-list">
            {project.features.map(feature => <li key={feature}>{feature}</li>)}
          </ul>
        </section>

        <section id="tecnologias" className="pf-section pf-section-paper pf-section-split">
          <div>
            <h2 className="pf-heading">Tecnologias</h2>
            <ul className="pf-tech-list">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="pf-reading"><h3>Estado atual</h3><p>{project.outcome}</p></div>
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
