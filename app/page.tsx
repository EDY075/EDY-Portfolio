import Link from 'next/link';
import { SiteFrame } from '@/components/SiteFrame';
import { HeroPortrait } from '@/components/HeroPortrait';
import { PageReveal } from '@/components/PageReveal';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeading } from '@/components/SectionHeading';
import { HomeMotion } from '@/components/motion/HomeMotion';
import { MagneticLink } from '@/components/motion/MagneticLink';
import { featuredProjects } from '@/data/projects';
import { site } from '@/data/site';

export default function Home() {
  return (
    <SiteFrame>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        href="/images/optimized/edy-portrait-suit-1023.avif"
        imageSrcSet="/images/optimized/edy-portrait-suit-640.avif 640w, /images/optimized/edy-portrait-suit-828.avif 828w, /images/optimized/edy-portrait-suit-1023.avif 1023w"
        imageSizes="140vw"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        type="image/avif"
        href="/images/optimized/edy-portrait-desktop-1672.avif"
        imageSrcSet="/images/optimized/edy-portrait-desktop-1280.avif 1280w, /images/optimized/edy-portrait-desktop-1672.avif 1672w"
        imageSizes="100vw"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <HomeMotion>
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-aperture" aria-hidden="true" />
          <div className="hero-frame-line" aria-hidden="true" />
          <p className="hero-note note-left">Tecnologia<br />constrói<br />liberdade</p>
          <p className="hero-note note-right">Disciplina transforma<br />ideias em realidade</p>
          <h1 id="hero-title" className="hero-name hero-name-back" aria-label="Edy Gomes">
            <span className="hero-edy">EDY</span>
            <span className="hero-gomes">GOMES</span>
          </h1>
          <HeroPortrait className="home-portrait" priority reveal={false} />
          <div className="hero-intro">
            <span className="eyebrow">EDMILSON GOMES / SÃO PAULO</span>
            <p>Tecnologia útil, sistemas seguros e automação para transformar problemas reais em soluções claras.</p>
            <div className="hero-actions">
              <Link href="#selected-work" className="text-link">Ver projetos</Link>
              <Link href="/contact" prefetch={false} className="text-link hero-contact-link">Iniciar uma conversa</Link>
            </div>
          </div>
          <div className="hero-bottom">
            {site.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
            <span>{site.location}</span>
          </div>
        </section>

        <section id="selected-work" className="selected-preview section-pad">
          <PageReveal>
            <SectionHeading kicker="Uma seleção de trabalho real, com contexto e estado atual">Projetos</SectionHeading>
          </PageReveal>
          <div className="project-grid home-project-grid featured-grid">
            {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} sequence />)}
          </div>
          <PageReveal className="all-work-row">
            <p>{featuredProjects.length} destaques.<br />Diferentes contextos, trabalho verificável.</p>
            <MagneticLink href="/work" className="outline-link">Ver galeria completa</MagneticLink>
          </PageReveal>
        </section>

        <section className="manifesto section-pad">
          <PageReveal className="manifesto-aside">
            <span className="section-index">PERFIL</span>
            <p>Pessoas<br />Ideias<br />Sistemas</p>
          </PageReveal>
          <PageReveal className="manifesto-copy">
            <p className="manifesto-lead">Eu construo tecnologia que desaparece no uso — porque o sistema certo não exige atenção, ele devolve tempo.</p>
            <div className="manifesto-detail">
              <p>Edmilson Gomes é um profissional de tecnologia focado em suporte, segurança, organização e automação. O trabalho começa por entender o problema com clareza e termina com algo útil, legível e sustentável.</p>
              <Link href="/about" prefetch={false} className="text-link">Sobre Edy</Link>
            </div>
          </PageReveal>
        </section>

      </HomeMotion>
      </SiteFrame>
  );
}
