import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './hero-work-scene.css';

type SceneProject = {
  title: string;
  href: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function HeroWorkScene({ projects }: { projects: readonly SceneProject[] }) {
  return (
    <section className="eg-hero-work-scene" aria-labelledby="eg-hero-work-title">
      <h2 className="eg-eyebrow" id="eg-hero-work-title">Projetos em destaque</h2>
      <ul className="eg-hero-work-grid">
        {projects.map(({ title, href, image }, index) => (
          <li className="eg-hero-work-tile" key={href}>
            <Link
              className="eg-hero-work-link"
              href={href}
              prefetch={false}
              data-cover-src={image.src}
              aria-label={`Abrir case de ${title}`}
            >
              <div className="eg-hero-work-image">
                <ResponsiveImage
                  {...image}
                  sizes={index === 0 ? '(max-width: 760px) 88vw, 48vw' : '(max-width: 760px) 44vw, 24vw'}
                />
              </div>
              <span className="eg-hero-work-caption">
                {title}
                <span aria-hidden="true">Ver case</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
