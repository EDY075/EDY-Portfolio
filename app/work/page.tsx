import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Uma seleção de projetos de suporte, segurança, sistemas, automação e análise.',
};

export default function WorkPage() {
  return (
    <SiteFrame>
      <main className="work-page">
        <section className="work-header">
          <p className="page-kicker"><span>WORK / 2026</span><span>Ideas, code, impact</span></p>
          <PageReveal><h1>SELECTED <em>WORK</em></h1></PageReveal>
          <p className="work-intro">Sistemas, ferramentas e experimentos construídos para dar clareza a problemas técnicos reais.</p>
        </section>
        <section className="work-list section-pad">
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
