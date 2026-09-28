import MotionButton from './motion-button';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

export interface CarouselItem { title: string; tag: string; location: string; desc: string; img: string; alt: string; url: string; preview: string; }

// Adapted from the supplied CoverFlowCarousel: circular offsets, perspective,
// layered cards, image ambience, autoplay, swipe, arrows and pagination.
export function CoverFlowCarousel({items}: {items: CarouselItem[]}) {
  const [current, setCurrent] = useState(0);
  const [previewing, setPreviewing] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reduce, setReduce] = useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const root = useRef<HTMLDivElement>(null);
  useEffect(()=>{if(!root.current)return;const frames=[...root.current.querySelectorAll<HTMLElement>('.project-scroll-preview')];const resize=new ResizeObserver(entries=>entries.forEach(entry=>(entry.target as HTMLElement).style.setProperty('--preview-window',`${entry.contentRect.height}px`)));frames.forEach(frame=>resize.observe(frame));return()=>resize.disconnect()},[]);
  const touch = useRef({x:0,y:0});
  const swiped = useRef(false);
  const total=items.length;
  const move=useCallback((direction:number)=>setCurrent(index=>(index+direction+total)%total),[total]);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting && entry.intersectionRatio>=.15),{threshold:[0,.15]});
    if(root.current)observer.observe(root.current);
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const changed=()=>setReduce(media.matches),visibility=()=>setHidden(document.hidden);
    media.addEventListener('change',changed);document.addEventListener('visibilitychange',visibility);
    return()=>{observer.disconnect();media.removeEventListener('change',changed);document.removeEventListener('visibilitychange',visibility)};
  },[]);
  useEffect(()=>{
    if(paused||focused||hovering||previewing!==null||!visible||hidden||reduce||total<2)return;
    let interval:ReturnType<typeof setInterval>|undefined;
    const first=setTimeout(()=>{move(1);interval=setInterval(()=>move(1),3000)},900);
    return()=>{clearTimeout(first);if(interval!==undefined)clearInterval(interval)};
  },[paused,focused,hovering,previewing,visible,hidden,reduce,total,move]);
  useEffect(()=>{const count=document.getElementById('work-count');if(count)count.textContent=String(current+1).padStart(2,'0')},[current]);
  const select=(index:number)=>{setPaused(true);setPreviewing(null);setCurrent(index)};
  const navigate=(direction:number)=>{setPaused(true);setPreviewing(null);move(direction)};
  if(!total)return null;
  return <div className="coverflow" ref={root} role="region" aria-roledescription="carousel" aria-label="Selected websites" tabIndex={0}
    onFocusCapture={event=>setFocused(event.target.matches(':focus-visible'))} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false)}}
    onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();navigate(event.key==='ArrowLeft'?-1:1)}}}>
    <div className="coverflow-ambience" aria-hidden="true">{items.map((item,index)=><img key={item.url} src={item.img} alt="" style={{opacity:index===current?1:0}} />)}</div>
    <div className="coverflow-stage" onTouchStart={event=>{swiped.current=false;touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY}}}
      onTouchEnd={event=>{const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){swiped.current=true;navigate(dx<0?1:-1)}}}
      onClickCapture={event=>{if(swiped.current){event.preventDefault();event.stopPropagation();swiped.current=false}}}>
      {items.map((item,index)=>{
        const offset=(index-current+total)%total;
        const center=offset===0;
        const side=offset===1?1:offset===total-1?-1:2;
        const style={transform:center?'translateX(0) scale(1) rotateY(0deg)':`translateX(calc(var(--cover-step) * ${side})) scale(${Math.abs(side)===1?.79:.58}) rotateY(${-Math.sign(side)*27}deg)`,opacity:center?1:Math.abs(side)===1?.55:0,zIndex:center?30:Math.abs(side)===1?20:0,filter:center?'brightness(1)':'brightness(.65)'} as CSSProperties;
        return <article key={item.url} className={`coverflow-card ${center?'is-current':''}`} style={style} aria-roledescription="slide" aria-label={`${index+1} of ${total}: ${item.title}`} aria-hidden={!center} inert={!center}>
          <div className="coverflow-browser"><span aria-hidden="true">● ● ●</span><span>{new URL(item.url).hostname}</span><span aria-hidden="true">↗</span></div>
          <a href={item.url} target="_blank" rel="noopener" className={`coverflow-image project-scroll-preview${previewing===index ? " is-previewing" : ""}`} onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} aria-label={`Visit ${item.title} website`} draggable={false}>
            <img src={item.preview} alt={`${item.title} website page preview`} loading="lazy" draggable={false}/>
          </a>
          <button type="button" className="project-preview-toggle mono" aria-pressed={previewing===index} onClick={()=>{setPaused(true);setPreviewing(previewing===index?null:index)}}>{previewing===index ? "Reset preview" : "Preview website"}</button>
          <div className="coverflow-info"><div className="coverflow-meta mono"><span>{item.tag}</span><span>{item.location}</span></div>
            <div className="coverflow-caption"><div><h3>{item.title}</h3><p>{item.desc}</p></div>
              <MotionButton label="View website" href={item.url} target="_blank" rel="noopener" aria-label={`View ${item.title} website`}/>
            </div>
          </div>
        </article>;
      })}
      <button className="coverflow-side coverflow-left" onClick={()=>navigate(-1)} aria-label={`Show ${items[(current-1+total)%total].title}`}/>
      <button className="coverflow-side coverflow-right" onClick={()=>navigate(1)} aria-label={`Show ${items[(current+1)%total].title}`}/>
    </div>
    <div className="coverflow-controls"><button className="coverflow-arrow liquid-glass" onClick={()=>navigate(-1)} aria-label="Previous website">←</button>
      <div className="coverflow-dots">{items.map((item,index)=><button key={item.url} onClick={()=>select(index)} aria-label={`Show project ${index+1}: ${item.title}`} aria-current={index===current?'true':undefined}><span/></button>)}</div>
      <button className="coverflow-arrow liquid-glass" onClick={()=>navigate(1)} aria-label="Next website">→</button>
    </div>
    <div className="coverflow-bottom mono"><span aria-live={paused||focused?'polite':'off'}>{String(current+1).padStart(2,'0')} / {String(total).padStart(2,'0')} — {items[current].title}</span>
    </div>
  </div>;
}
