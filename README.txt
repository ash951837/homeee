BU PAKETTE ANA DOSYA SADECE index.html

Site adresine tıklanınca açılacak dosya: index.html

Önemli:
1. Hosting/GitHub Pages/Netlify panelindeki eski dosyaları tamamen sil.
2. Bu zip içindeki dosyaları ana dizine yükle.
3. Eski oyun.html dosyasını sunucuda bırakma. Bu pakette oyun.html yoktur.
4. Telefon tarayıcısı/PWA eski sayfayı gösterirse uygulama kısayolunu silip siteyi yeniden ana ekrana ekle.

Ek dosyalar:
- .htaccess: Apache hostinglerde kökü index.html yapar ve eski oyun.html isteklerini index.html'e yönlendirir.
- _redirects: Netlify için eski oyun.html isteklerini index.html'e yönlendirir.
- vercel.json: Vercel için aynı yönlendirmeleri yapar.
