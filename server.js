const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// --- 1. VERİTABANI BAĞLANTISI ---
// Senin MongoDB Linkin (Şifre eklendi):
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

app.use(express.static(path.join(__dirname, 'public')));
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

// B) Veritabanını Doldur (Seed)
app.get('/seed', async (req, res) => {
    const dummyData = [
        // LEVEL 1
        { level: 1, text: "Türkiye'nin başkenti neresidir?", image: null, options: ["İstanbul", "Ankara", "İzmir", "Bursa"], answer: "Ankara", coordinates: [39.9334, 32.8597] },
        { level: 1, text: "Bu fotoğraftaki ünlü kule hangi şehirdedir?", image: "Images/eyfel.jpg", options: ["Londra", "Berlin", "Paris", "Roma"], answer: "Paris", coordinates: [48.8584, 2.2945] },
        { level: 1, text: "Dünyanın şekli aşağıdakilerden hangisine en çok benzer?", image: null, options: ["Küp", "Geoid", "Düzlem", "Piramit"], answer: "Geoid", coordinates: [0, 0] },
        { level: 1, text: "Bu piramitleriyle ünlü ülke hangisidir?", image: "Images/misir.jpg", options: ["Meksika", "Mısır", "Hindistan", "Çin"], answer: "Mısır", coordinates: [29.9792, 31.1342] },
        { level: 1, text: "Haritada 'çizme' şekline benzeyen bu ülke hangisidir?", image: "Images/italya_siluet.jpg", options: ["İtalya", "İspanya", "Yunanistan", "Şili"], answer: "İtalya", coordinates: [41.8719, 12.5674] },
        
        // LEVEL 2
        { level: 2, text: "Dünyanın en uzun nehirlerinden biri olan Nil Nehri hangi kıtadadır?", image: null, options: ["Asya", "Güney Amerika", "Afrika", "Avrupa"], answer: "Afrika", coordinates: [30.0444, 31.2357] },
        { level: 2, text: "Avustralya'nın başkenti neresidir?", image: null, options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra", coordinates: [-35.2809, 149.1300] },
        { level: 2, text: "Başlangıç Meridyeni (0°) hangi şehirden geçer?", image: null, options: ["New York", "Londra (Greenwich)", "Paris", "Moskova"], answer: "Londra (Greenwich)", coordinates: [51.4934, 0.0098] },
        { level: 2, text: "Görseldeki 'Özgürlük Heykeli' hangi şehirdedir?", image: "Images/ozgurluk_heykeli.jpg", options: ["Washington DC", "New York", "Los Angeles", "Chicago"], answer: "New York", coordinates: [40.6892, -74.0445] },
        { level: 2, text: "Asya ve Avrupa kıtalarını birbirine bağlayan şehir hangisidir?", image: null, options: ["İstanbul", "Atina", "Sofya", "Tiflis"], answer: "İstanbul", coordinates: [41.0082, 28.9784] },

        // LEVEL 3
        { level: 3, text: "Kutuplara doğru gidildikçe alanları aşırı büyüten harita projeksiyonu hangisidir?", image: null, options: ["Mercator", "Robinson", "Konik", "Azimutal"], answer: "Mercator", coordinates: [71.7069, -42.6043] },
        { level: 3, text: "Asya ile Kuzey Amerika'yı ayıran boğaz hangisidir?", image: "Images/bering_bogazi.jpg", options: ["İstanbul Boğazı", "Cebelitarık", "Bering", "Süveyş"], answer: "Bering", coordinates: [65.8491, -168.9691] },
        { level: 3, text: "Bu fotoğraftaki 'Machu Picchu' antik kenti hangi ülkededir?", image: "Images/machu_picchu.jpg", options: ["Arjantin", "Brezilya", "Peru", "Şili"], answer: "Peru", coordinates: [-13.1631, -72.5450] },
        { level: 3, text: "Hangi ülke hem Asya hem de Avrupa kıtasında toprağa sahiptir?", image: null, options: ["Rusya", "Almanya", "Çin", "İran"], answer: "Rusya", coordinates: [61.5240, 105.3188] },
        { level: 3, text: "0° Enlem ve 0° Boylam'ın kesiştiği nokta ('Null Island') hangi körfezdedir?", image: null, options: ["Meksika Körfezi", "Basra Körfezi", "Gine Körfezi", "Bengal Körfezi"], answer: "Gine Körfezi", coordinates: [0, 0] },

        // LEVEL 4
        { level: 4, text: "Dünyanın bilinen en derin noktası neresidir?", image: null, options: ["Büyük Kanyon", "Mariana Çukuru", "Everest", "Lut Gölü"], answer: "Mariana Çukuru", coordinates: [11.2156, 142.1529] },
        { level: 4, text: "GPS uydularının bulunduğu yörünge sınıfı hangisidir?", image: null, options: ["LEO", "MEO (Orta)", "GEO", "HEO"], answer: "MEO (Orta)", coordinates: [38.8995, -77.0166] },
        { level: 4, text: "Görseldeki dünyanın en kurak çölü hangisidir?", image: "Images/atacama.jpg", options: ["Sahra", "Gobi", "Atacama", "Kalahari"], answer: "Atacama", coordinates: [-23.8634, -69.1328] },
        { level: 4, text: "Fotoğraftaki 'Petra Antik Kenti' hangi ülkededir?", image: "Images/petra.jpg", options: ["Ürdün", "Suriye", "Irak", "Lübnan"], answer: "Ürdün", coordinates: [30.3285, 35.4444] },
        { level: 4, text: "Hangi ülke en fazla zaman dilimine (time zone) sahiptir?", image: null, options: ["Rusya", "ABD", "Çin", "Fransa"], answer: "Fransa", coordinates: [46.2276, 2.2137] }
    ];

    await Question.deleteMany({}); 
    await Question.insertMany(dummyData);
    res.send("✅ Veritabanı başarıyla dolduruldu! Artık oyunu oynayabilirsin.");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});