import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { HeroPortrait } from '@/components/HeroPortrait';
import { PageReveal } from '@/components/PageReveal';
import { about } from '@/data/about';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Edy',
  description: 'Conheça Edmilson Gomes, sua abordagem prática e sua visão sobre tecnologia útil.',
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <main>
        <section className="editorial-hero about-hero">
          <div className="page-kicker"><span>01 / PROFILE</span><span>Discipline turns ideas into reality</span></div>
          <h1>ABOUT <em>EDY</em></h1>
          <HeroPortrait className="about-portrait" priority />
          <div className="about-lead">
            <p>{about.intro}</p>
            <span>São Paulo — BR</span>
          </div>
        </section>

        <section className="about-story section-pad">
          <PageReveal className="story-index"><span>WHO / WHY / HOW</span></PageReveal>
          <PageReveal className="story-copy">
            <p>{about.body}</p>
            <aside>Practical systems.<br />Clear outcomes.<br />Useful technology.</aside>
          </PageReveal>
        </section>

        <section className="values-section section-pad">
          <PageReveal className="values-heading">
            <span className="section-index">02 / PRINCIPLES</span>
            <h2>What stays<br /><em>constant.</em></h2>
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
