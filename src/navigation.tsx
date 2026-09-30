import { createRoot } from 'react-dom/client';
import { Home, Layers, PanelsTopLeft, Route, UserRound, ArrowUpRight } from 'lucide-react';
import { CircleMenu } from './components/ui/circle-menu';

const home = document.body.classList.contains('legal-page') ? '/' : '';
const mount = document.createElement('div');
mount.className = 'circle-menu-mount';
document.querySelector('header')?.append(mount);
createRoot(mount).render(<CircleMenu items={[
  { label: 'Home', href: home + '#top', icon: <Home/> },
  { label: 'Services', href: home + '#services', icon: <Layers/> },
  { label: 'Work', href: home + '#work', icon: <PanelsTopLeft/> },
  { label: 'Contact', href: home + '#contact', icon: <ArrowUpRight/> },
  { label: 'About', href: home + '#about', icon: <UserRound/> },
  { label: 'Process', href: home + '#process', icon: <Route/> },
]}/>);
