import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { ProjectExplorer } from '@/components/ProjectExplorer';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectPreviewProvider } from '@/components/ProjectPreviewProvider';
import { ProjectOrbit } from './ProjectOrbit';
import { clientProjects, featuredProjects, projects, technicalProjects } from '@/data/projects';
import { pageSocialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Uma seleção de projetos de suporte, segurança, sistemas, automação e análise.',
  ...pageSocialMetadata('/work', 'Projetos — EDY GOMES', 'Uma seleção de projetos de suporte, segurança, sistemas, automação e análise.'),
};

const sections = [
  { id: 'destaques', title: 'Em destaque', intro: 'Uma seleção de sites, sistemas e ferramentas.', items: featuredProjects },
  { id: 'pesquisa', title: 'Segurança e operação', intro: 'Verificação, análise, proteção de endpoints e suporte, com escopo e estágio de validação descritos em cada case.', items: technicalProjects },
  { id: 'trabalhos-reais', title: 'Projetos de clientes', intro: 'Sites, aplicativos e automações desenvolvidos para clientes.', items: clientProjects },
] as const;

const clientSites = new Set(['cr-fitness', 'andrea-tur']);
const orbitProjects = projects.map(({ slug, title, image, links }) => ({
  slug,
  title,
  image,
  siteHref: clientSites.has(slug) ? links?.[0]?.href : undefined,
}));

export default function WorkPage() {
  return (
    <SiteFrame>
      <main className="pf-page pf-work">
        <section className="pf-hero pf-work-hero pf-work-hero-orbit" data-portfolio-theme="dark" aria-labelledby="pf-work-title">
          <div className="pf-hero-copy">
            <h1 id="pf-work-title" className="pf-title"><em>Projetos</em> <span>em contexto</span></h1>
            <p className="pf-lead">Sites, sistemas e ferramentas apresentados pelo que fazem e pelo estado em que estão hoje.</p>
          </div>
          <ProjectOrbit projects={orbitProjects} />
        </section>

        <nav className="pf-internal-nav" aria-label="Ir para uma área dos projetos">
          <a href="#destaques">Destaques</a>
          <a href="#pesquisa">Segurança e operação</a>
          <a href="#trabalhos-reais">Projetos de clientes</a>
          <a href="#explorar-3d">Galeria 3D</a>
        </nav>

        <ProjectPreviewProvider>
          {sections.map(({ id, title, intro, items }, sectionIndex) => (
            <section id={id} className="pf-section pf-section-dark pf-work-section" key={id} aria-labelledby={`pf-${id}-title`}>
              <div className="pf-section-intro">
                <h2 id={`pf-${id}-title`} className="pf-heading">{title}</h2>
                <p>{intro}</p>
              </div>
              <div className="project-grid pf-project-grid">
                {items.map(({ slug, title, subtitle, keywords, image }, index) => (
                  <ProjectCard key={slug} project={{ slug, title, subtitle, keywords, image }} index={index + sectionIndex * 3} sequence />
                ))}
              </div>
            </section>
          ))}
        </ProjectPreviewProvider>

        <ProjectExplorer />
      </main>
    </SiteFrame>
  );
}
