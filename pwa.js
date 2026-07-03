// Hİkayemiz / Bizim PWA kurulum yardımcısı
(function () {
  const APP_NAME = "Hİkayemiz";
  const SHORT_NAME = "Bizim";
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const isSecure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  if ("serviceWorker" in navigator && isSecure) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
        .then(function () { console.log(APP_NAME + " PWA aktif."); })
        .catch(function (error) { console.warn("Service Worker kayıt hatası:", error); });
    });
  } else if (!isSecure) {
    console.warn("PWA için site HTTPS ile açılmalı. file:// veya http:// üzerinde kurulum çalışmaz.");
  }

  let deferredPrompt = null;

  function createButton() {
    let button = document.querySelector(".pwa-install-button");
    if (button) return button;

    button = document.createElement("button");
    button.type = "button";
    button.className = "pwa-install-button";
    button.setAttribute("aria-label", SHORT_NAME + " uygulamasını yükle");
    button.innerHTML = '<span class="pwa-install-icon">↓</span><span>Uygulamayı Yükle</span>';
    document.body.appendChild(button);

    button.addEventListener("click", async function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try { await deferredPrompt.userChoice; } catch (_) {}
        deferredPrompt = null;
        button.classList.remove("is-visible");
        return;
      }
      showManualInstallHint();
    });

    return button;
  }

  function showManualInstallHint() {
    if (document.querySelector(".pwa-manual-hint")) return;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const hint = document.createElement("div");
    hint.className = "pwa-manual-hint";
    hint.innerHTML = isIos
      ? '<button type="button" aria-label="Kapat">×</button><strong>iPhone kurulumu:</strong> Safari ile aç → Paylaş → <b>Ana Ekrana Ekle</b>.'
      : '<button type="button" aria-label="Kapat">×</button><strong>Android kurulumu:</strong> Chrome menüsü → <b>Uygulamayı yükle</b> veya <b>Ana ekrana ekle</b>.';
    hint.querySelector("button").addEventListener("click", function () { hint.remove(); });
    document.body.appendChild(hint);
    setTimeout(function () { if (hint.isConnected) hint.remove(); }, 9000);
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
    const button = createButton();
    button.classList.add("is-visible");
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    const button = document.querySelector(".pwa-install-button");
    if (button) button.remove();
  });

  ready(function () {
    if (isStandalone) return;
    // iPhone'da beforeinstallprompt yok; kullanıcıya kısa bilgi göster.
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIos && !localStorage.getItem("bizim-ios-pwa-hint-closed")) {
      setTimeout(function () {
        const hint = document.createElement("div");
        hint.className = "pwa-ios-hint";
        hint.innerHTML = '<button type="button" aria-label="Kapat">×</button><strong>Bizim’i telefona ekle:</strong> Paylaş → <b>Ana Ekrana Ekle</b>.';
        hint.querySelector("button").addEventListener("click", function () {
          localStorage.setItem("bizim-ios-pwa-hint-closed", "1");
          hint.remove();
        });
        document.body.appendChild(hint);
      }, 1800);
    }

    // Bazı tarayıcılarda beforeinstallprompt görünmez; yine de yardım butonu gösterilebilir.
    setTimeout(function () {
      if (!document.querySelector(".pwa-install-button") && !isStandalone) {
        const button = createButton();
        button.classList.add("is-visible", "is-help");
      }
    }, 3500);
  });
})();
