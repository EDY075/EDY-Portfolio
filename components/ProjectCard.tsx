import Link from 'next/link';
import type { Project } from '@/data/projects';
import { PageReveal } from './PageReveal';
import { ImageReveal } from './motion/ImageReveal';
import { DeferredProjectVisual } from './DeferredProjectVisual';

export function ProjectCard({ project, index = 0, sequence = false }: { project: Project; index?: number; sequence?: boolean }) {
  const visual = (
    <div className={`project-art project-art-real project-art-${(index % 9) + 1}`}>
      <DeferredProjectVisual
        image={project.image}
        sizes="(max-width: 700px) 94vw, (max-width: 900px) 46vw, 31vw"
      />
    </div>
  );
  const content = (
    <Link href={`/work/${project.slug}`} prefetch={false} className="project-link" data-cover-src={project.image.src}>
      <div className="project-preview">
        {sequence ? <div className="image-reveal">{visual}</div> : <ImageReveal>{visual}</ImageReveal>}
        <div className="project-copy">
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
          <span className="project-case-label">Ver case</span>
        </div>
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
