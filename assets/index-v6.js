/* ===== INDEX V6 — BUYUK VERI + SADE KULLANIM KATMANI ===== */
(function(){
  'use strict';

  const DATA = {
    version: '2026.07.04-index-v6',
    hiddenMiniSections: ['puzzleSection','memorySection','heartCatchSection','butterflySection','coinFlipSection'],
    featured: [
      { id:'gallerySection', icon:'📸', title:'Anılar Galerisi', text:'Fotoğrafları daha sade ve sinematik bir akışla gez.', tag:'Anılar' },
      { id:'loveLetterSection', icon:'💌', title:'Mektup', text:'En duygusal bölüme tek dokunuşla geç.', tag:'Duygu' },
      { id:'feelingBadSection', icon:'🤍', title:'Moral Desteği', text:'Kötü hissettiği anda açılacak yumuşak bölüm.', tag:'Destek' },
      { id:'reasonsSection', icon:'💝', title:'100 Sebep', text:'Sevginin nedenlerini hızlıca gösteren özel alan.', tag:'Liste' },
      { id:'dreamDatePlannerSection', icon:'🌙', title:'Hayal Randevusu', text:'Randevu fikrini sade ve tatlı şekilde seç.', tag:'Plan' },
      { id:'pageBlogSection', icon:'📖', title:'Hikaye Akışı', text:'Siteyi bölüm bölüm gezmek yerine akıştan keşfet.', tag:'Akış' },
      { id:'sickCareSection', icon:'🫶', title:'Hasta Olunca', text:'Nazik bakım notları ve küçük hatırlatmalar.', tag:'Bakım' },
      { id:'promiseSection', icon:'🤍', title:'Sana Söz', text:'Kısa, net ve kalpten söz bölümü.', tag:'Söz' },
      { id:'secretGardenSection', icon:'🌷', title:'Gizli Bahçe', text:'Sade ama romantik görsel sürpriz.', tag:'Bahçe' }
    ],
    notes: [
      'Bugün güzel geçsin diye kalbimden sana minicik bir ışık bıraktım.',
      'Sen gülünce bu sitenin bütün renkleri daha parlak oluyor.',
      'Yorulduğunda burada dinlen; bu sayfa acele etmiyor.',
      'Her bölüm, seni biraz daha mutlu etmek için sadeleştirildi.',
      'Uzaklık varsa bile kalbimin yönü hep sana bakıyor.',
      'Bazen tek gereken şey: derin bir nefes ve sevildiğini hatırlamak.',
      'Bu sayfanın en güzel efekti sensin; gerisi sadece çerçeve.',
      'Sana özel olan şey karmaşık olmak zorunda değil; içten olması yeter.',
      'Günün kötü geçerse burası küçük bir güvenli alan gibi kalsın.',
      'Bir fotoğraf, bir söz, bir şarkı: hepsi aynı yere çıkıyor; sana.',
      'İyi ki varsın cümlesi kısa ama içindeki anlam çok büyük.',
      'Bu site kalabalık değil, senin için seçilmiş küçük bir dünya.',
      'Güzel kalbin için güzel bir düzen, sade bir akış ve sıcak bir his.',
      'Ne zaman açarsan aç, burada seni düşünen bir kalp var.',
      'Karmaşa azaltıldı; his daha net, sevgi daha görünür kaldı.',
      'Sadece hızlı değil; yumuşak, okunur ve telefonda rahat olsun diye hazırlandı.'
    ],
    routes: [
      { id:'gallerySection', title:'Anılar', text:'Fotoğrafları gez' },
      { id:'loveLetterSection', title:'Mektup', text:'Duyguyu oku' },
      { id:'feelingBadSection', title:'Destek', text:'Moral bölümü' },
      { id:'finaleSection', title:'Final', text:'Büyük kapanış' }
    ],
    quickMessages: [
      { label:'Sade Mod', text:'Gereksiz oyun kısayolları gizlendi; ana site artık daha net geziliyor.' },
      { label:'Mobil', text:'Kartlar tek kolon akıyor, butonlar parmakla daha rahat basılacak boyutta.' },
      { label:'PC', text:'Geniş ekranda panel, arama ve kart sistemi dengeli şekilde yayılıyor.' },
      { label:'Veri', text:'Notlar, rota, kartlar ve arama tek veri yapısından besleniyor.' }
    ],
    sectionMeta: {
      starrySection: { icon:'🌌', name:'Yıldızlı Gece', group:'Giriş' },
      punishSection: { icon:'🥊', name:'Kızdığımda Tıkla', group:'Eğlence' },
      musicSection: { icon:'🎵', name:'Bizim Melodimiz', group:'Duygu' },
      heartRainSection: { icon:'❤️', name:'Kalp Yağmuru', group:'Duygu' },
      gallerySection: { icon:'📸', name:'Anılarımız', group:'Anı' },
      happinessSection: { icon:'💝', name:'Mutluluk Köşesi', group:'Destek' },
      complimentBoxSection: { icon:'✨', name:'İltifat Kutusu', group:'Söz' },
      loveVaultSection: { icon:'🎁', name:'Mutlu Etme Planım', group:'Destek' },
      doorsSection: { icon:'🚪', name:'Kapılar', group:'Duygu' },
      worldSection: { icon:'🌍', name:'Dünya', group:'Mesafe' },
      quizSection: { icon:'💘', name:'Aşk Testi', group:'Soru' },
      reasonsSection: { icon:'💝', name:'100 Sebep', group:'Liste' },
      distanceSection: { icon:'🗺️', name:'Şu An Neredeyiz?', group:'Mesafe' },
      hourglassSection: { icon:'⏳', name:'Kum Saati', group:'Zaman' },
      sickCareSection: { icon:'🫶', name:'Hasta Olduğunda', group:'Destek' },
      feelingBadSection: { icon:'🤍', name:'Buradayım', group:'Destek' },
      loveLetterSection: { icon:'💌', name:'Sana Bir Mektup', group:'Duygu' },
      promiseSection: { icon:'🤍', name:'Sana Söz', group:'Söz' },
      secretGardenSection: { icon:'🌷', name:'Gizli Bahçe', group:'Görsel' },
      skyMessageSection: { icon:'☁️', name:'Göğe Mesaj', group:'Söz' },
      dateWheelSection: { icon:'🎡', name:'Randevu Çarkı', group:'Plan' },
      palaceSection: { icon:'🏰', name:'Aşk Sarayı', group:'Görsel' },
      memoryJarSection: { icon:'🫙', name:'Anı Kavanozu', group:'Anı' },
      bouquetSection: { icon:'💐', name:'Sanal Buket', group:'Hediye' },
      futureLetterSection: { icon:'✉️', name:'Geleceğe Mektup', group:'Zaman' },
      cinemaSection: { icon:'🎬', name:'Bizim Filmimiz', group:'Anı' },
      starVowSection: { icon:'✨', name:'Yıldız Sözleri', group:'Söz' },
      royalGalaxySection: { icon:'👑', name:'Kraliyet Galaksisi', group:'Görsel' },
      loveLibrarySection: { icon:'📚', name:'Aşk Kütüphanesi', group:'Söz' },
      wishComposerSection: { icon:'🎼', name:'Dilek Bestesi', group:'Duygu' },
      goldenTicketSection: { icon:'🎟️', name:'Altın Bilet', group:'Plan' },
      dailyMagicSection: { icon:'💫', name:'Bugünün Sürprizi', group:'Günlük' },
      heartBeatSection: { icon:'💓', name:'Kalp Ritmi', group:'Duygu' },
      romanticTasksSection: { icon:'🌷', name:'Mutlu Etme Görevleri', group:'Plan' },
      sweetWallSection: { icon:'🖼️', name:'Tatlı Not Duvarı', group:'Söz' },
      queenCertificateSection: { icon:'👑', name:'Kraliçe Sertifikası', group:'Hediye' },
      aiCloneSection: { icon:'🤖', name:'Sanal Sefa', group:'Sohbet' },
      loveFortuneSection: { icon:'🔮', name:'Kalp Falı', group:'Duygu' },
      dreamDatePlannerSection: { icon:'🌙', name:'Hayal Randevusu', group:'Plan' },
      hugSimulatorSection: { icon:'🤗', name:'Sanal Sarılma', group:'Destek' },
      timeCapsuleSection: { icon:'⏳', name:'Zaman Kapsülü', group:'Zaman' },
      loveCalendarSection: { icon:'📅', name:'Sevgi Takvimi', group:'Plan' },
      kissStampSection: { icon:'💋', name:'Öpücük Mührü', group:'Söz' },
      pageBlogSection: { icon:'📖', name:'Hikaye Akışı', group:'Ana' },
      notificationSection: { icon:'🔔', name:'Sanal Bildirimler', group:'Günlük' },
      animatedFilmSection: { icon:'🎬', name:'Küçük Film', group:'Anı' },
      finaleSection: { icon:'❤️', name:'Final', group:'Son' }
    }
  };

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const esc = value => String(value ?? '').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const hasSections = () => (typeof SITE_SECTIONS !== 'undefined' && Array.isArray(SITE_SECTIONS));
  const sectionIndex = id => hasSections() ? SITE_SECTIONS.indexOf(id) : -1;
  const go = id => { if (typeof window.goToSection === 'function') window.goToSection(id); };

  function todayIndex(len){
    const now = new Date();
    const start = new Date(now.getFullYear(),0,0);
    const day = Math.floor((now - start) / 86400000);
    return Math.abs(day) % Math.max(1,len);
  }

  function installSectionData(){
    if (!hasSections()) return;
    DATA.hiddenMiniSections.forEach(id => {
      const i = SITE_SECTIONS.indexOf(id);
      if (i > -1) SITE_SECTIONS.splice(i, 1);
    });
  }

  function buildHomeSection(){
    // V8: Ekstra başlangıç paneli kaldırıldı; fonksiyon bilinçli olarak boş.
    const old = document.getElementById('homeSection');
    if (old) old.remove();
  }

  function renderCards(filter='all', query=''){
    const grid = $('#v6Cards');
    if (!grid) return;
    const q = query.toLocaleLowerCase('tr-TR').trim();
    const source = DATA.featured.filter(item => {
      const meta = DATA.sectionMeta[item.id] || {};
      const hay = [item.title,item.text,item.tag,meta.group,meta.name].join(' ').toLocaleLowerCase('tr-TR');
      const filterOk = filter === 'all' || item.tag === filter || meta.group === filter;
      const searchOk = !q || hay.includes(q);
      return filterOk && searchOk;
    });
    grid.innerHTML = source.length ? source.map(item => `
      <button type="button" class="v6-card" data-v6-go="${esc(item.id)}">
        <span class="emoji">${esc(item.icon)}</span>
        <b>${esc(item.title)}</b>
        <p>${esc(item.text)}</p>
        <small>${esc(item.tag)} · Aç</small>
      </button>`).join('') : '<div class="v6-empty">Aradığın başlığa yakın sonuç bulunamadı. Daha kısa kelime dene.</div>';
  }

  function renderNotes(){
    const grid = $('#v6Notes');
    if (!grid) return;
    const start = todayIndex(DATA.notes.length);
    const selected = Array.from({length:8}, (_,i) => DATA.notes[(start+i)%DATA.notes.length]);
    grid.innerHTML = selected.map((note,i) => `<div class="v6-note"><em>${String(i+1).padStart(2,'0')}</em>${esc(note)}</div>`).join('');
  }

  function renderRoute(){
    const route = $('#v6Route');
    if (!route) return;
    route.innerHTML = DATA.routes.map((item,i) => `<button type="button" class="v6-route-step" data-v6-go="${esc(item.id)}"><span>${i+1}</span><b>${esc(item.title)}</b><small>${esc(item.text)}</small></button>`).join('');
  }

  function cleanExistingNavigation(){
    DATA.hiddenMiniSections.forEach(id => {
      $$(`[data-target="${id}"], [onclick*="${id}"], [title*="Puzzle"], [title*="Hafıza Oyunu"], [title*="Kalp Yakala"], [title*="Ördek Uçur"], [title*="Yazı Tura"]`).forEach(el => {
        el.dataset.v6Hidden = 'true';
        el.hidden = true;
      });
    });
  }

  function navItemHtml(id, i){
    const meta = DATA.sectionMeta[id] || {};
    const title = meta.name || $('#' + id)?.querySelector('.section-title,.main-title,.comfort-title,.finale-title')?.textContent?.trim() || id;
    const icon = meta.icon || '•';
    const num = i === 0 ? '🔒' : String(i).padStart(2,'0');
    if (id === 'passwordScreen') return '';
    return `<button type="button" class="side-page-link" data-target="${esc(id)}" data-index="${i}"><span class="side-page-number">${num}</span><span>${esc(icon + ' ' + title)}</span></button>`;
  }

  function rebuildSidebar(){
    if (!hasSections()) return;
    const wrap = $('.side-page-links');
    if (!wrap) return;
    wrap.innerHTML = SITE_SECTIONS.map(navItemHtml).join('') + '<a class="side-external-link" href="./oyun.html">🎮 Oyun Sayfası</a>';
    $$('.side-page-link', wrap).forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const target = btn.dataset.target;
        if (target) go(target);
      });
    });
    const status = $('#sidePageStatus');
    if (status) status.textContent = `1 / ${Math.max(1, SITE_SECTIONS.length - 1)}`;
  }

  function rebuildProgressNav(){ return; }

  function installGlobalOverrides(){
    const oldGo = window.goToSection;
    window.goToSection = function(target){
      let idx = typeof target === 'string' ? sectionIndex(target) : Number(target);
      if (!Number.isFinite(idx) || idx <= 0 || !hasSections()) return;
      const id = SITE_SECTIONS[idx];
      if (DATA.hiddenMiniSections.includes(id)) return;
      if (typeof window.transitionTo === 'function') window.transitionTo(idx);
      else if (typeof oldGo === 'function') oldGo(target);
    };
    window.nextSection = function(){
      if (!hasSections() || typeof currentSection === 'undefined') return;
      let next = Math.min(SITE_SECTIONS.length - 1, currentSection + 1);
      while (next < SITE_SECTIONS.length && DATA.hiddenMiniSections.includes(SITE_SECTIONS[next])) next += 1;
      if (next < SITE_SECTIONS.length && typeof window.transitionTo === 'function') window.transitionTo(next);
    };
    window.__syncSidebar = function(id, idx){
      $$('.side-page-link').forEach(btn => btn.classList.toggle('active', btn.dataset.target === id));
      const status = $('#sidePageStatus');
      if (status && idx > 0 && hasSections()) status.textContent = `${idx} / ${Math.max(1, SITE_SECTIONS.length - 1)}`;
      $('#sidePageList')?.classList.remove('open');
      $('#sideMenuBackdrop')?.classList.remove('open');
      $$('.progress-dot').forEach(dot => {
        const page = Number(dot.dataset.page);
        dot.classList.toggle('active', page === idx);
      });
    };
  }

  function wireHome(){
    let activeFilter = 'all';
    const search = $('#v6Search');
    const update = () => renderCards(activeFilter, search?.value || '');
    search?.addEventListener('input', update);
    $$('.v6-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.v6-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeFilter = tab.dataset.v6Filter || 'all';
        update();
      });
    });
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-v6-go]');
      if (!el) return;
      const id = el.dataset.v6Go;
      if (!id) return;
      e.preventDefault();
      go(id);
    });
    const count = $('#v6PageCount');
    if (count && hasSections()) count.textContent = Math.max(0, SITE_SECTIONS.length - 1);
    renderCards();
    renderNotes();
    renderRoute();
  }

  function patchQuickButtons(){
    const comfort = $('#comfortQuickBtn');
    if (comfort) comfort.onclick = () => go('feelingBadSection');
    const daily = $('#dailyNoteBtn');
    if (daily) daily.setAttribute('aria-label','Günün notunu göster');
  }

  function showToast(){ /* V8: bildirim/panel tanıtımı kaldırıldı. */ }

  function init(){
    installSectionData();
    buildHomeSection();
    rebuildSidebar();
    rebuildProgressNav();
    cleanExistingNavigation();
    installGlobalOverrides();
    patchQuickButtons();
    document.body.classList.add('v6-ready','v6-simple-index','index-v8-no-special-panel');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
