const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const menu=$('#mobile-menu'),toggle=$('.menu-toggle');
function closeMenu(){menu.close();toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');toggle.focus({preventScroll:true})}
toggle.addEventListener('click',()=>{menu.showModal();toggle.setAttribute('aria-expanded','true');document.body.classList.add('menu-open')});
$('.menu-close').addEventListener('click',closeMenu);
menu.addEventListener('cancel',()=>{toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
$('#comparison').addEventListener('input',e=>$('.comparison').style.setProperty('--split',e.target.value+'%'));
let quote=0;const quotes=$$('.quotes figure');
function showQuote(n){quote=(n+quotes.length)%quotes.length;quotes.forEach((q,i)=>q.hidden=i!==quote);$('#quote-count').textContent=String(quote+1).padStart(2,'0')+' / 04'}
$('#quote-prev').addEventListener('click',()=>showQuote(quote-1));$('#quote-next').addEventListener('click',()=>showQuote(quote+1));
const stages=$$('.stages li');
const stageObserver=new IntersectionObserver(entries=>entries.forEach(e=>{e.target.classList.toggle('active',e.isIntersecting);if(e.isIntersecting)$('#stage-number').textContent=String(stages.indexOf(e.target)+1).padStart(2,'0')}),{rootMargin:'-20% 0px -30% 0px',threshold:0});
stages.forEach(el=>stageObserver.observe(el));
const work=$('.work'),track=$('.work-track'),pin=document.createElement('div');pin.className='work-pin';while(work.firstChild)pin.append(work.firstChild);work.append(pin);
let wide=false,scrollPending=false,paused=false;
function renderScroll(){scrollPending=false;const max=document.documentElement.scrollHeight-innerHeight;$('.page-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;$('header').classList.toggle('is-scrolled',scrollY>90);
if(wide){const progress=Math.max(0,Math.min(1,-work.getBoundingClientRect().top/(work.offsetHeight-innerHeight)));const travel=track.scrollWidth-innerWidth+innerWidth*.06;track.style.transform=`translate3d(${-progress*travel}px,0,0)`;$('#work-count').textContent=String(Math.min(4,Math.floor(progress*4)+1)).padStart(2,'0')}
const signalRect=$('.growth-signal').getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-signalRect.top)/(innerHeight*.7)));$$('.growth-signal i').forEach((bar,i)=>bar.style.transform=motion.matches?'':`scaleY(${.2+.8*Math.min(1,p*(1.5-i*.15))})`);
}
function configureMotion(){wide=innerWidth>=1000&&innerHeight>=680&&!motion.matches;work.classList.toggle('motion-work',wide);if(!wide)track.style.transform='';renderScroll()}
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(renderScroll)}},{passive:true});addEventListener('resize',configureMotion);motion.addEventListener('change',configureMotion);configureMotion();
track.addEventListener('focusin',event=>{if(!wide||!event.target.matches(':focus-visible'))return;const card=event.target.closest('.project');if(!card)return;const index=[...track.children].indexOf(card);window.scrollTo({top:scrollY+work.getBoundingClientRect().top+index/(track.children.length-1)*(work.offsetHeight-innerHeight),behavior:'instant'})});
