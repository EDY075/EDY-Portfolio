import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { PageReveal } from './PageReveal';
import { ImageReveal } from './motion/ImageReveal';
import { DeferredProjectVisual } from './DeferredProjectVisual';

export function ProjectCard({ project, index = 0, sequence = false }: { project: Project; index?: number; sequence?: boolean }) {
  const visual = (
    <div className={`project-art project-art-real project-art-${(index % 6) + 1}`}>
      <DeferredProjectVisual
        image={project.image}
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 92vw, (max-width: 1440px) 88vw, 1260px"
      />
      <span className="project-art-index">{project.number}</span>
    </div>
  );
  const content = (
      <Link href={`/work/${project.slug}`} prefetch={false} className="project-link">
        {sequence ? <div className="image-reveal">{visual}</div> : <ImageReveal>{visual}</ImageReveal>}
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
  );
  return sequence
    ? <div className="project-entry project-entry-sequence">{content}</div>
    : <PageReveal className="project-entry" delay={(index % 2) * 0.08}>{content}</PageReveal>;
}
