const fs = require('node:fs');
const file='dist/index.html';
let html=fs.readFileSync(file,'utf8');
html=html.replace('<meta name="theme-color" content="#101013">','<meta name="theme-color" content="#07131f">');
html=html.replace('<link rel="stylesheet" href="styles.css">','<link rel="preload" as="image" href="assets/amplify-sculpture.png"><link rel="stylesheet" href="styles.css">');
html=html.replace('<script src="app.js" defer></script>','<script src="app.js" defer></script><script src="components.js" defer></script>');
const begin=html.indexOf('<section class="hero"');const end=html.indexOf('<section class="intro',begin);
html=html.slice(0,begin)+`<section class="hero" id="top" aria-labelledby="hero-title">
<div class="hero-art" aria-hidden="true"><img src="assets/amplify-sculpture.png" alt="" width="1536" height="1024" fetchpriority="high"><div class="hero-shade"></div></div>
<div class="hero-topline mono"><span>WEB DESIGN & DIGITAL GROWTH</span><span>CLAREMORRIS, MAYO · IRELAND</span></div>
<div class="hero-intro"><span class="studio-badge"><i></i> Independent thinking. Amplified.</span><p>Built to stand out.<br>Designed to grow.</p><a class="hero-work-link" href="#work">Explore our work <span>↗</span></a></div>
<div class="hero-cross" aria-hidden="true">+</div><span class="hero-side mono">GOOD IDEAS. GREATER POSSIBILITIES.</span>
<h1 id="hero-title"><span class="hero-small">BUILD. SCALE.</span><span class="hero-word">AMPLIFY<span class="period">.</span></span></h1>
<div class="hero-bottom"><a class="round-link" href="#about"><span class="round-arrow">↓</span><span>SCROLL TO<br>EXPLORE</span></a><p>We turn your next chapter into<br>a digital experience worth remembering.</p><a class="button" href="#contact">Start a project <span>↗</span></a></div>
<button class="motion-toggle" aria-pressed="false" aria-label="Pause ambient animation">Pause motion <span>Ⅱ</span></button>
</section>
<div class="client-strip"><span class="mono">GOOD COMPANY.<br>REAL COLLABORATIONS.</span><a href="https://quaywestballina.ie/" target="_blank" rel="noopener" class="client-quay">Quay West</a><a href="https://etcoaching.eu/" target="_blank" rel="noopener" class="client-et">ET<span>COACHING</span></a><a href="https://mrkikoswindowtinting.ie/" target="_blank" rel="noopener" class="client-kiko">Mr. Kiko’s Tints</a><a href="https://richiesbarbers.ie/" target="_blank" rel="noopener" class="client-richie">RICHIE’S <small>BARBERS</small></a></div>
`+html.slice(end);
html=html.replace('Your business.<br><span class="muted">Turned all the way</span> up<span class="accent">.</span>','A better first impression.<br><span class="muted">A bigger next chapter.</span>');
html=html.replace('<span class="asterisk" aria-hidden="true">✳</span>','<div class="studio-seal"><span>AIQ</span><small>BUILD / SCALE / AMPLIFY</small></div>');
html=html.replace('<article class="service">','<article class="service design">');
html=html.replace('<li>Digital products</li></ul></div></div></article>','<li>Digital products</li></ul></div></div><div class="design-experience glow-surface"><div class="design-copy"><span class="mono">THOUGHTFULLY BUILT. UNIQUELY YOURS.</span><h3>Everything starts<br>with a spark.</h3><p>One clear idea. A whole world of possibility.</p><a class="text-link" href="#contact">Let’s find yours ↗</a></div><div class="orb-stage"><canvas id="orb" aria-hidden="true"></canvas><div class="orb-fallback" aria-hidden="true"></div><span class="orb-caption mono">IDEA → IDENTITY → EXPERIENCE</span></div></div></article>');
html=html.replace('<div class="comparison"','<div class="comparison glow-surface"');
html=html.replace('<div class="work-heading"><h2>Made to<br>make a difference<span class="accent">.</span></h2>','<div class="work-heading"><h2>Not just seen.<br><span class="muted">Remembered.</span></h2>');
html=html.replace('SELECTED PROJECTS<br>01 — 04','SELECTED WORK<br><span id="work-count">01</span> / 04');
html=html.replace('<section class="testimonials section">','<section class="testimonials section"><div class="testimonial-heading"><span class="mono">WORDS THAT MEAN EVERYTHING</span><h2>Good work.<br>Great relationships.</h2></div>');
html=html.replace('<p class="contact-ready">READY TO</p>','<p class="contact-ready">YOUR NEXT CHAPTER STARTS HERE.</p>');
fs.writeFileSync(file,html);
