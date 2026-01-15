const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// --- 1. VERİTABANI BAĞLANTISI ---
// Senin çalışan linkin:
const MONGO_URI = 'mongodb+srv://admin:admin123@oguzozalp.azxflig.mongodb.net/geogame?retryWrites=true&w=majority&appName=oguzozalp';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Bağlantısı Başarılı!'))
    .catch(err => console.error('❌ Bağlantı Hatası:', err));

// --- SWAGGER AYARLARI (Manuel Tanımlama - Hata Riskini Sıfırlar) ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GeoGame API',
            version: '1.0.0',
            description: 'GeoGame Projesi API Dokümantasyonu'
        },
        servers: [{ url: `http://localhost:${PORT}` }],
        components: {
            schemas: {
                Question: {
                    type: 'object',
                    properties: {
                        text: { type: 'string' },
                        answer: { type: 'string' },
                        level: { type: 'integer' }
                    }
                }
            }
        },
        // Yolları (Paths) burada elle tanımlıyoruz, böylece JSDoc okuma hatası olmuyor:
        paths: {
            '/api/questions': {
                get: {
                    summary: 'Tüm soruları listeler',
                    responses: {
                        200: { description: 'Başarılı işlem' }
                    }
                },
                post: {
                    summary: 'Yeni soru ekler (Admin)',
                    responses: {
                        201: { description: 'Soru oluşturuldu' }
                    }
                }
            },
            '/api/questions/{id}': {
                delete: {
                    summary: 'Soruyu siler',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            schema: { type: 'string' },
                            required: true,
                            description: 'Silinecek sorunun IDsi'
                        }
                    ],
                    responses: {
                        200: { description: 'Silindi' }
                    }
                }
            },
            '/api/register': {
                post: {
                    summary: 'Kullanıcı kaydı',
                    responses: {
                        201: { description: 'Kayıt Başarılı' }
                    }
                }
            },
            '/api/login': {
                post: {
                    summary: 'Giriş yap',
                    responses: {
                        200: { description: 'Giriş Başarılı' }
                    }
                }
            }
        }
    },
    apis: [] // Dosya okumayı kapattık, hata veremez!
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- 2. VERİ MODELLERİ ---
const QuestionSchema = new mongoose.Schema({
    level: Number,
    text: String,
    image: String,
    options: [String],
    answer: String,
    coordinates: [Number]
});
const Question = mongoose.model('Question', QuestionSchema);

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'player' }
});
const User = mongoose.model('User', UserSchema);

// Middleware
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use(express.json());

// --- 3. API ENDPOINTLERİ ---

// A) Soruları Getir
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// B) Soru Ekle
app.post('/api/questions', async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// C) Soru Sil
app.delete('/api/questions/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: "Soru başarıyla silindi" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// D) Kayıt Ol
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "Kullanıcı adı alınmış." });
        
        const newUser = new User({ username, password, role: role || 'player' });
        await newUser.save();
        res.status(201).json({ message: "Kayıt başarılı!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// E) Giriş Yap
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) res.json({ message: "Giriş başarılı", user });
        else res.status(401).json({ error: "Hatalı giriş!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed
app.get('/seed', async (req, res) => {
    res.send("Veritabanı zaten dolu.");
});

// Sayfa Yönlendirmeleri
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});