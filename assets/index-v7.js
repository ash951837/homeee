/* ===== INDEX V12 — panel yok, normal scroll, efekt modu yok ===== */
(function(){
  'use strict';
  const d = document;
  const w = window;
  const hiddenMini = new Set(['puzzleSection','memorySection','heartCatchSection','butterflySection','coinFlipSection']);
  const ready = fn => d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  const $ = (s,r=d) => r.querySelector(s);
  const $$ = (s,r=d) => Array.from(r.querySelectorAll(s));

  function cleanVisibleAdPanels(){
    $$('.premium-quick-card,[data-v7-ad-panel],.ad-panel,.ads-panel,.reklam-panel').forEach(el => el.remove());
    $$('.blog-stat').forEach(stat => {
      const txt = (stat.textContent || '').toLocaleLowerCase('tr-TR');
      if (txt.includes('reklam') || txt.includes('sponsor')) stat.remove();
    });
    $$('iframe,ins').forEach(el => {
      const txt = [el.id, el.className, el.getAttribute('title'), el.getAttribute('aria-label'), el.src].join(' ').toLocaleLowerCase('tr-TR');
      if (txt.includes('ads') || txt.includes('advert') || txt.includes('reklam') || txt.includes('sponsor')) el.remove();
    });
  }


  function patchSimpleTexts(){
    const hero = $('.blog-hero-text');
    if (hero) hero.textContent = 'Aşağıdaki kartlara dokunarak en romantik, en özel ve en kullanışlı bölümlere hızlıca geçebilirsin. Telefon ekranında sade kart akışı gibi çalışır.';
    const desc = $('#pageBlogSection .section-desc');
    if (desc) desc.textContent = 'Mobilde ve PC’de sade, hızlı ve rahat gezilsin diye sitenin en güzel bölümlerini kart düzeninde topladım.';
  }

  function installNativeScroll(){
    document.documentElement.classList.add('index-v8-native-scroll');
  }

  function installObserver(){
    const mo = new MutationObserver(() => { cleanVisibleAdPanels(); });
    mo.observe(d.body, {childList:true, subtree:true, attributes:true, attributeFilter:['class']});
  }

  ready(() => {
    d.body.classList.add('index-v7-clean','index-v8-native-scroll');
    cleanVisibleAdPanels();
    patchSimpleTexts();
    installNativeScroll();
    installObserver();
    w.setTimeout(cleanVisibleAdPanels, 400);
  });
})();
