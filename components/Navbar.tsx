'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/data/site';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className={pathname === '/work' ? 'site-nav nav-on-light' : 'site-nav'}>
      <Link href="/" className="brand" aria-label="Edy — página inicial">{site.mark}</Link>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav id="primary-navigation" aria-label="Navegação principal" className={open ? 'nav-links is-open' : 'nav-links'}>
        <div className="nav-primary">
          {site.navigation.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
        </div>
        <div className="nav-social">
          <a href={site.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <span aria-disabled="true">LinkedIn</span>
        </div>
      </nav>
    </header>
  );
}
