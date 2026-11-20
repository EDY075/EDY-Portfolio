'use client';

import { useState } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import type { ProjectImage } from '@/data/projects';

export type ProjectSequenceFrame = { label: string; image: ProjectImage; description: string };

export function ProjectSequence({
  frames,
  projectTitle,
  initialFrame,
}: {
  frames: ProjectSequenceFrame[];
  projectTitle: string;
  initialFrame?: string;
}) {
  const [selected, setSelected] = useState(() => Math.max(0, frames.findIndex(frame => frame.label === initialFrame)));
  const frame = frames[selected];

  return (
    <figure className="eg-sequence">
      <fieldset className="eg-sequence-controls">
        <legend className="sr-only">Telas de {projectTitle}</legend>
        {frames.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={selected === index}
            aria-controls="eg-sequence-frame"
            onClick={() => setSelected(index)}
          >
            {label}
          </button>
        ))}
      </fieldset>
      <div id="eg-sequence-frame" className="eg-sequence-media">
        {frames.map(({ image, label }, index) => (
          <div key={label} className="eg-sequence-slide" data-active={index === selected} aria-hidden={index !== selected}>
            <ResponsiveImage {...image} sizes="(max-width: 700px) 90vw, 55vw" />
          </div>
        ))}
      </div>
      <figcaption aria-live="polite">{frame.description}</figcaption>
    </figure>
  );
}
