(() => {
  const surface = document.querySelector('.redesign .comparison');
  const range = surface.querySelector('input');
  const presets = [...document.querySelectorAll('[data-split]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  // Sub-percent steps avoid visible jumps on wide comparison images.
  range.step = '0.1';
  let frame;
  const sync = () => {
    surface.style.setProperty('--split', range.value + '%');
    presets.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.split) === Number(range.value))));
    range.setAttribute('aria-valuetext', `${Math.round(100 - Number(range.value))}% amplified design revealed`);
  };
  range.addEventListener('input', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(sync); });
  presets.forEach(button => button.addEventListener('click', () => {
    cancelAnimationFrame(frame);
    const from = Number(range.value), to = Number(button.dataset.split), start = performance.now();
    const animate = now => {
      const progress = reduced.matches ? 1 : Math.min(1, (now - start) / 250);
      range.value = (from + (to - from) * (1 - Math.pow(1 - progress, 3))).toFixed(1);
      sync();
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
  }));
  surface.addEventListener('pointermove', event => {
    if (reduced.matches || !fine.matches) return;
    const box = surface.getBoundingClientRect();
    surface.style.setProperty('--scene-x', `${(event.clientX - box.left - box.width / 2) * .012}px`);
    surface.style.setProperty('--scene-y', `${(event.clientY - box.top - box.height / 2) * .018}px`);
  }, { passive: true });
  surface.addEventListener('pointerleave', () => { surface.style.setProperty('--scene-x', '0px'); surface.style.setProperty('--scene-y', '0px'); });
  sync();
})();
