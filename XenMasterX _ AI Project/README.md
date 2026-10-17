# 🎵 XenMasterX AI - Stüdyo Kalitesinde Ses Ayrıştırıcı

Bu proje, yapay zeka kullanarak (Meta'nın **Demucs V8 FT** modeli) herhangi bir şarkıyı stüdyo kalitesinde 4 parçaya (Vokal, Davul, Bass, Diğer) ayırır. Spleeter gibi su altı sesleri vermez, frekansları cam gibi böler.

## 🚀 Özellikler
* **Node.js & Express** ile yazılmış güçlü backend.
* **Demucs (htdemucs_ft)** fine-tuned AI motoru entegrasyonu.
* Kullanıcı dostu web arayüzü (HTML/CSS/JS).
* Otomatik dosya isim temizleme ve Windows path sorunlarını çözen sistem.

## 🛠️ Kurulum
1. Bilgisayarınızda Python, FFmpeg ve Node.js'in kurulu olduğundan emin olun.
2. Konsola `npm install` yazarak gerekli paketleri indirin.
3. Konsola `pip install -U demucs` yazarak AI motorunu kurun.
4. `node server.js` ile sunucuyu başlatıp http://localhost:3000 adresine gidin!