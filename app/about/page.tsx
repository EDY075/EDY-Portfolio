import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFrame } from '@/components/SiteFrame';
import { AboutPortrait } from './AboutPortrait';
import { PageReveal } from '@/components/PageReveal';
import { about } from '@/data/about';
import { site } from '@/data/site';
import { pageSocialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sobre Edy',
  description: 'Conheça Edmilson Gomes, sua abordagem prática e sua visão sobre tecnologia útil.',
  ...pageSocialMetadata('/about', 'Sobre Edy — EDY GOMES', 'Conheça Edmilson Gomes, sua abordagem prática e sua visão sobre tecnologia útil.'),
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <main className="pf-page pf-about">
        <section className="pf-hero pf-hero-split pf-about-hero" data-portfolio-theme="light" aria-labelledby="pf-about-title">
          <div className="pf-hero-copy">
            <p className="pf-label">Edmilson Gomes · {site.location}</p>
            <h1 id="pf-about-title" className="pf-title"><em>Sobre</em> Edy</h1>
            <p className="pf-lead">{about.intro}</p>
            <a className="pf-action" href="#trajetoria">Conheça minha trajetória</a>
          </div>
          <AboutPortrait />
          <svg className="pf-about-edge" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 55C223 72 359 49 503 45C664 41 789 63 947 54C1119 44 1277 15 1440 31V72H0Z" />
          </svg>
        </section>

        <section id="trajetoria" className="pf-section pf-section-dark pf-section-split pf-contour" aria-labelledby="pf-story-title">
          <PageReveal><h2 id="pf-story-title" className="pf-heading"><em>Tecnologia</em> útil</h2></PageReveal>
          <PageReveal className="pf-reading">
            {about.body.split(/(?<=\.)\s+/).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </PageReveal>
        </section>

        <section className="pf-section pf-section-paper" aria-labelledby="pf-principles-title">
          <h2 id="pf-principles-title" className="pf-heading">Princípios</h2>
          <div className="pf-editorial-grid pf-editorial-grid-four pf-principles">
            {about.values.map(({ title, text, example, project }) => (
              <details className="pf-panel pf-principle" key={title}>
                <summary>
                  <span className="pf-principle-title">{title}</span>
                  <span className="pf-principle-icon" aria-hidden="true" />
                  <span className="pf-principle-description">{text}</span>
                </summary>
                <div className="pf-principle-example">
                  <p>{example}</p>
                  <Link prefetch={false} href={project.href}>Ver {project.title}</Link>
                </div>
              </details>
            ))}
          </div>
        </section>

        <ul className="pf-identity" aria-label="Áreas de atuação">
          {site.disciplines.map(item => <li key={item}>{item}</li>)}
        </ul>
      </main>
    </SiteFrame>
  );
}
