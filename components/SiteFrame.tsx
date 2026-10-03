import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RouteChapter } from './NextChapter';
import { AmbientField } from './motion/AmbientField';
import { CursorSparkShader } from './motion/CursorSparkShader';

export function SiteFrame({ children, showFooter = true }: { children: React.ReactNode; showFooter?: boolean }) {
  return (
    <div className="site-frame">
      <AmbientField />
      <CursorSparkShader />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      {children}
      <RouteChapter />
      {showFooter && <Footer />}
    </div>
  );
}
