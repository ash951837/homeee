/* V13 — sade mobil/PC uyum yardımcıları */
(function(){
  'use strict';
  const d = document;
  const w = window;
  const ready = fn => d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  const $ = (s,r=d) => r.querySelector(s);
  const $$ = (s,r=d) => Array.from(r.querySelectorAll(s));
  const isGame = /oyun\.html/i.test(location.pathname) || !!$('#avatarSvg');

  function setViewportVars(){
    const vv = w.visualViewport;
    const h = vv ? vv.height : w.innerHeight;
    d.documentElement.style.setProperty('--v13-vh', (h * 0.01).toFixed(2) + 'px');
  }

  function setPageClasses(){
    d.body.classList.add('site-v13-clean');
    d.body.classList.toggle('game-v13-clean', isGame);
    d.body.classList.toggle('index-v13-clean', !isGame);
    d.documentElement.classList.add('v13-normal-scroll');
  }

  function removeClutter(){
    $$('.premium-quick-card,[data-v7-ad-panel],.ad-panel,.ads-panel,.reklam-panel').forEach(el => el.remove());
    $$('iframe,ins,amp-ad').forEach(el => {
      const txt = [el.id, el.className, el.getAttribute('title'), el.getAttribute('aria-label'), el.src].join(' ').toLocaleLowerCase('tr-TR');
      if (/ads|advert|reklam|sponsor/.test(txt)) el.remove();
    });
  }

  function optimizeMedia(){
    $$('img').forEach((img, i) => {
      img.decoding = 'async';
      img.loading = i < 2 ? 'eager' : 'lazy';
      if (i < 2) img.setAttribute('fetchpriority','high');
      if (!img.alt) img.alt = isGame ? 'Avatar oyun görseli' : 'Sümeyye için anı görseli';
    });
  }

  function normalizeScroll(){
    d.documentElement.style.overflowY = 'auto';
    d.body.style.overflowY = 'auto';
    d.body.style.overflowX = 'hidden';
  }

  function compactGameToolbar(){
    if (!isGame) return;
    const toolbar = $('.toolbar');
    if (!toolbar || toolbar.dataset.v13Ready) return;
    toolbar.dataset.v13Ready = '1';
    const labels = {
      undoBtn:'↶', redoBtn:'↷', randomBtn:'🎲', challengeBtn:'🏆', galleryBtn:'▦', achievementBtn:'★', soundBtn:'🔊', resetBtn:'↺', downloadBtn:'Kaydet'
    };
    Object.entries(labels).forEach(([id,label]) => {
      const el = d.getElementById(id);
      if (!el) return;
      el.dataset.fullLabel = el.textContent.trim();
      el.textContent = label;
    });
  }

  function compactIndexDock(){
    if (isGame) return;
    const dock = $('.neo-mobile-dock');
    if (!dock || dock.dataset.v13Ready) return;
    dock.dataset.v13Ready = '1';
  }

  function handleKeyboard(){
    const mark = () => {
      const ae = d.activeElement;
      const editing = ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName);
      d.body.classList.toggle('keyboard-open', !!editing && w.innerWidth <= 900);
    };
    d.addEventListener('focusin', mark, {passive:true});
    d.addEventListener('focusout', () => setTimeout(mark, 80), {passive:true});
  }

  function watchDom(){
    if (!('MutationObserver' in w)) return;
    const mo = new MutationObserver(() => {
      removeClutter();
      compactIndexDock();
    });
    mo.observe(d.body, {childList:true, subtree:true});
  }

  ready(() => {
    setPageClasses();
    setViewportVars();
    normalizeScroll();
    removeClutter();
    optimizeMedia();
    compactGameToolbar();
    compactIndexDock();
    handleKeyboard();
    watchDom();
    setTimeout(removeClutter, 500);
    setTimeout(normalizeScroll, 650);
  });

  w.addEventListener('resize', () => requestAnimationFrame(setViewportVars), {passive:true});
  w.addEventListener('orientationchange', () => setTimeout(setViewportVars, 260), {passive:true});
})();
