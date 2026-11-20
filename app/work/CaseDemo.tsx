import type { CaseDemo as CaseDemoContent } from '@/data/projects';
import './case-demo.css';

export function CaseDemo({ demo }: { demo: CaseDemoContent }) {
  return (
    <>
      <section id="demonstracao" className="pf-section pf-section-dark pf-case-demo" aria-labelledby="pf-case-demo-title">
        <div className="pf-case-demo-heading">
          <p className="pf-case-demo-label">Gravação de tela</p>
          <h2 id="pf-case-demo-title" className="pf-heading">Demonstração</h2>
          <p>{demo.description}</p>
        </div>
        <video
          className="pf-case-demo-video"
          aria-label={demo.title}
          controls
          playsInline
          preload="none"
          poster={demo.poster}
          width={1920}
          height={1080}
        >
          <source src={demo.src} type="video/mp4" />
          <track kind="captions" src={demo.captions} srcLang="pt-BR" label="Português (Brasil)" />
          Seu navegador não conseguiu reproduzir o vídeo. <a href={demo.src}>Abrir o vídeo</a>.
        </video>
        <p className="pf-case-demo-credit">
          Música: {demo.music.title}, {demo.music.artist} (<a href={demo.music.licenseHref} target="_blank" rel="noopener noreferrer">CC BY 4.0</a>).
        </p>
      </section>

      <section id="identidade" className="pf-section pf-section-paper pf-case-identity" aria-labelledby="pf-case-identity-title">
        <div className="pf-section-split">
          <h2 id="pf-case-identity-title" className="pf-heading"><em>Identidade</em><br />visual</h2>
          <div className="pf-reading">
            <p>{demo.identity.description}</p>
            <p><strong>Tipografia</strong><br />{demo.identity.typography}</p>
          </div>
        </div>

        <ul className="pf-case-swatches" aria-label="Paleta de cores">
          {demo.identity.colors.map(({ name, value }) => (
            <li key={name}>
              <span className="pf-case-swatch" style={{ backgroundColor: value }} aria-hidden="true" />
              <strong>{name}</strong>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
