import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { PageReveal } from './PageReveal';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <PageReveal className="project-entry" delay={(index % 2) * 0.08}>
      <Link href={`/work/${project.slug}`} className="project-link" aria-label={`Abrir case study: ${project.title}`}>
        <div className={`project-art project-art-${(index % 6) + 1}`} aria-hidden="true">
          <span className="project-art-word">{project.displayTitle}</span>
          <span className="project-art-index">{project.number}</span>
          <div className="project-orbit" />
        </div>
        <div className="project-copy">
          <span className="project-number">{project.number}</span>
          <div>
            <h2>{project.title}</h2>
            <p>{project.subtitle}</p>
          </div>
          <ArrowUpRight aria-hidden="true" />
        </div>
        <div className="project-tags" aria-label="Áreas do projeto">
          {project.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </div>
      </Link>
    </PageReveal>
  );
}
