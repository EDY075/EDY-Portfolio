import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { getProject, type Project } from '@/data/projects';
import { HeroComparison } from './HeroComparison';
import { HeroTraceContinuation } from './HeroTraceScene';
import { PreviewMenu } from './PreviewMenu';
import { WarRoomShowcase } from './WarRoomComparison';
import { PortfolioHomeEnd } from './PortfolioHomeEnd';

function selectedProject(slug: string): Project {
  const project = getProject(slug);
  if (!project) throw new Error(`Projeto não encontrado: ${slug}`);
  return project;
}

const warRoom = selectedProject('war-room');
const crm = selectedProject('edy-crm');
const projects = [
  { project: warRoom, category: 'Pesquisa & documentário' },
  { project: selectedProject('cr-fitness'), category: 'Site de cliente' },
  { project: crm, category: 'Sistemas & automação' },
  { project: selectedProject('andrea-tur'), category: 'Turismo & experiência web' },
];

const warRoomFrames = [
  {
    label: 'Abertura',
    image: warRoom.image,
    description: 'Abertura do WAR ROOM com a galáxia e a rede interativa de investigação.',
  },
  ...(warRoom.caseImage ? [{
    label: 'Mapa',
    image: warRoom.caseImage,
    description: warRoom.caseImageContext ?? warRoom.caseImage.alt,
  }] : []),
  ...(warRoom.caseGallery ?? []).map(({ image, title, caption }) => ({
    label: title,
    image,
    description: caption,
  })),
];

const heroProjects = projects.slice(0, 3).map(({ project }) => ({
  title: project.title,
  href: `/work/${project.slug}`,
  image: project === crm ? (crm.caseImage ?? crm.image) : project.image,
}));

export function PortfolioHome({ compareHero = false, warRoomPreview }: { compareHero?: boolean; warRoomPreview?: string }) {
  return (
    <div className="eg-preview eg-home">
      <PreviewMenu />
      <main>
        <HeroComparison projects={heroProjects} compare={compareHero} />

        <section className="eg-statement" aria-labelledby="eg-statement-title">
          <HeroTraceContinuation />
          <svg className="eg-trace" aria-hidden="true" viewBox="0 0 534 280" fill="none">
            <path pathLength="1" d="M32 177C110 114 209 38 280 39c38 1 15 28-12 53-48 43-137 94-132 118 5 23 73 6 129-16 60-23 112-62 147-95 25-24 45-54 18-56-29-2-105 33-143 78-36 43-21 82 23 80 44-4 99-47 115-66-18 11-47 32-61 64l-22 45 133-79" />
          </svg>
          <p className="eg-eyebrow">Edmilson Gomes · São Paulo</p>
          <h2 id="eg-statement-title">Da ideia<br />ao sistema.</h2>
          <a href="#projetos" className="eg-link">Explorar os projetos</a>
          <div className="eg-statement-handoff" aria-hidden="true">
            <svg viewBox="0 0 1440 254" preserveAspectRatio="none" focusable="false">
              <path className="eg-handoff-fill" d="M0 167C150 184 244 68 414 62C584 56 678 157 852 149C1042 141 1196 34 1440 91V254H0Z" />
              <path className="eg-handoff-contour" d="M-24 141C132 166 240 44 405 38C572 32 680 127 848 122C1038 116 1180 9 1464 65" />
            </svg>
          </div>
        </section>

        <section id="projetos" className="eg-work" aria-labelledby="eg-work-title">
          <div className="eg-work-heading">
            <h2 id="eg-work-title"><span className="eg-trace-project-word">Projetos</span><br />selecionados</h2>
            <Link href="/work" className="eg-link" prefetch={false}>Ver todos os projetos</Link>
          </div>

          <div className="eg-projects">
            {projects.map(({ project, category }) => (
              <article key={project.slug}>
                <Link href={`/work/${project.slug}`} className="eg-project" prefetch={false} data-cover-src={project.image.src}>
                  <div className="eg-project-media">
                    <ResponsiveImage {...project.image} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 24vw" />
                  </div>
                  <div className="eg-project-copy">
                    <p className="eg-eyebrow">{category}</p>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <p className="eg-project-stack">{project.stack.slice(0, 3).join(' · ')}</p>
                    {project.coverNote && <p className="eg-cover-note">{project.coverNote}</p>}
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <WarRoomShowcase
            key={warRoomPreview}
            option={warRoomPreview}
            title={warRoom.title}
            subtitle={warRoom.subtitle}
            caseHref={`/work/${warRoom.slug}`}
            liveHref={warRoom.links.find(link => link.label === 'Explorar WAR ROOM')?.href}
            frames={warRoomFrames}
          />
        </section>
      </main>
      <PortfolioHomeEnd />
    </div>
  );
}
