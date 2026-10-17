const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());


const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');

// Klasörler yoksa oluştur
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });


app.use(express.static(path.join(__dirname, 'public')));
app.use('/output', express.static(outputDir));

// Multer ile dosya yükleme
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const temizIsim = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        const uniqueName = Date.now() + '-' + temizIsim;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });

app.post('/api/separate', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Dosya yüklenemedi!' });
    }

    const inputFilePath = req.file.path;
    const fileNameWithoutExt = path.parse(req.file.filename).name;

    console.log(`\n[AI] Demucs Turbo (FT) Motoru Ateşlendi: ${fileNameWithoutExt}`);

    const safeOutputDir = outputDir.replace(/\\/g, '/');
    const safeInputPath = inputFilePath.replace(/\\/g, '/');

    
    const command = `demucs -n htdemucs_ft "${safeInputPath}" -o "${safeOutputDir}"`;
    
    console.log(`[BİLGİ] Komut: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (stdout) console.log(`[Demucs Çıktısı]: ${stdout}`);
        if (stderr) console.error(`[Demucs Hata/Bilgi]: ${stderr}`);

        if (error) {
            console.error(`[HATA] Demucs ÇÖKTÜ amınakoyim: ${error.message}`);
            return res.status(500).json({ error: 'Ayrıştırma başarısız.' });
        }

        console.log(`[AI] Cam Gibi Ayrıştırıldı: ${fileNameWithoutExt}`);

        // DİKKAT: Klasör adını da htdemucs_ft yaptık ki şarkıyı bulabilsin!
        const trackBaseUrl = `/output/htdemucs_ft/${fileNameWithoutExt}`;

        res.json({
            tracks: {
                vocals: `${trackBaseUrl}/vocals.wav`,
                drums: `${trackBaseUrl}/drums.wav`,
                bass: `${trackBaseUrl}/bass.wav`,
                other: `${trackBaseUrl}/other.wav`
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Sunucu aktif! Tarayıcıda http://localhost:${PORT} adresine gidin.`);
    console.log(`Pro-AI motoru (Demucs) hazır, stüdyo kaydı bekleniyor...`);
});