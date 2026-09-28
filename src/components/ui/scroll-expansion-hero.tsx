import { useEffect, useRef, useState } from 'react';

// Supplied ScrollExpandMedia adapted to native page scrolling.
export default function ScrollExpandMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const player = video.current!;
    let frameCallback: number | undefined;
    let firstPaint = 0, secondPaint = 0;
    const reveal = () => {
      if (frameCallback !== undefined) return;
      if (typeof player.requestVideoFrameCallback === 'function') {
        frameCallback = player.requestVideoFrameCallback(() => setReady(true));
      } else {
        firstPaint = requestAnimationFrame(() => {
          secondPaint = requestAnimationFrame(() => {
            if (player.readyState >= 2) setReady(true);
          });
        });
      }
    };
    player.addEventListener('playing', reveal);
    if (!player.paused && player.readyState >= 2) reveal();
    return () => {
      player.removeEventListener('playing', reveal);
      if (frameCallback !== undefined) player.cancelVideoFrameCallback(frameCallback);
      cancelAnimationFrame(firstPaint); cancelAnimationFrame(secondPaint);
    };
  }, []);
  useEffect(() => {
    const track = document.querySelector<HTMLElement>('.expansion-hero')!;
    const stage = track.querySelector<HTMLElement>('.expansion-stage')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true, frame = 0;
    const syncPlayback = () => {
      if (!video.current) return;
      if (document.hidden || !visible || reduced.matches) video.current.pause();
      else video.current.play().catch(() => { /* Poster remains if autoplay is blocked. */ });
    };
    const render = () => {
      frame = 0;
      const progress = reduced.matches ? 0 : Math.max(0, Math.min(1, -track.getBoundingClientRect().top / Math.max(1, track.offsetHeight - stage.offsetHeight)));
      stage.style.setProperty('--expand', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncPlayback(); });
    observer.observe(track);
    const resize = new ResizeObserver(schedule); resize.observe(stage);
    window.addEventListener('scroll', schedule, { passive: true });
    document.addEventListener('visibilitychange', syncPlayback);
    const change = () => { schedule(); syncPlayback(); };
    reduced.addEventListener('change', change);
    render(); syncPlayback();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); window.removeEventListener('scroll', schedule); document.removeEventListener('visibilitychange', syncPlayback); reduced.removeEventListener('change', change); };
  }, []);
  return <video ref={video} className={`expansion-video${ready ? ' is-ready' : ''}`} autoPlay muted loop playsInline preload="auto" poster="assets/hero-first-frame.webp" aria-hidden="true" disablePictureInPicture onError={() => setReady(false)}>

    <source src="assets/hero-hq-loop.mp4" type="video/mp4"/>
  </video>;
}


