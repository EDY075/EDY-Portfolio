import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { capabilities } from '@/data/about';
import { pageSocialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Competências',
  description: 'Capacidades de Edmilson Gomes em suporte, segurança, sistemas, automação, dados e documentação.',
  ...pageSocialMetadata('/capabilities', 'Competências — EDY GOMES', 'Capacidades de Edmilson Gomes em suporte, segurança, sistemas, automação, dados e documentação.'),
};

const sections = capabilities.map(capability => ({
  ...capability,
  id: capability.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
}));

export default function CapabilitiesPage() {
  return (
    <SiteFrame>
      <main className="pf-page pf-capabilities">
        <section className="pf-hero pf-capabilities-hero" data-portfolio-theme="light" aria-labelledby="pf-capabilities-title">
          <div className="pf-hero-copy">
            <p className="pf-label">Resolver. Organizar. Automatizar. Melhorar.</p>
            <h1 id="pf-capabilities-title" className="pf-title">Competências</h1>
            <p className="pf-lead">Tecnologia que funciona para pessoas.</p>
          </div>
          <nav className="pf-discipline-list" aria-label="Áreas de atuação">
            {sections.map(capability => (
              <a key={capability.title} href={`#${capability.id}`}>
                {capability.title}
              </a>
            ))}
          </nav>
        </section>

        <section className="pf-section pf-section-dark pf-contour" aria-label="Detalhes das competências">
          <div className="pf-editorial-grid">
            {sections.map((capability, index) => (
              <div id={capability.id} key={capability.title}>
                <PageReveal className="pf-panel" delay={(index % 3) * .06}>
                  <h2>{capability.title}</h2>
                  <ul>{capability.items.map(item => <li key={item}>{item}</li>)}</ul>
                </PageReveal>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
