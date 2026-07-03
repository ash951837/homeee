// Hikayemiz PWA kurulumu
(function () {
  const APP_NAME = "Hikayemiz";
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const canUseServiceWorker = "serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1");

  if (canUseServiceWorker) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./service-worker.js").catch(function (error) {
        console.warn("Service Worker kayıt hatası:", error);
      });
    });
  }

  let deferredPrompt = null;

  function createInstallButton() {
    let button = document.querySelector(".pwa-install-button");
    if (button) return button;

    button = document.createElement("button");
    button.type = "button";
    button.className = "pwa-install-button";
    button.setAttribute("aria-label", APP_NAME + " uygulamasını telefona yükle");
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"/></svg><span>Uygulamayı Yükle</span>';
    document.body.appendChild(button);

    button.addEventListener("click", async function () {
      if (!deferredPrompt) return;
      button.classList.remove("is-visible");
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (e) {}
      deferredPrompt = null;
    });

    return button;
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
    const button = createInstallButton();
    button.classList.add("is-visible");
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    const button = document.querySelector(".pwa-install-button");
    if (button) button.remove();
  });

  function isIosSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(window.navigator.userAgent);
    return isIos && isSafari;
  }

  function maybeShowIosHint() {
    if (isStandalone || !isIosSafari()) return;
    if (localStorage.getItem("hikayemiz-ios-hint-closed") === "1") return;
    setTimeout(function () {
      const hint = document.createElement("div");
      hint.className = "pwa-ios-hint";
      hint.innerHTML = '<button type="button" aria-label="Kapat">×</button><strong>Telefona ekle:</strong> Paylaş simgesine dokun, sonra <strong>Ana Ekrana Ekle</strong> seçeneğini seç.';
      hint.querySelector("button").addEventListener("click", function () {
        localStorage.setItem("hikayemiz-ios-hint-closed", "1");
        hint.remove();
      });
      document.body.appendChild(hint);
    }, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", maybeShowIosHint);
  } else {
    maybeShowIosHint();
  }
})();
