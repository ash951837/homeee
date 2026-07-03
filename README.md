# Nightfall Academy Ultra 5.0 — Living Academy

Özgün çizimlerle hazırlanmış fantastik karakter yaratma, stil ve yaşam simülasyonu.

Bu sürümde yeni mini oyun eklenmedi. Ultra 4'te bulunan mevcut Altın Ördek Göleti korunurken geliştirme; hikâye, okul dünyası, katmanlı gardırop, oda dekorasyonu, ördek bakımı, podyum, koleksiyon ve fotoğraf stüdyosuna odaklandı.

## Oyunu çalıştırma

### En kolay yöntem

`index.html` dosyasını tarayıcıda açın.

### Windows

`start.bat` dosyasına çift tıklayın. Oyun `http://localhost:8080` adresinde açılır.

### macOS / Linux

Terminalde proje klasörüne girip çalıştırın:

```bash
chmod +x start.sh
./start.sh
```

## Ultra 5 yenilikleri

### Yaşayan Akademi

- Tıklanabilir okul haritası
- Dokuz ana bölüm arasında hızlı geçiş
- Ana avatar editörüyle ortak çalışan dünya profili
- Ay Parası, kristal, ün ve sezon ilerlemesi
- Otomatik kayıt ve JSON yedekleme

### Hikâye modu

- Sekiz ayrıntılı hikâye bölümü
- Diyalog seçimleri
- Luna, Profesör Vera ve Rowan için ilişki puanları
- Bölüm kilitleri ve kalıcı ödüller
- Alternatif kişilik yönelimleri
- Final bölümü ve Gece Tasarımcısı unvanı

### Katmanlı gardırop

- Üst, alt, ceket/pelerin, kol, ayakkabı ve çanta ayrı seçilir
- Korsaj, bluz, kısa üst, zırh ve göksel üst
- Etek, pantolon, şort, balo eteği ve nebula eteği
- Pelerin, bolero, kolej ceketi ve gölge pelerini
- Kadife, saten, deri ve yıldız danteli dokuları
- Üç bağımsız özel renk
- X/Y konumu, ölçek ve döndürme ayarları
- Avatar üzerinde fareyle sürükleme ve tekerlekle ölçekleme
- Gardırop parçalarının ana SVG avatarına gerçek katman olarak çizilmesi

### Yurt odası

- Duvar, zemin, yatak, halı, pencere ve masa
- Lamba, poster ve ördek yatağı
- Canlı oda önizlemesi
- Ördeğin mutluluğunu artıran oda ziyaretleri
- Hikâyeden açılan özel dekor ödülleri

### Ördek bakım merkezi

- Ördeğe isim verme
- Tokluk, temizlik, dinlenme ve mutluluk göstergeleri
- Zamanla azalan ihtiyaç sistemi
- Besleme, banyo, uyku ve sevme etkileşimleri
- Taç, fiyonk, atkı, gözlük ve büyücü aksesuarları
- Bakım seçimlerinin ana avatar yardımcısına uygulanması
- Duygu durumuna göre değişen konuşmalar

### Ay Podyumu

- Beş profesyonel tema
- Tema uyumu, renk dengesi, katman detayı, özgünlük ve yardımcı uyumu
- 100 puan üzerinden ayrıntılı jüri raporu
- Ay Parası, kristal, ün ve XP ödülleri
- Podyum başarılarına göre nadir eşya açılması
- En iyi puan ve katılım kaydı

### Koleksiyon

- 36 koleksiyon öğesi
- Yaygın, nadir, destansı ve efsanevi nadirlikler
- Hikâye ve podyum ödülleri
- Kilitli/açık eşya görünümü

### Fotoğraf stüdyosu

- Altı sahne hazırı
- Kapak başlığı
- Karakter konumu, ölçeği ve dönüşü
- Ana avatarın PNG, HD, 4K, şeffaf PNG ve SVG sistemine geçiş

### Erişilebilirlik ve teknik özellikler

- Hareketleri azaltma
- Yüksek kontrast
- Büyük metin
- Klavye erişimi
- Mobil alt gezinme çubuğu
- 390 px genişlikte yatay taşma olmadan çalışma
- Güvenli bellek yedeği: tarayıcı depolamasının kapalı olduğu ortamlarda oyun oturumu bozulmaz
- PWA/çevrimdışı önbellek
- Modüler `ultra5.css` ve `ultra5.js` dosyaları

## Dosyalar

- `index.html`: ana oyun ve avatar motoru
- `ultra5.css`: Yaşayan Akademi arayüzü
- `ultra5.js`: hikâye, dünya, gardırop, yurt, bakım, podyum ve koleksiyon sistemleri
- `manifest.webmanifest`: PWA ayarları
- `sw.js`: çevrimdışı önbellek
- `start.bat`, `start.sh`: yerel sunucu başlatıcıları
- `TEST-REPORT.txt`: doğrulama sonuçları
- `ultra5-*-preview.png`: özellik önizlemeleri

## Not

Proje, referans oyunun karakter oluşturma fikrinden esinlenir; Monster High markasına ait karakter, logo veya telifli oyun görsellerini içermez.
