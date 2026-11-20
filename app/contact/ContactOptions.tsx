'use client';

import { useState, type ReactNode } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { ContactOptionB } from './ContactOptionB';
import { ContactOptionC } from './ContactOptionC';
import './contact-options.css';

const options = [
  { id: 'a', label: 'Carta aberta' },
  { id: 'b', label: 'Retrato em cena' },
  { id: 'c', label: 'Assinatura em movimento' },
] as const;

type Option = (typeof options)[number]['id'];
type ContactContent = { intro: ReactNode; contacts: ReactNode };

function ContactOptionA({ intro, contacts }: ContactContent) {
  return (
    <section className="ct-option-a" aria-labelledby="pf-contact-title">
      {intro}
      <figure className="ct-a-photo">
        <ResponsiveImage
          src="/images/edy-portrait-desktop.png"
          alt="Retrato de Edmilson Gomes"
          width={1672}
          height={941}
          sizes="(max-width: 800px) 92vw, 58vw"
          priority
        />
      </figure>
      {contacts}
    </section>
  );
}

const visuals = {
  a: ContactOptionA,
  b: ContactOptionB,
  c: ContactOptionC,
};

export function ContactOptions({ initial, intro, contacts }: ContactContent & { initial?: string | string[] }) {
  const preview = options.find(item => item.id === initial);
  const [active, setActive] = useState<Option>(preview?.id ?? 'b');
  const Visual = visuals[active];

  function select(option: Option) {
    if (option === active) return;
    const url = new URL(window.location.href);
    url.searchParams.set('visual', option);
    window.history.replaceState(window.history.state, '', url);
    setActive(option);
  }

  return (
    <div className="ct-comparison" data-contact-option={active} data-comparing={Boolean(preview)}>
      {preview && (
        <fieldset className="ct-picker">
          <legend>Comparar visual</legend>
          <div className="ct-picker-buttons">
            {options.map(({ id, label }) => (
              <button
                type="button"
                key={id}
                aria-label={`${id.toUpperCase()} · ${label}`}
                aria-pressed={active === id}
                onClick={() => select(id)}
              >
                {id.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="ct-picker-name" aria-live="polite">
            {options.find(item => item.id === active)?.label}
          </span>
        </fieldset>
      )}
      <Visual intro={intro} contacts={contacts} />
    </div>
  );
}
