import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { capabilities } from '@/data/about';
import { TextReveal } from '@/components/motion/TextReveal';
import { pageSocialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Competências',
  description: 'Capacidades de Edmilson Gomes em suporte, segurança, sistemas, automação, dados e documentação.',
  ...pageSocialMetadata('/capabilities', 'Competências — EDY GOMES', 'Capacidades de Edmilson Gomes em suporte, segurança, sistemas, automação, dados e documentação.'),
};

export default function CapabilitiesPage() {
  return (
    <SiteFrame>
      <main className="capabilities-page">
        <section className="capabilities-hero">
          <p className="page-kicker"><span>COMPETÊNCIAS</span><span>Tecnologia que funciona para pessoas</span></p>
          <TextReveal
            ariaLabel={capabilities.map((capability) => capability.title).join(', ')}
            lines={capabilities.map((capability, index) => <span key={capability.title} className={index % 2 ? 'capability-offset' : ''}>{capability.title}</span>)}
          />
          <p className="capability-quote">Resolver. Organizar.<br />Automatizar. Melhorar.</p>
        </section>
        <section className="capability-details">
          {capabilities.map((capability, index) => (
            <PageReveal className="capability-column" key={capability.title} delay={(index % 3) * .06}>
              <h2>{capability.title}</h2>
              <ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </PageReveal>
          ))}
        </section>
      </main>
    </SiteFrame>
  );
}
