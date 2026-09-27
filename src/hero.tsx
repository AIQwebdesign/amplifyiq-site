import { createRoot } from 'react-dom/client';
import ScrollExpandMedia from './components/ui/scroll-expansion-hero';
const host = document.getElementById('expansion-media');
if (host) createRoot(host).render(<ScrollExpandMedia/>);
