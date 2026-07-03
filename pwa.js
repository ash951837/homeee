// Hikayemiz PWA helper — iPhone friendly metadata + update check
(function(){
  const APP_NAME = 'Hikayemiz';
  const SHORT_NAME = 'Bizim hikayemiz';
  const VERSION = '2026-07-04-iphone-final';
  function setMeta(name, content){
    let m = document.querySelector('meta[name="'+name+'"]');
    if(!m){ m = document.createElement('meta'); m.name = name; document.head.appendChild(m); }
    m.content = content;
  }
  document.title = APP_NAME;
  setMeta('application-name', SHORT_NAME);
  setMeta('apple-mobile-web-app-title', SHORT_NAME);
  try{ localStorage.setItem('hikayemiz_pwa_version', VERSION); }catch(e){}

  // Service worker only updates content cache; iOS home-screen label may still require re-adding.
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('./sw.js?v='+VERSION).then(function(reg){
        if(reg.update) reg.update();
      }).catch(function(){});
    });
  }
})();
