import type { Metadata } from 'next';
import { ArrowUpRight, Braces, Network, Mail, MapPin } from 'lucide-react';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { isPlaceholder, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Entre em contato com Edmilson Gomes para oportunidades, projetos e conversas sobre tecnologia.',
};

const contacts = [
  { label: 'Email', value: site.contact.email, icon: Mail },
  { label: 'GitHub', value: site.contact.github, icon: Braces },
  { label: 'LinkedIn', value: site.contact.linkedin, icon: Network },
  { label: 'Location', value: site.contact.location, icon: MapPin },
];

export default function ContactPage() {
  return (
    <SiteFrame showFooter={false}>
      <main className="contact-page">
        <section className="contact-hero">
          <p className="page-kicker"><span>04 / GET IN TOUCH</span><span>Open to meaningful work</span></p>
          <PageReveal><h1>LET&apos;S BUILD<br /><em>SOMETHING</em><br />USEFUL</h1></PageReveal>
          <PageReveal className="contact-intro">
            <p>Estou aberto a oportunidades, projetos interessantes e boas conversas sobre tecnologia, ideias e o que vem a seguir.</p>
          </PageReveal>
          <div className="contact-grid">
            {contacts.map(({ label, value, icon: Icon }, index) => {
              const disabled = isPlaceholder(value) || label === 'Location';
              const href = label === 'Email' ? `mailto:${value}` : value;
              const content = <><Icon aria-hidden="true" /><span><small>{label}</small>{disabled && isPlaceholder(value) ? 'Adicionar no arquivo de dados' : value}</span>{!disabled && <ArrowUpRight aria-hidden="true" />}</>;
              return (
                <PageReveal className="contact-item" key={label} delay={index * .06}>
                  {disabled ? <div>{content}</div> : <a href={href} target={label === 'GitHub' || label === 'LinkedIn' ? '_blank' : undefined} rel="noreferrer">{content}</a>}
                </PageReveal>
              );
            })}
          </div>
          <p className="contact-signoff">Same discipline.<br />Bigger possibilities.</p>
        </section>
      </main>
    </SiteFrame>
  );
}
