'use client';

import { Children, type CSSProperties, type HTMLAttributes } from 'react';

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  fade?: boolean;
  fadeAmount?: number;
}

/** Scoped version of the supplied marquee, with accessible duplicate content. */
export function Marquee({ children, className = '', duration = 20, pauseOnHover = false,
  direction = 'left', fade = true, fadeAmount = 10, style, ...props }: MarqueeProps) {
  const vertical = direction === 'up' || direction === 'down';
  const edge = Math.min(49, Math.max(0, fadeAmount));
  const mask = fade ? `linear-gradient(to ${vertical ? 'bottom' : 'right'}, transparent, black ${edge}%, black ${100 - edge}%, transparent)` : undefined;
  const items = Children.toArray(children);
  return <div {...props} className={`aiq-marquee ${className}`} data-direction={direction}
    data-pause={pauseOnHover || undefined}
    style={{ '--marquee-duration': `${Math.max(1, duration)}s`, maskImage: mask, WebkitMaskImage: mask, ...style } as CSSProperties}>
    <div className="aiq-marquee-track">
      <div className="aiq-marquee-group">{items}</div>
      <div className="aiq-marquee-group" aria-hidden="true" inert>{items}</div>
    </div>
  </div>;
}
