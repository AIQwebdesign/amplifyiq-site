import { createRoot } from 'react-dom/client';
import { Marquee } from './components/ui/marquee';

const strip = document.querySelector<HTMLElement>('.client-strip');
if (strip) {
  // Keep the authored client names and destinations as the single source of truth.
  const clients = [...strip.querySelectorAll<HTMLAnchorElement>('.client-logo-group:first-child > a')]
    .map(link => ({ href: link.href, className: link.className, html: link.innerHTML }));
  if (clients.length) createRoot(strip).render(
    <Marquee duration={32} pauseOnHover fadeAmount={7} className="clients-marquee">
      <div className="client-logo-group">{clients.map(client =>
        <a key={client.href} href={client.href} className={client.className} target="_blank" rel="noopener"
          dangerouslySetInnerHTML={{ __html: client.html }} />
      )}</div>
    </Marquee>
  );
}
