/* Mobile compatibility layer — toggle removed */
(function(){
  'use strict';
  const d = document;
  const w = window;
  const ready = fn => d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  const coarse = w.matchMedia && w.matchMedia('(pointer: coarse)').matches;

  function setVh(){
    d.documentElement.style.setProperty('--vh', (w.innerHeight * 0.01).toFixed(2) + 'px');
  }
  let resizeRaf = 0;
  w.addEventListener('resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(setVh);
  }, {passive:true});
  w.addEventListener('orientationchange', () => setTimeout(setVh, 250), {passive:true});
  setVh();

  ready(() => {
    d.body.classList.toggle('touch-device', coarse);
    d.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading')) img.loading = 'lazy';
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
      if ('decode' in img && img.complete === false) img.decode().catch(()=>{});
    });

    if ('IntersectionObserver' in w) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.toggle('is-visible', e.isIntersecting));
      }, {rootMargin:'180px 0px'});
      d.querySelectorAll('section,.panel,.stage-card,.u5-card').forEach(el => io.observe(el));
    }
  });
})();
