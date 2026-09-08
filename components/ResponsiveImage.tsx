import Image from 'next/image';
import sources from '@/data/image-sources.json';

type Props = {
  src: string;
  desktopSrc?: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function ResponsiveImage({ src, desktopSrc, alt, width, height, sizes, priority = false, className, style }: Props) {
  const variants = (sources as Record<string, { avif: string; webp: string }>)[src];
  const desktopVariants = desktopSrc
    ? (sources as Record<string, { avif: string; webp: string }>)[desktopSrc]
    : undefined;

  return (
    <picture>
      {desktopVariants?.avif && <source media="(min-width: 768px)" type="image/avif" srcSet={desktopVariants.avif} sizes={sizes} />}
      {desktopVariants?.webp && <source media="(min-width: 768px)" type="image/webp" srcSet={desktopVariants.webp} sizes={sizes} />}
      {variants?.avif && <source media={desktopSrc ? '(max-width: 767px)' : undefined} type="image/avif" srcSet={variants.avif} sizes={sizes} />}
      {variants?.webp && <source media={desktopSrc ? '(max-width: 767px)' : undefined} type="image/webp" srcSet={variants.webp} sizes={sizes} />}
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} unoptimized
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
        className={className} style={style} />
    </picture>
  );
}
