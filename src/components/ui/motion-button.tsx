import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes } from 'react';

export function MotionButtonContent({ label }: { label: string }) {
  return <><span className="motion-button-circle" aria-hidden="true"/><span className="motion-button-icon" aria-hidden="true"><ArrowRight size={21}/></span><span className="motion-button-text">{label}</span></>;
}

export default function MotionButton({ label, className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { label: string }) {
  return <a {...props} className={`motion-button ${className}`}><MotionButtonContent label={label}/></a>;
}
