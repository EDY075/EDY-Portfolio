import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RouteChapter } from './NextChapter';

export function SiteFrame({ children, showFooter = true }: { children: React.ReactNode; showFooter?: boolean }) {
  return (
    <div className="site-frame">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      {children}
      <RouteChapter />
      {showFooter && <Footer />}
    </div>
  );
}
