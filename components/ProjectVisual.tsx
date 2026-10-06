import { ResponsiveImage } from './ResponsiveImage';
import type { ProjectImage } from '@/data/projects';

export function ProjectVisual({
  image,
  priority = false,
  sizes,
}: {
  image: ProjectImage;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className="project-real-media">
      <ResponsiveImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="project-real-image"
        style={{ objectFit: image.fit ?? 'contain', objectPosition: image.position ?? 'center' }}
      />
    </div>
  );
}
