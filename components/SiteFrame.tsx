import { Footer } from './Footer';
import { RouteChapter } from './NextChapter';
import { PreviewMenu } from '@/app/preview/PreviewMenu';

export function SiteFrame({ children, showFooter = true }: { children: React.ReactNode; showFooter?: boolean }) {
  return (
    <div className="site-frame eg-preview eg-site">
      <PreviewMenu />
      {children}
      <RouteChapter />
      {showFooter && <Footer />}
    </div>
  );
}
