const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// --- 1. VERİTABANI BAĞLANTISI ---
const MONGO_URI = 'mongodb+srv://admin:admin123@oguzozalp.azxflig.mongodb.net/geogame?retryWrites=true&w=majority&appName=oguzozalp';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Bağlantısı Başarılı!'))
    .catch(err => console.error('❌ Bağlantı Hatası:', err));

// --- 2. VERİ MODELİ (SCHEMA) ---
const QuestionSchema = new mongoose.Schema({
    level: Number,
    text: String,
    image: String,
    options: [String],
    answer: String,
    coordinates: [Number]
});

const Question = mongoose.model('Question', QuestionSchema);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Bu satır POST işlemi için çok önemli!

// --- 3. API ENDPOINTLERİ ---

// A) Soruları Getir (GET)
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// B) Veritabanını Doldur (Seed)
app.get('/seed', async (req, res) => {
    // ... (Seed kodları aynı kalabilir veya yer kaplamasın diye kısalttım, zaten yüklemiştin) ...
    res.send("Veritabanı zaten dolu, tekrar yüklemeye gerek yok.");
});

// --- YENİ EKLENEN KISIMLAR (3. GÜN) ---

// C) Yeni Soru Ekle (POST)
app.post('/api/questions', async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// D) Soru Sil (DELETE)
app.delete('/api/questions/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: "Soru başarıyla silindi" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ana Sayfa Rotası
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});