import type { CaseIdentity } from '@/data/case-identity';
import './case-identity.css';

export function ProjectIdentity({ identity }: { identity: CaseIdentity }) {
  return (
    <section id="identidade" className="pf-section pf-section-paper pf-case-identity" aria-labelledby="pf-case-identity-title">
      <div className="pf-section-split">
        <h2 id="pf-case-identity-title" className="pf-heading"><em>Identidade</em><br />visual</h2>
        <div className="pf-reading">
          <p>{identity.description}</p>
          <p><strong>Tipografia</strong><br />{identity.typography}</p>
        </div>
      </div>

      <div className="pf-case-palette">
        <h3 id="pf-case-palette-title">Paleta de cores</h3>
        {identity.paletteNote && <p className="pf-case-palette-note">{identity.paletteNote}</p>}
        <ul className="pf-case-swatches" aria-labelledby="pf-case-palette-title">
          {identity.colors.map(({ name, value }) => (
            <li key={name}>
              <span className="pf-case-swatch" style={{ backgroundColor: value }} aria-hidden="true" />
              <strong>{name}</strong>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>

      {!!identity.details?.length && (
        <div className="pf-case-identity-details">
          <h3>Características visuais</h3>
          <ul>
            {identity.details.map(detail => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}
