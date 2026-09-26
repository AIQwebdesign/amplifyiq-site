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
let scrollPending=false;
function renderScroll(){scrollPending=false;const max=document.documentElement.scrollHeight-innerHeight;$('.page-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;$('header').classList.toggle('is-scrolled',scrollY>90);
const signalRect=$('.growth-signal').getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-signalRect.top)/(innerHeight*.7)));$$('.growth-signal i').forEach((bar,i)=>bar.style.transform=motion.matches?'':`scaleY(${.2+.8*Math.min(1,p*(1.5-i*.15))})`);
}
addEventListener("scroll",()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(renderScroll)}},{passive:true});addEventListener("resize",renderScroll);motion.addEventListener("change",renderScroll);renderScroll();
