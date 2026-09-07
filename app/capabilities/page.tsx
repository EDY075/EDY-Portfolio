import type { Metadata } from 'next';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { capabilities } from '@/data/about';

export const metadata: Metadata = {
  title: 'Capabilities',
  description: 'Capacidades de Edmilson Gomes em suporte, segurança, sistemas, automação, dados e documentação.',
};

export default function CapabilitiesPage() {
  return (
    <SiteFrame>
      <main className="capabilities-page">
        <section className="capabilities-hero">
          <p className="page-kicker"><span>03 / CAPABILITIES</span><span>Technology that works for people</span></p>
          <PageReveal>
            <h1>
              {capabilities.map((capability, index) => (
                <span key={capability.title} className={index % 2 ? 'capability-offset' : ''}>{capability.title}</span>
              ))}
            </h1>
          </PageReveal>
          <p className="capability-quote">Solve. Organize.<br />Automate. Improve.</p>
        </section>
        <section className="capability-details">
          {capabilities.map((capability, index) => (
            <PageReveal className="capability-column" key={capability.title} delay={(index % 3) * .06}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{capability.title}</h2>
              <ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </PageReveal>
          ))}
        </section>
      </main>
    </SiteFrame>
  );
}
