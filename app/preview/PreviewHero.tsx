'use client';

import './preview-hero.css';

export const HANDOFF_WAVE = 'M0 181C162 153 241 59 403 73C569 87 632 174 802 153C959 134 1032 42 1175 53C1331 65 1450 155 1600 113V281H0Z';
export const PORTRAIT_IMAGE = {
  src: '/images/edy-portrait-suit.jpg',
  desktopSrc: '/images/edy-portrait-desktop.png',
  width: 1023,
  height: 1537,
  sizes: '(max-width: 760px) 90vw, 53vw',
};

export function HeroIntro({ className = '' }: { className?: string }) {
  return (
    <div className={`eg-intro ${className}`}>
      <p className="eg-eyebrow eg-hero-disciplines">
        <span>Suporte de TI</span>{' · '}<span>Segurança</span>{' · '}<span>Desenvolvimento</span>{' · '}<span>Automação</span>
      </p>
      <h1 id="eg-title"><span>Edy</span>{' '}<span>Gomes</span></h1>
      <p className="eg-proposal">Desenvolvo sistemas e automações para resolver problemas reais.</p>
      <a href="#projetos" className="eg-button">Ver projetos</a>
    </div>
  );
}
