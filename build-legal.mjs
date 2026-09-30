import { readFile, writeFile, mkdir } from 'node:fs/promises';
const source = await readFile('src/legal/legal-pack.md', 'utf8');
const home = await readFile('dist/index.html', 'utf8');
const consentCode = await readFile('dist/consent.js', 'utf8');
const inventory = consentCode.match(/const inventory = `([\s\S]*?)`;/)?.[1];
if (!inventory) throw Error('Cookie inventory missing');
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline = value => escape(value).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
const legalLinks = '<nav class="footer-legal" aria-label="Legal and privacy"><a href="/privacy-policy">Privacy Policy</a><a href="/cookie-policy">Cookie Policy</a><a href="/terms-of-service">Terms of Service</a><button type="button" data-cookie-settings>Cookie Settings</button></nav>';
const pages = [
  ['privacy-policy','Privacy Policy','Learn how AmplifyIQ collects, uses and protects personal information when you use our website or services.', '# PAGE 1', '# PAGE 2'],
  ['cookie-policy','Cookie Policy','Learn how AmplifyIQ uses cookies and similar technologies and how you can control your privacy preferences.', '# PAGE 2', '# COOKIE SETTINGS PANEL'],
  ['terms-of-service','Terms of Service','Read the terms governing website design, digital growth and related services provided by AmplifyIQ.', '# PAGE 3', '# CODEX IMPLEMENTATION INSTRUCTIONS'],
];
for (const [slug,title,description,start,end] of pages) {
  let text = source.slice(source.indexOf(start),source.indexOf(end));
  // Preserve the supplied source privately; never ship incomplete identity fields.
  text = text.split(/\r?\n/).filter(line => !/\[(?:LEGAL|FULL BUSINESS|CRO|VAT)/.test(line)).join('\n');
  text = text.replace('AmplifyIQ is the trading name of:', 'Contact AmplifyIQ:').replace('AmplifyIQ is a trading name operated by:', 'AmplifyIQ contact details:');
  const toc = []; let html = '', paragraph = [], list = false;
  const flush = () => { if (paragraph.length) { html += `<p>${inline(paragraph.join(' '))}</p>`; paragraph = []; } if (list) { html += '</ul>'; list=false; } };
  for (const line of text.split('\n')) {
    if (/^#{1,2} |^---/.test(line)) continue;
    const heading = /^(#{3,4}) (.*)/.exec(line);
    if (heading) { flush(); const level=heading[1].length-1; const id='section-'+heading[2].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''); html += `<h${level} id="${id}">${inline(heading[2])}</h${level}>`; if(level===2)toc.push(`<a href="/${slug}#${id}">${escape(heading[2])}</a>`); continue; }
    if (!line.trim()) { flush(); continue; }
    if (line.startsWith('- ')) { if(paragraph.length)flush(); if(!list){html+='<ul>';list=true;} html+=`<li>${inline(line.slice(2))}</li>`; continue; }
    if (list) flush(); paragraph.push(line.trim());
  }
  flush();
  html = html.replaceAll('<strong>Cookie Policy</strong>','<a href="/cookie-policy">Cookie Policy</a>').replaceAll('<strong>Cookie Settings</strong>','<button class="legal-inline-settings" data-cookie-settings>Cookie Settings</button>');
  if(slug==='cookie-policy') html = `<section class="cookie-inventory"><h2>Current website implementation</h2><p>Audited 30 September 2026. The current website uses the consent preference record below and an optional Google Maps embed. No analytics, advertising, conversion trackers, social-media embeds or third-party video players are installed. Categories described below explain possible uses; they do not mean a tool is currently deployed.</p><div data-cookie-inventory></div><p>Google Maps stays blocked until Functional consent is given and is removed when consent is withdrawn. We cannot delete cookies owned by Google from this website; you can remove these using your browser controls.</p></section>` + html;
  html = html.replace('<div data-cookie-inventory></div>', inventory);
  const header = home.match(/<header[\s\S]*?<\/header>/)[0].replaceAll('href="#','href="/#').replaceAll('src="assets/','src="/assets/');
  const footer = home.match(/<div class="footer-curtain">[\s\S]*?<\/footer><\/div>/)[0].replaceAll('href="#','href="/#');
  const styles = ['styles','refinements','responsive','navigation','final-polish','layout-fixes','fonts','legal'].map(name=>`<link rel="stylesheet" href="/${name}.css">`).join('');
  const document = `<!doctype html><html lang="en-IE"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#07131f"><title>${title} | AmplifyIQ</title><meta name="description" content="${description}"><link rel="canonical" href="https://amplifyiq.ie/${slug}"><link rel="icon" href="/assets/favicon.ico">${styles}<script type="module" src="/interactive/navigation.js"></script><script type="module" src="/interactive/buttons.js"></script><script type="module" src="/consent.js"></script></head><body class="legal-page"><a class="skip" href="/${slug}#main">Skip to content</a>${header}<main id="main" class="legal-main"><div class="legal-intro"><span class="mono">AMPLIFYIQ / LEGAL &amp; PRIVACY</span><h1>${title}</h1><p>Last updated: 30 September 2026 · County Mayo, Ireland</p></div><div class="legal-layout"><details class="legal-toc" open><summary>On this page</summary><nav aria-label="Policy contents">${toc.join('')}</nav></details><article class="legal-article">${html}</article></div></main>${footer}</body></html>`;
  if (/\[(?:LEGAL|FULL BUSINESS|CRO|VAT)/.test(document)) throw Error('Unresolved legal placeholders');
  await mkdir(`dist/${slug}`, {recursive:true}); await writeFile(`dist/${slug}/index.html`, document);
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://amplifyiq.ie/</loc></url>${pages.map(([slug])=>`<url><loc>https://amplifyiq.ie/${slug}</loc></url>`).join('')}</urlset>`);
