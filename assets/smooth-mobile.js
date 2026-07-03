/* Mobile Ultra Performance — ana oyun odaklı */
(function(){
  'use strict';
  const d = document;
  const w = window;
  const storage = {
    get(k){try{return localStorage.getItem(k)}catch(e){return null}},
    set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  };
  const ready = fn => d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  const prefersReduced = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = w.matchMedia && w.matchMedia('(pointer: coarse)').matches;
  const lowDevice = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const smallScreen = Math.min(w.innerWidth || 9999, w.screen && w.screen.width || 9999) <= 820;
  const shouldLite = storage.get('sumeyye_perf_mode') === 'lite' || (!storage.get('sumeyye_perf_mode') && (prefersReduced || coarse || lowDevice || smallScreen));

  function setVh(){ d.documentElement.style.setProperty('--vh', (w.innerHeight * 0.01).toFixed(2) + 'px'); }
  let resizeRaf = 0;
  w.addEventListener('resize', () => { cancelAnimationFrame(resizeRaf); resizeRaf = requestAnimationFrame(setVh); }, {passive:true});
  w.addEventListener('orientationchange', () => setTimeout(setVh, 250), {passive:true});
  setVh();

  function applyPerf(on){
    d.body.classList.toggle('perf-lite', !!on);
    d.body.classList.toggle('reduce-motion', !!on || prefersReduced);
    storage.set('sumeyye_perf_mode', on ? 'lite' : 'full');
    const pill = d.querySelector('.perf-pill');
    if (pill) pill.textContent = on ? '⚡ Akıcı Mod' : '✨ Tam Efekt';
  }

  ready(() => {
    d.body.classList.toggle('touch-device', coarse);
    d.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading')) img.loading = 'lazy';
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
      if ('decode' in img && img.complete === false) img.decode().catch(()=>{});
    });
    applyPerf(shouldLite);
    if (!d.querySelector('.perf-pill')) {
      const pill = d.createElement('button');
      pill.type = 'button';
      pill.className = 'perf-pill';
      pill.setAttribute('aria-label', 'Performans modunu değiştir');
      pill.addEventListener('click', () => applyPerf(!d.body.classList.contains('perf-lite')));
      d.body.appendChild(pill);
      applyPerf(d.body.classList.contains('perf-lite'));
    }
    d.addEventListener('visibilitychange', () => d.body.classList.toggle('perf-paused', d.hidden));
    if ('IntersectionObserver' in w) {
      const io = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('is-visible', e.isIntersecting)), {rootMargin:'180px 0px'});
      d.querySelectorAll('section,.panel,.stage-card,.u5-card').forEach(el => io.observe(el));
    }
    // Mini oyunlar kaldırıldı: ana oyun kostüm/stüdyo deneyimine odaklanır.
  });

  function toast(msg){
    const t = d.getElementById('toast') || d.getElementById('greetingToast');
    if (t) { t.textContent = msg; t.classList.add('show','visible','open'); setTimeout(()=>t.classList.remove('show','visible','open'), 1800); }
  }
  function vibrate(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms); }catch(e){} }
})();
