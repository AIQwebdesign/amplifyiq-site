import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PaperCurlCarousel from './paper-curl-carousel';
import type { CarouselItem } from './3-d-coverflow-carousel';

export default function CustomerPaperCarousel({ items }: { items: CarouselItem[] }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const count = document.getElementById('work-count');
    if (count) count.textContent = String(current + 1).padStart(2, '0');
  }, [current]);
  if (!items.length) return null;
  const item = items[current];
  return <div className="customer-paper-carousel">
    <div className="customer-paper-top"><span className="mono">SELECTED WEBSITES</span><span>Drag or tap to turn the page</span></div>
    <PaperCurlCarousel items={items.map(item => ({ src: item.img, title: item.title, alt: item.alt }))}
      index={current} onIndexChange={setCurrent} autoplay={3000} paper="#d9edf6" height="auto" />
    <div className="customer-paper-details">
      <div><div className="mono">{item.tag} · {item.location}</div><h3>{item.title}</h3><p>{item.desc}</p></div>
      <a href={item.url} target="_blank" rel="noopener" aria-label={`View ${item.title} website`}>View website <ArrowUpRight size={18}/></a>
    </div>
    <div className="customer-paper-dots" aria-label="Choose a project">{items.map((project,index) => <button key={project.url} onClick={() => setCurrent(index)}
      aria-label={`Show project ${index + 1}: ${project.title}`} aria-current={index === current ? 'true' : undefined}><span/></button>)}</div>
  </div>;
}
