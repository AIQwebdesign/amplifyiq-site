import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare const __HERO_VIDEO_VERSION__: string;

gsap.registerPlugin(ScrollTrigger);

/** A paused video and editorial story share one smoothly scrubbed playhead. */
export default function ScrollExpandMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    const player = video.current!;
    const hero = player.closest<HTMLElement>('.expansion-hero')!;
    const stage = hero.querySelector<HTMLElement>('.expansion-stage')!;
    const beats = [...hero.querySelectorAll<HTMLElement>('.story-beat')];
    const words = [...hero.querySelectorAll<HTMLElement>('.story-word')];
    const cta = hero.querySelector<HTMLAnchorElement>('.story-final a')!;
    const playhead = { progress: 0 };
    let reduced = false, disposed = false, frame = 0, activeBeat = -1;
    let metadataReady = false, duration = 0, lastTick = 0, revealed = false;
    let interpolatedTime = 0;
    const download = new AbortController();
    let objectUrl: string | undefined;
    const scheduleSeek = () => {
      if (!frame && !disposed && !reduced && !document.hidden) frame = requestAnimationFrame(tick);
    };
    // Decode at most one seek at a time. GSAP smooths the scroll playhead and
    // this time-based interpolation smooths the actual video seek requests.
    const tick = (now: number) => {
      frame = 0;
      if (disposed || reduced || document.hidden || !metadataReady || player.seeking || player.readyState < 2) return;
      const target = Math.max(0, Math.min(1, playhead.progress)) * duration;
      const dt = Math.min(64, lastTick ? now - lastTick : 16.67);
      lastTick = now;
      // A light decoder filter complements the scrub without a second long lag.
      interpolatedTime += (target - interpolatedTime) * (1 - Math.exp(-dt / 45));
      if (Math.abs(target - interpolatedTime) < 1 / 120) interpolatedTime = target;
      if (Math.abs(player.currentTime - interpolatedTime) > 1 / 120) {
        player.currentTime = interpolatedTime;
        // seeked resumes the loop; no recursive seek inside that event.
      } else if (Math.abs(target - interpolatedTime) > 1 / 120) scheduleSeek();
      else lastTick = 0; // Resume gently after a pause instead of using a stale delta.
    };
    const decoded = () => {
      player.dataset.seekableRanges = String(player.seekable.length);
      // Reveal this decoded frame BEFORE scheduling another seek. Waiting for
      // an animation frame after starting a seek can see HAVE_METADATA again
      // and leave the static poster covering a correctly moving video.
      if (!disposed && !reduced && player.readyState >= 2 && !revealed) {
        revealed = true;
        setReady(true);
      }
      scheduleSeek();
    };
    const metadata = () => {
      duration = player.duration;
      metadataReady = Number.isFinite(duration) && duration > 0;
      interpolatedTime = player.currentTime;
      lastTick = 0;
      scheduleSeek();
    };
    const update = () => {
      const p = playhead.progress;
      stage.style.setProperty('--story-progress', String(p));
      const next = reduced ? 4 : p < .18 ? 0 : p < .38 ? 1 : p < .68 ? 2 : p < .86 ? 3 : 4;
      if (next !== activeBeat) {
        activeBeat = next;
        beats.forEach((beat, index) => beat.setAttribute('aria-hidden', String(index !== next)));
        cta.tabIndex = next === 4 ? 0 : -1;
      }
      scheduleSeek();
    };
    player.pause();
    player.addEventListener('loadedmetadata', metadata);
    player.addEventListener('loadeddata', decoded);
    player.addEventListener('canplay', decoded);
    player.addEventListener('seeked', decoded);
    document.addEventListener('visibilitychange', scheduleSeek);
    if (player.readyState >= 1) metadata();
    if (player.readyState >= 2) decoded();
    // A complete local Blob gives the decoder a seekable source even when a
    // production proxy/CDN does not expose usable HTTP byte-range responses.
    // The existing first-frame poster stays visible throughout the download.
    const videoUrl = `assets/hero/amplify-scroll.mp4?v=${__HERO_VIDEO_VERSION__}`;
    fetch(videoUrl, { signal: download.signal, credentials: 'same-origin' })
      .then(response => {
        if (!response.ok) throw new Error(`Hero video HTTP ${response.status}`);
        return response.blob();
      })
      .then(blob => {
        if (disposed) return;
        objectUrl = URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }));
        player.src = objectUrl;
        player.load();
      })
      .catch(error => {
        if (disposed || error.name === 'AbortError') return;
        // Retain a direct-source fallback if downloading a Blob is disallowed.
        player.src = videoUrl;
        player.load();
      });
    const media = gsap.matchMedia();
    media.add({ mobile: '(max-width: 767px)', reduce: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 768px)' }, context => {
      reduced = !!context.conditions?.reduce;
      const mobile = !!context.conditions?.mobile;
      activeBeat = -1;
      gsap.set(beats, { autoAlpha: 0, y: 0, scale: 1 });
      gsap.set(words, { autoAlpha: 0, y: mobile ? 10 : 24, scale: mobile ? 1 : .96 });
      if (reduced) {
        revealed = false; setReady(false); player.pause();
        cancelAnimationFrame(frame); frame = 0;
        gsap.set(beats[4], { autoAlpha: 1 });
        playhead.progress = 1; update();
        return;
      }
      playhead.progress = 0;
      gsap.set(beats[0], { autoAlpha: 1 });
      gsap.set(beats[2], { autoAlpha: 1 });
      const shift = mobile ? 10 : 20;
      const timeline = gsap.timeline({
        defaults: { ease: 'none' }, onUpdate: update,
        scrollTrigger: {
          trigger: hero, start: 'top top',
          end: () => `+=${hero.offsetHeight - stage.offsetHeight}`,
          pin: stage, pinSpacing: false, anticipatePin: 1,
          scrub: mobile ? .16 : .24, invalidateOnRefresh: true,
        },
      });
      // Reach the opening frames nearly twice as quickly, then progressively
      // linger on the unfolding layers and finish. Map captions through the
      // inverse curve so they remain attached to the same moments in the film.
      const at = (progress: number) => 1 - Math.sqrt(1 - progress);
      const span = (start: number, length: number) => at(start + length) - at(start);
      // Preserve the accepted opening/middle exactly; compress only the tail
      // after the closing caption has fully appeared (91% of the film).
      timeline.to(playhead, { progress: .91, duration: .7,
        ease: (p: number) => (1 - (1 - p * .7) ** 2) / .91 }, 0);
      timeline.to(playhead, { progress: 1, duration: .1, ease: 'power1.out' }, .7);
      timeline.to(beats[0], { autoAlpha: 0, y: -shift, duration: span(.12, .06) }, at(.12));
      timeline.fromTo(beats[1], { y: shift, scale: mobile ? 1 : .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: span(.18, .045) }, at(.18));
      timeline.to(beats[1], { autoAlpha: 0, y: -shift, duration: span(.34, .04) }, at(.34));
      words.forEach((word, index) => {
        // Give Design, Intelligence and Growth their own readable moments.
        const enter = .38 + index * .075;
        const leave = .635 + index * .005;
        timeline.to(word, { autoAlpha: 1, y: 0, scale: 1, duration: span(enter, .035) }, at(enter));
        timeline.to(word, { autoAlpha: 0, y: -shift / 2, scale: mobile ? 1 : 1.02, duration: span(leave, .035) }, at(leave));
      });
      timeline.fromTo(beats[3], { y: shift }, { autoAlpha: 1, y: 0, duration: span(.68, .045) }, at(.68));
      timeline.to(beats[3], { autoAlpha: 0, y: -shift, duration: span(.825, .035) }, at(.825));
      timeline.fromTo(beats[4], { y: shift, scale: mobile ? 1 : .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: span(.86, .05) }, at(.86));
      update();
      if (player.readyState >= 2) decoded();
      return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
    });
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => {
      disposed = true; media.revert(); cancelAnimationFrame(frame);
      download.abort();
      player.removeEventListener('loadedmetadata', metadata);
      player.removeEventListener('loadeddata', decoded);
      player.removeEventListener('canplay', decoded);
      player.removeEventListener('seeked', decoded);
      document.removeEventListener('visibilitychange', scheduleSeek);
      player.pause(); stage.style.removeProperty('--story-progress');
      player.removeAttribute('src'); player.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      beats.forEach(beat => beat.removeAttribute('aria-hidden')); cta.removeAttribute('tabindex');
    };
  }, []);
  return <video ref={video} data-video-source={`assets/hero/amplify-scroll.mp4?v=${__HERO_VIDEO_VERSION__}`} className={`expansion-video${ready ? ' is-ready' : ''}`} muted playsInline preload="auto" poster="assets/hero/amplify-first.webp" aria-hidden="true" disablePictureInPicture onError={() => setReady(false)}>
  </video>;
}
