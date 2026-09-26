import { createRoot } from 'react-dom/client';
import { Home, Layers, PanelsTopLeft, Route, UserRound, ArrowUpRight } from 'lucide-react';
import { CircleMenu } from './components/ui/circle-menu';

const mount = document.createElement('div');
mount.className = 'circle-menu-mount';
document.querySelector('header')?.append(mount);
createRoot(mount).render(<CircleMenu items={[
  { label: 'Home', href: '#top', icon: <Home/> },
  { label: 'Services', href: '#services', icon: <Layers/> },
  { label: 'Work', href: '#work', icon: <PanelsTopLeft/> },
  { label: 'Contact', href: '#contact', icon: <ArrowUpRight/> },
  { label: 'About', href: '#about', icon: <UserRound/> },
  { label: 'Process', href: '#process', icon: <Route/> },
]}/>);
