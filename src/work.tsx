import { createRoot } from 'react-dom/client';
import { CoverFlowCarousel, type CarouselItem } from './components/ui/3-d-coverflow-carousel';

const track=document.querySelector<HTMLElement>('.work-track');
if(track){
  const items:CarouselItem[]=[...track.querySelectorAll('.project')].map((card,index)=>({
    preview:['assets/preview-quay.webp','assets/preview-et.webp','assets/preview-kiko.webp','assets/preview-richie.webp','assets/preview-wonder.webp'][index],
    title:card.querySelector('h3')!.textContent!,
    tag:card.querySelector('.project-meta span')!.textContent!,
    location:card.querySelector('.project-meta span:last-child')!.textContent!,
    desc:[...card.querySelector('.project-bottom p')!.childNodes].map(node=>node.nodeName==='BR'?' ':node.textContent).join('').replace(/\s+/g,' ').trim(),
    img:card.querySelector('img')!.getAttribute('src')!,
    alt:card.querySelector('img')!.alt,
    url:card.querySelector<HTMLAnchorElement>('.project-image')!.href
  }));
  track.className='coverflow-root';
  createRoot(track).render(<CoverFlowCarousel items={items}/>);
}
