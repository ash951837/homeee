// Hikayemiz PWA helper — ana açılış kesin olarak index.html
(function(){
  const APP_NAME = 'Hikayemiz';
  const SHORT_NAME = 'Bizim hikayemiz';
  const VERSION = '2026-07-04-index-kesin-v3';

  function setMeta(name, content){
    let m = document.querySelector('meta[name="'+name+'"]');
    if(!m){ m = document.createElement('meta'); m.name = name; document.head.appendChild(m); }
    m.content = content;
  }

  document.title = APP_NAME;
  setMeta('application-name', SHORT_NAME);
  setMeta('apple-mobile-web-app-title', SHORT_NAME);
  try{ localStorage.setItem('hikayemiz_pwa_version', VERSION); }catch(e){}

  // Eski cache'leri temizle; böylece eski oyun.html açılışı kalmasın.
  if('caches' in window){
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).catch(function(){});
  }

  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('./sw.js?v='+VERSION).then(function(reg){
        if(reg.update) reg.update();
      }).catch(function(){});
    });
  }
})();
