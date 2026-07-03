/* Sumeyye Premium V2 — UX/performance helpers */
(function(){
  'use strict';
  const d=document,w=window;
  const $=(s,r=d)=>r.querySelector(s);
  const $$=(s,r=d)=>Array.from(r.querySelectorAll(s));
  const ready=fn=>d.readyState==='loading'?d.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
  const raf=(fn)=>w.requestAnimationFrame?w.requestAnimationFrame(fn):setTimeout(fn,16);
  let toastTimer=0;
  function showToast(msg){
    let t=$('.premium-toast');
    if(!t){t=d.createElement('div');t.className='premium-toast';t.setAttribute('role','status');t.setAttribute('aria-live','polite');d.body.appendChild(t);}
    t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),1900);
  }
  function ensureProgress(){
    if($('.site-progress')) return;
    const p=d.createElement('div');p.className='site-progress';p.innerHTML='<i></i>';d.body.prepend(p);
    const bar=p.firstElementChild;
    let ticking=false;
    function update(){
      ticking=false;
      const max=Math.max(1,d.documentElement.scrollHeight-w.innerHeight);
      const val=Math.min(100,Math.max(0,(w.scrollY/max)*100));
      bar.style.width=val+'%';
    }
    ['scroll','resize'].forEach(evt=>w.addEventListener(evt,()=>{if(!ticking){ticking=true;raf(update)}},{passive:true}));
    update();
  }
  function enhanceImages(){
    const imgs=$$('img');
    imgs.forEach((img,i)=>{
      img.loading= i<2?'eager':'lazy'; img.decoding='async';
      if(i<2) img.setAttribute('fetchpriority','high');
      if(!img.hasAttribute('alt')) img.alt='Sümeyye için özel anı görseli';
    });
    const idle=w.requestIdleCallback || (cb=>setTimeout(cb,350));
    idle(()=>imgs.slice(0,8).forEach(img=>{try{img.decode&&img.decode().catch(()=>{})}catch(e){}}));
  }
  function makeIndexDock(){
    if($('.neo-mobile-dock')) return;
    const isGame=location.pathname.toLowerCase().includes('oyun');
    const dock=d.createElement('nav');dock.className='neo-mobile-dock';dock.setAttribute('aria-label','Hızlı mobil menü');
    if(isGame){
      dock.innerHTML='<a href="./index.html"><b>⌂</b><span>Ana</span></a><button type="button" data-neo="random"><b>🎲</b><span>Rastgele</span></button><button type="button" data-neo="world" class="hot"><b>🏰</b><span>Akademi</span></button><button type="button" data-neo="save"><b>↗</b><span>Kaydet</span></button>';
    }else{
      dock.innerHTML='<button type="button" data-neo="home"><b>✦</b><span>Baş</span></button><button type="button" data-neo="menu"><b>☰</b><span>Menü</span></button><a class="hot" href="./oyun.html"><b>🎮</b><span>Oyun</span></a><button type="button" data-neo="perf"><b>⚡</b><span>Akıcı</span></button>';
    }
    dock.addEventListener('click',e=>{
      const btn=e.target.closest('[data-neo]'); if(!btn) return;
      const a=btn.dataset.neo;
      if(a==='home'){ e.preventDefault(); if(w.showSection) w.showSection(0); w.scrollTo({top:0,behavior:'smooth'}); showToast('Başa dönüldü.'); }
      if(a==='menu'){ e.preventDefault(); $('#sideMenuToggle')?.click(); }
      if(a==='perf'){ e.preventDefault(); $('.perf-pill')?.click(); showToast(d.body.classList.contains('perf-lite')?'Akıcı mod açık.':'Tam efekt modu açık.'); }
      if(a==='random'){ e.preventDefault(); $('#randomBtn')?.click(); showToast('Yeni karakter enerjisi hazır.'); }
      if(a==='world'){ e.preventDefault(); ($('#worldBtn') || $('#challengeBtn'))?.click(); showToast('Ana oyun açılıyor.'); }
      if(a==='save'){ e.preventDefault(); $('#downloadBtn')?.click(); }
    });
    d.body.appendChild(dock);
  }
  function makeQuickCard(){
    if(location.pathname.toLowerCase().includes('oyun')) return;
    if($('.premium-quick-card')) return;
    const card=d.createElement('aside');card.className='premium-quick-card';
    card.innerHTML='<strong>✨ Premium sürüm</strong><span>Mobilde hafif animasyon, hızlı görseller ve tek dokunuşla oyun geçişi hazır.</span>';
    d.body.appendChild(card);
    setTimeout(()=>card.remove(),9000);
  }
  function enhanceFab(){
    const fab=$('.game-page-fab');
    if(fab && !fab.querySelector('small')){
      const txt=fab.querySelector('.game-page-fab-text');
      if(txt) txt.innerHTML='OYUNA GİR<small>Kostüm oyunu</small>';
    }
  }
  function installSkip(){
    if($('.premium-skip')) return;
    const s=d.createElement('a');s.className='premium-skip';s.href='#main';s.textContent='İçeriğe geç';d.body.prepend(s);
  }
  function reduceScrollJank(){
    let startY=0;
    d.addEventListener('touchstart',e=>{startY=e.touches&&e.touches[0]?e.touches[0].clientY:0},{passive:true});
    d.addEventListener('touchmove',e=>{
      const modals=$$('.modal-backdrop.show,.modal-backdrop.open,.u5-overlay.open');
      if(modals.length) return;
      const y=e.touches&&e.touches[0]?e.touches[0].clientY:0;
      if(Math.abs(y-startY)>8) d.body.classList.add('is-scrolling');
    },{passive:true});
    d.addEventListener('touchend',()=>setTimeout(()=>d.body.classList.remove('is-scrolling'),120),{passive:true});
  }
  ready(()=>{
    d.body.classList.add('neo-v2');
    ensureProgress(); enhanceImages(); makeIndexDock(); makeQuickCard(); enhanceFab(); installSkip(); reduceScrollJank();
    w.SumeyyePremiumToast=showToast;
  });
})();
