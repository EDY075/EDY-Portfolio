'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { ProjectSequence, type ProjectSequenceFrame } from './ProjectSequence';
import { WarRoomGalaxy } from './WarRoomGalaxy';
import './war-room-comparison.css';

const options = [
  { id: 'a', label: 'Resumo direto' },
  { id: 'b', label: 'Capa cinematográfica' },
  { id: 'c', label: 'Exploração guiada' },
] as const;

type Option = (typeof options)[number]['id'];

type Props = {
  option?: string;
  frames: ProjectSequenceFrame[];
  title: string;
  subtitle: string;
  caseHref: string;
  liveHref?: string;
};

const facts = [
  { value: '17', label: 'dossiês' },
  { value: '102', label: 'capítulos' },
  { value: '42 min', label: 'de narração, aprox.' },
];

export function WarRoomShowcase({ option, frames, title, subtitle, caseHref, liveHref }: Props) {
  const compareOption = options.find(item => item.id === option);
  const [active, setActive] = useState<Option>(compareOption?.id ?? 'b');
  const cover = frames[0].image;
  const map = frames.find(frame => frame.label === 'Mapa') ?? frames[0];

  function select(choice: Option) {
    if (active === choice) return;
    setActive(choice);
    const url = new URL(window.location.href);
    url.searchParams.set('warroom', choice);
    url.hash = 'vitrine-war-room';
    window.history.replaceState(window.history.state, '', url);
  }

  return (
    <section id="vitrine-war-room" className="eg-war-compare" aria-labelledby="eg-war-title" data-war-option={active}>
      {compareOption && (
        <fieldset className="eg-war-picker">
          <legend>Comparar vitrine do WAR ROOM</legend>
          <div className="eg-war-options">
            {options.map(({ id, label }) => (
              <button key={id} type="button" aria-pressed={active === id} aria-label={`${id.toUpperCase()} · ${label}`} onClick={() => select(id)}>
                {id.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="eg-war-option-name" aria-live="polite">
            {options.find(item => item.id === active)?.label}
          </span>
        </fieldset>
      )}
      <article className="eg-war-content">
        <div className="eg-war-copy">
          <p className="eg-eyebrow">Documentário interativo</p>
          <h3 id="eg-war-title">{title}</h3>
          <p className="eg-war-intro">{subtitle}</p>

          {active !== 'c' && (
            <dl className="eg-war-facts">
              {facts.map(({ value, label }) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          )}

          {active === 'c' && (
            <p className="eg-war-guide">Explore o mapa, veja a abertura ou conheça o player dos episódios narrados.</p>
          )}

          <div className="eg-war-actions">
            {liveHref && <a className="eg-button" href={liveHref} target="_blank" rel="noopener noreferrer">Explorar o WAR ROOM</a>}
            <Link className="eg-link" href={caseHref} prefetch={false} data-cover-src={cover.src}>Ver como foi construído</Link>
          </div>
        </div>

        {active === 'a' && (
          <figure className="eg-war-cover">
            <ResponsiveImage {...map.image} sizes="(max-width: 840px) 92vw, 53vw" />
          </figure>
        )}
        {active === 'b' && <WarRoomGalaxy />}
        {active === 'c' && <ProjectSequence frames={frames} projectTitle={title} initialFrame={map.label} />}
      </article>
    </section>
  );
}
