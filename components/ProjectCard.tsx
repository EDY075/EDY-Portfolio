import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { PageReveal } from './PageReveal';
import { ImageReveal } from './motion/ImageReveal';
import { DeferredProjectVisual } from './DeferredProjectVisual';

export function ProjectCard({ project, index = 0, sequence = false }: { project: Project; index?: number; sequence?: boolean }) {
  const visual = (
    <div className={`project-art project-art-real project-art-${(index % 9) + 1}`}>
      <DeferredProjectVisual
        image={project.image}
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 92vw, (max-width: 1440px) 88vw, 1260px"
      />
    </div>
  );
  const content = (
      <Link href={`/work/${project.slug}`} prefetch={false} className="project-link" data-cover-src={project.image.src}>
        {sequence ? <div className="image-reveal">{visual}</div> : <ImageReveal>{visual}</ImageReveal>}
        <div className="project-copy">
          <div>
            <h3>{project.title}</h3>
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
    ? <div className={`project-entry project-entry-sequence${index >= 6 ? ' project-entry-new' : ''}`}>{content}</div>
    : <PageReveal className="project-entry" delay={(index % 2) * 0.08}>{content}</PageReveal>;
}
