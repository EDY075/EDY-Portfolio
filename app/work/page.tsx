import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { TextReveal } from '@/components/motion/TextReveal';
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
          <p className="page-kicker"><span>PROJETOS / 2026</span><span>Ideias, código, impacto</span></p>
          <TextReveal ariaLabel="Projetos selecionados" lines={['PROJETOS', <em key="work">SELECIONADOS</em>]} />
          <p className="work-intro">Sistemas, ferramentas e experimentos construídos para dar clareza a problemas técnicos reais.</p>
        </section>
        <section className="work-list section-pad">
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} sequence />)}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
