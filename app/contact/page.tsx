import type { Metadata } from 'next';
import { Braces, Camera, Mail, MapPin, Network } from 'lucide-react';
import { SiteFrame } from '@/components/SiteFrame';
import { isPlaceholder, site } from '@/data/site';
import { pageSocialMetadata } from '@/lib/seo';
import { ContactOptions } from './ContactOptions';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com Edmilson Gomes para oportunidades, projetos e conversas sobre tecnologia.',
  ...pageSocialMetadata('/contact', 'Contato — EDY GOMES', 'Entre em contato com Edmilson Gomes para oportunidades, projetos e conversas sobre tecnologia.'),
};

const contacts = [
  { label: 'Email', value: site.contact.email, icon: Mail, href: `mailto:${site.contact.email}` },
  { label: 'GitHub', value: site.contact.github, icon: Braces, href: site.contact.github, external: true },
  { label: 'LinkedIn', value: site.contact.linkedin, icon: Network, href: site.contact.linkedin, external: true },
  { label: 'Instagram', value: site.contact.instagram, icon: Camera, href: site.contact.instagram, external: true },
  { label: 'Localização', value: site.contact.location, icon: MapPin },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ visual?: string | string[] }> }) {
  const { visual } = await searchParams;
  const intro = (
    <div className="ct-intro">
      <p className="ct-label">Contato</p>
      <h1 id="pf-contact-title" className="ct-title"><em>Vamos</em> conversar</h1>
      <p className="ct-lead">Estou aberto a oportunidades, projetos e conversas sobre tecnologia.</p>
    </div>
  );

  const channels = (
    <ul className="ct-links" aria-label="Canais de contato">
      {contacts.map(({ label, value, icon: Icon, href, external }) => {
        if (isPlaceholder(value)) return null;
        const handle = value.replace(/^https:\/\/(?:www\.)?instagram\.com\//, '@').replace(/^https:\/\/(?:www\.)?/, '').replace(/\/$/, '');
        const content = <><Icon aria-hidden="true" /><span><strong>{label}</strong><span>{handle}</span></span></>;
        return (
          <li key={label}>
            {href ? <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a> : <div>{content}</div>}
          </li>
        );
      })}
    </ul>
  );

  return (
    <SiteFrame showFooter={false}>
      <main className="pf-page pf-contact">
        <ContactOptions key={String(visual)} initial={visual} intro={intro} contacts={channels} />
      </main>
    </SiteFrame>
  );
}
