import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { HeroPortrait } from '@/components/HeroPortrait';
import { PageReveal } from '@/components/PageReveal';
import { about } from '@/data/about';
import { site } from '@/data/site';
import { TextReveal } from '@/components/motion/TextReveal';
import { pageSocialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sobre Edy',
  description: 'Conheça Edmilson Gomes, sua abordagem prática e sua visão sobre tecnologia útil.',
  ...pageSocialMetadata('/about', 'Sobre Edy — EDY GOMES', 'Conheça Edmilson Gomes, sua abordagem prática e sua visão sobre tecnologia útil.'),
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <main>
        <section className="editorial-hero about-hero">
          <div className="page-kicker"><span>01 / PERFIL</span><span>Disciplina transforma ideias em realidade</span></div>
          <TextReveal className="about-motion-title" ariaLabel="Sobre Edy" lines={['SOBRE', <em key="edy">EDY</em>]} />
          <HeroPortrait className="about-portrait" priority />
          <div className="about-lead">
            <p>{about.intro}</p>
            <span>São Paulo — BR</span>
          </div>
        </section>

        <section className="about-story section-pad">
          <PageReveal className="story-index"><span>WHO / WHY / HOW</span></PageReveal>
          <PageReveal className="story-copy">
            <div className="story-prose">
              {about.body.split(/(?<=\.)\s+/).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <aside>Sistemas práticos.<br />Resultados claros.<br />Tecnologia útil.</aside>
          </PageReveal>
        </section>

        <section className="values-section section-pad">
          <PageReveal className="values-heading">
            <span className="section-index">02 / PRINCÍPIOS</span>
            <h2>O que<br /><em>permanece.</em></h2>
          </PageReveal>
          <div className="values-grid">
            {about.values.map((value, index) => (
              <PageReveal className="value-item" key={value.number} delay={index * 0.06}>
                <span>{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </PageReveal>
            ))}
          </div>
        </section>

        <section className="identity-strip">
          {site.disciplines.map((item) => <span key={item}>{item}</span>)}
          <span>{site.name}</span><span>{site.location}</span>
        </section>
      </main>
    </SiteFrame>
  );
}
