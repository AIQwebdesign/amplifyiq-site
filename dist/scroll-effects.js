// Adaptations of the supplied LiquidButton, InversionCircleScrollAnimation,
// and CinematicFooter. Native page scroll avoids a nested scroll container.
(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=matchMedia('(max-width:650px)');
  const track=document.querySelector('.circle-track'),sticky=document.querySelector('.circle-sticky');
  const ball=document.querySelector('.circle-ball'),light=document.querySelector('.circle-light');
  const curtain=document.querySelector('.footer-curtain'),giant=document.querySelector('.footer-giant');
  const center=document.querySelector('.footer-center'),footer=document.querySelector('.cinematic-footer');
  const clamp=n=>Math.min(1,Math.max(0,n));
  let frame=0;
  function render(){
    frame=0;
    const rect=track.getBoundingClientRect();
    if(rect.bottom>0 && rect.top<innerHeight){
    const h=sticky.clientHeight,w=sticky.clientWidth;
    const elapsed=Math.max(0,-rect.top),p1=clamp(elapsed/h),p2=clamp((elapsed-h)/h);
    const eased=p1<.5?8*p1**4:1-(-2*p1+2)**4/2;
    const base=Math.min(380,w*.65),offset=(1-eased)*(h/2+base/2);
    const diameter=base+p2*p2*(Math.max(w,h)*2.8-base);
    if(!reduce.matches){
      ball.style.width=ball.style.height=diameter+'px';
      ball.style.transform=`translate(-50%,calc(-50% + ${offset}px))`;
      light.style.clipPath=`circle(${diameter/2}px at ${w/2}px ${h/2+offset}px)`;
    }else{ball.removeAttribute('style');light.removeAttribute('style')}
    }
    if(mobile.matches){footer.style.transform='';giant.style.transform='';center.style.transform='';center.style.opacity='';return}
    const footerTop=curtain.getBoundingClientRect().top;
    // A clipped, translated surface recreates the curtain on touch browsers
    // without relying on fixed-position descendants. Tall content stays scrollable.
    footer.style.transform=reduce.matches?'none':`translate3d(0,${-Math.max(0,Math.min(innerHeight,footerTop))}px,0)`;
    const progress=clamp((innerHeight-footerTop)/(innerHeight*.85));
    giant.style.transform=reduce.matches?'none':`translateY(${(1-progress)*70}px) scale(${.88+progress*.12})`;
    center.style.transform=reduce.matches?'none':`translateY(${(1-progress)*40}px)`;
    // Content stays readable before/without animation; scroll adds depth only.
    center.style.opacity=reduce.matches?'1':String(.55+.45*progress);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(render)}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener('change',schedule);render();
  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{if(reduce.matches)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.16}px,${(e.clientY-r.top-r.height/2)*.2}px) scale(1.03)`});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }
})();
