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

// --- 2. VERİ MODELLERİ (SCHEMAS) ---

// A) Soru Modeli
const QuestionSchema = new mongoose.Schema({
    level: Number,
    text: String,
    image: String,
    options: [String],
    answer: String,
    coordinates: [Number]
});
const Question = mongoose.model('Question', QuestionSchema);

// B) Kullanıcı Modeli (YENİ - 4. GÜN)
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'player' } // 'admin', 'player', 'guest'
});
const User = mongoose.model('User', UserSchema);

// Middleware
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use(express.json());

// --- 3. API ENDPOINTLERİ ---

// --- KULLANICI İŞLEMLERİ (AUTH) ---

// 1. Kayıt Ol (Register)
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        // Basit bir kontrol: Aynı isimde biri var mı?
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Bu kullanıcı adı zaten alınmış." });
        }
        
        const newUser = new User({ username, password, role: role || 'player' });
        await newUser.save();
        res.status(201).json({ message: "Kayıt başarılı!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Giriş Yap (Login)
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        
        if (user) {
            res.json({ message: "Giriş başarılı", user });
        } else {
            res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- SORU İŞLEMLERİ ---

app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/questions', async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/questions/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: "Soru başarıyla silindi" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed (Veri Doldurma)
app.get('/seed', async (req, res) => {
    res.send("Veritabanı zaten dolu.");
});

// Sayfa Yönlendirmeleri
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // İlk açılışta Login'e git
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});