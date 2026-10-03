import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { ProjectExplorer } from '@/components/ProjectExplorer';
import { ProjectCard } from '@/components/ProjectCard';
import { featuredProjects, privateProjects, technicalProjects } from '@/data/projects';
import { pageSocialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Uma seleção de projetos de suporte, segurança, sistemas, automação e análise.',
  ...pageSocialMetadata('/work', 'Projetos — EDY GOMES', 'Uma seleção de projetos de suporte, segurança, sistemas, automação e análise.'),
};

export default function WorkPage() {
  return (
    <SiteFrame>
      <main className="work-page">
        <section className="work-header">
          <p className="page-kicker"><span>PROJETOS / 2026</span><span>Trabalho real, contexto claro</span></p>
          <div className="work-header-composition">
            <h1><span>PROJETOS</span><em>EM CONTEXTO</em></h1>
            <p className="work-intro">Sites, sistemas e ferramentas apresentados pelo que fazem e pelo estado em que estão hoje.</p>
          </div>
        </section>
        <nav className="work-jump-nav" aria-label="Ir para uma área dos projetos">
          <a href="#destaques">Destaques <span aria-hidden="true">↗</span></a>
          <a href="#pesquisa">Pesquisa <span aria-hidden="true">↗</span></a>
          <a href="#trabalhos-reais">Projetos reais <span aria-hidden="true">↗</span></a>
          <a href="#explorar-3d">Galeria 3D <span aria-hidden="true">↗</span></a>
        </nav>
        <section id="destaques" className="work-featured section-pad" aria-labelledby="work-featured-title">
          <div className="work-section-heading">
            <span className="section-index">SELEÇÃO</span>
            <h2 id="work-featured-title">Em destaque</h2>
            <p>Seis projetos em diferentes contextos. Abra um case para ver o trabalho e seus limites.</p>
          </div>
          <div className="project-grid portfolio-grid">
            {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} sequence />)}
          </div>
        </section>
        <section id="pesquisa" className="work-technical section-pad" aria-labelledby="work-technical-title">
          <div className="work-section-heading">
            <span className="section-index">GALERIA TÉCNICA</span>
            <h2 id="work-technical-title">Pesquisa e verificação</h2>
            <p>Ferramentas e pesquisa com escopo e estágio de validação descritos em cada case.</p>
          </div>
          <div className="project-grid portfolio-grid">
            {technicalProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + featuredProjects.length} sequence />)}
          </div>
        </section>
        <section id="trabalhos-reais" className="work-private section-pad" aria-labelledby="work-private-title">
          <div className="work-section-heading">
            <span className="section-index">TRABALHOS REAIS</span>
            <h2 id="work-private-title">Projetos para pessoas reais</h2>
            <p>Andréa Tur e CR Fitness são sites desenvolvidos para clientes. Assistente Personalizado é um caso real de uso privado, apresentado sem link externo.</p>
          </div>
          <div className="project-grid portfolio-grid">
            <ProjectCard project={featuredProjects[0]} index={featuredProjects.length + technicalProjects.length} sequence />
            {privateProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + featuredProjects.length + technicalProjects.length + 1} sequence />)}
          </div>
        </section>
        <ProjectExplorer />
      </main>
    </SiteFrame>
  );
}
