import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function SiteFrame({ children, showFooter = true }: { children: React.ReactNode; showFooter?: boolean }) {
  return (
    <div className="site-frame">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      {children}
      {showFooter && <Footer />}
    </div>
  );
}
