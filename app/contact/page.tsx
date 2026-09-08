import type { Metadata } from 'next';
import { ArrowUpRight, Braces, Network, Mail, MapPin } from 'lucide-react';
import { SiteFrame } from '@/components/SiteFrame';
import { PageReveal } from '@/components/PageReveal';
import { isPlaceholder, site } from '@/data/site';
import { TextReveal } from '@/components/motion/TextReveal';
import { pageSocialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com Edmilson Gomes para oportunidades, projetos e conversas sobre tecnologia.',
  ...pageSocialMetadata('/contact', 'Contato — EDY GOMES', 'Entre em contato com Edmilson Gomes para oportunidades, projetos e conversas sobre tecnologia.'),
};

const contacts = [
  { label: 'Email', value: site.contact.email, icon: Mail },
  { label: 'GitHub', value: site.contact.github, icon: Braces },
  { label: 'LinkedIn', value: site.contact.linkedin, icon: Network },
  { label: 'Localização', value: site.contact.location, icon: MapPin },
];

export default function ContactPage() {
  return (
    <SiteFrame showFooter={false}>
      <main className="contact-page">
        <section className="contact-hero">
          <p className="page-kicker"><span>04 / CONTATO</span><span>Aberto a trabalhos com propósito</span></p>
          <div className="contact-composition">
            <TextReveal ariaLabel="Vamos construir algo útil" lines={['VAMOS', <em key="something">CONSTRUIR</em>, 'ALGO ÚTIL']} />
            <div className="contact-aside">
              <PageReveal className="contact-intro">
                <p>Estou aberto a oportunidades, projetos interessantes e boas conversas sobre tecnologia, ideias e o que vem a seguir.</p>
              </PageReveal>
              <p className="contact-signoff">A mesma disciplina.<br />Mais possibilidades.</p>
            </div>
          </div>
          <div className="contact-grid">
            {contacts.map(({ label, value, icon: Icon }, index) => {
              const disabled = isPlaceholder(value) || label === 'Localização';
              const href = label === 'Email' ? `mailto:${value}` : value;
              const content = <><Icon aria-hidden="true" /><span><small>{label}</small>{disabled && isPlaceholder(value) ? 'Adicionar no arquivo de dados' : value}</span>{!disabled && <ArrowUpRight aria-hidden="true" />}</>;
              return (
                <PageReveal className="contact-item" key={label} delay={index * .06}>
                  {disabled ? <div>{content}</div> : <a href={href} target={label === 'GitHub' || label === 'LinkedIn' ? '_blank' : undefined} rel="noreferrer">{content}</a>}
                </PageReveal>
              );
            })}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
