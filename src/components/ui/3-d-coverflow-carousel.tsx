import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

export interface CarouselItem { title: string; tag: string; location: string; desc: string; img: string; alt: string; url: string; }

// Adapted from the supplied CoverFlowCarousel: circular offsets, perspective,
// layered cards, image ambience, autoplay, swipe, arrows and pagination.
export function CoverFlowCarousel({items}: {items: CarouselItem[]}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reduce, setReduce] = useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef({x:0,y:0});
  const total=items.length;
  const move=useCallback((direction:number)=>setCurrent(index=>(index+direction+total)%total),[total]);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.35});
    if(root.current)observer.observe(root.current);
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const changed=()=>setReduce(media.matches),visibility=()=>setHidden(document.hidden);
    media.addEventListener('change',changed);document.addEventListener('visibilitychange',visibility);
    return()=>{observer.disconnect();media.removeEventListener('change',changed);document.removeEventListener('visibilitychange',visibility)};
  },[]);
  useEffect(()=>{
    if(paused||hovered||focused||!visible||hidden||reduce||total<2)return;
    const interval=setInterval(()=>move(1),6500);return()=>clearInterval(interval);
  },[paused,hovered,focused,visible,hidden,reduce,total,move]);
  useEffect(()=>{const count=document.getElementById('work-count');if(count)count.textContent=String(current+1).padStart(2,'0')},[current]);
  const select=(index:number)=>{setPaused(true);setCurrent(index)};
  const navigate=(direction:number)=>{setPaused(true);move(direction)};
  if(!total)return null;
  return <div className="coverflow" ref={root} role="region" aria-roledescription="carousel" aria-label="Selected websites" tabIndex={0}
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
    onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false)}}
    onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();navigate(event.key==='ArrowLeft'?-1:1)}}}>
    <div className="coverflow-ambience" aria-hidden="true">{items.map((item,index)=><img key={item.url} src={item.img} alt="" style={{opacity:index===current?1:0}} />)}</div>
    <div className="coverflow-stage" onTouchStart={event=>{touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY}}}
      onTouchEnd={event=>{const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))navigate(dx<0?1:-1)}}>
      {items.map((item,index)=>{
        const offset=(index-current+total)%total;
        const center=offset===0;
        const side=offset===1?1:offset===total-1?-1:2;
        const style={transform:center?'translateX(0) scale(1) rotateY(0deg)':`translateX(calc(var(--cover-step) * ${side})) scale(${Math.abs(side)===1?.79:.58}) rotateY(${-Math.sign(side)*27}deg)`,opacity:center?1:Math.abs(side)===1?.55:0,zIndex:center?30:Math.abs(side)===1?20:0,filter:center?'brightness(1)':'brightness(.65)'} as CSSProperties;
        return <article key={item.url} className={`coverflow-card ${center?'is-current':''}`} style={style} aria-roledescription="slide" aria-label={`${index+1} of ${total}: ${item.title}`} aria-hidden={!center} inert={!center}>
          <div className="coverflow-browser"><span aria-hidden="true">● ● ●</span><span>{new URL(item.url).hostname}</span><span aria-hidden="true">↗</span></div>
          <a href={item.url} target="_blank" rel="noopener" className="coverflow-image" aria-label={`Visit ${item.title} website`} draggable={false}>
            <img src={item.img} alt={item.alt} width="1265" height="712" draggable={false}/>
          </a>
          <div className="coverflow-info"><div className="coverflow-meta mono"><span>{item.tag}</span><span>{item.location}</span></div>
            <div className="coverflow-caption"><div><h3>{item.title}</h3><p>{item.desc}</p></div>
              <a className="button liquid-glass" href={item.url} target="_blank" rel="noopener" aria-label={`View ${item.title} website`}><span className="glass-refraction" aria-hidden="true"/><span className="glass-content">View website <span>↗</span></span></a>
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
      {!reduce&&<button onClick={()=>setPaused(value=>!value)} aria-label={paused?'Play project slideshow':'Pause project slideshow'}>{paused?'Play slideshow ▷':'Pause slideshow Ⅱ'}</button>}
    </div>
  </div>;
}
