import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { SiteFrame } from '@/components/SiteFrame';
import { HeroPortrait } from '@/components/HeroPortrait';
import { PageReveal } from '@/components/PageReveal';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeading } from '@/components/SectionHeading';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export default function Home() {
  return (
    <SiteFrame>
      <main>
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true" />
          <p className="hero-note note-left">Technology<br />builds<br />freedom</p>
          <p className="hero-note note-right">Discipline turns<br />ideas into reality</p>
          <h1 id="hero-title" className="hero-name" aria-label="Edy Gomes">
            <span className="hero-edy">EDY</span>
            <span className="hero-gomes">GOMES</span>
          </h1>
          <HeroPortrait className="home-portrait" priority />
          <div className="hero-intro">
            <span className="eyebrow">EDMILSON GOMES / SÃO PAULO</span>
            <p>Tecnologia útil, sistemas seguros e automação para transformar problemas reais em soluções claras.</p>
            <Link href="/work" className="text-link">Explore selected work <ArrowDownRight aria-hidden="true" /></Link>
          </div>
          <div className="hero-bottom">
            {site.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
            <span>{site.location}</span>
          </div>
        </section>

        <section className="manifesto section-pad">
          <PageReveal className="manifesto-aside">
            <span className="section-index">01 / PROFILE</span>
            <p>People<br />Ideas<br />Systems</p>
          </PageReveal>
          <PageReveal className="manifesto-copy">
            <p className="manifesto-lead">Eu construo tecnologia que desaparece no uso — porque o sistema certo não exige atenção, ele devolve tempo.</p>
            <div className="manifesto-detail">
              <p>Edmilson Gomes é um profissional de tecnologia focado em suporte, segurança, organização e automação. O trabalho começa por entender o problema com clareza e termina com algo útil, legível e sustentável.</p>
              <Link href="/about" className="text-link">About Edy <ArrowRight aria-hidden="true" /></Link>
            </div>
          </PageReveal>
        </section>

        <section className="selected-preview section-pad">
          <PageReveal>
            <SectionHeading index="02" kicker="A curated collection of systems, tools and experiments">Selected<br />work</SectionHeading>
          </PageReveal>
          <div className="project-grid home-project-grid">
            {projects.slice(0, 4).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          <PageReveal className="all-work-row">
            <p>Six projects.<br />One practical point of view.</p>
            <Link href="/work" className="outline-link">View all projects <ArrowRight aria-hidden="true" /></Link>
          </PageReveal>
        </section>
      </main>
    </SiteFrame>
  );
}
