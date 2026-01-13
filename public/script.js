// --- VERİ SETİ (FETCH HATA VERMESİN DİYE BURAYA GÖMÜLDÜ) ---
const allGameData = [
  {
    "level": 1, // ORMAN
    "questions": [
      { "id": 1, "text": "Türkiye'nin başkenti neresidir?", "image": null, "options": ["İstanbul", "Ankara", "İzmir", "Bursa"], "answer": "Ankara", "coordinates": [39.9334, 32.8597] },
      { "id": 2, "text": "Bu fotoğraftaki ünlü kule hangi şehirdedir?", "image": "Images/eyfel.jpg", "options": ["Londra", "Berlin", "Paris", "Roma"], "answer": "Paris", "coordinates": [48.8584, 2.2945] },
      { "id": 3, "text": "Dünyanın şekli aşağıdakilerden hangisine en çok benzer?", "image": null, "options": ["Küp", "Geoid", "Düzlem", "Piramit"], "answer": "Geoid", "coordinates": [0, 0] },
      { "id": 4, "text": "Bu piramitleriyle ünlü ülke hangisidir?", "image": "Images/misir.jpg", "options": ["Meksika", "Mısır", "Hindistan", "Çin"], "answer": "Mısır", "coordinates": [29.9792, 31.1342] },
      { "id": 5, "text": "Haritada 'çizme' şekline benzeyen bu ülke hangisidir?", "image": "Images/italya_siluet.jpg", "options": ["İtalya", "İspanya", "Yunanistan", "Şili"], "answer": "İtalya", "coordinates": [41.8719, 12.5674] }
    ]
  },
  {
    "level": 2, // DENİZ
    "questions": [
      { "id": 1, "text": "Dünyanın en uzun nehirlerinden biri olan Nil Nehri hangi kıtadadır?", "image": null, "options": ["Asya", "Güney Amerika", "Afrika", "Avrupa"], "answer": "Afrika", "coordinates": [30.0444, 31.2357] },
      { "id": 2, "text": "Avustralya'nın başkenti neresidir?", "image": null, "options": ["Sydney", "Melbourne", "Canberra", "Perth"], "answer": "Canberra", "coordinates": [-35.2809, 149.1300] },
      { "id": 3, "text": "Başlangıç Meridyeni (0°) hangi şehirden geçer?", "image": null, "options": ["New York", "Londra (Greenwich)", "Paris", "Moskova"], "answer": "Londra (Greenwich)", "coordinates": [51.4934, 0.0098] },
      { "id": 4, "text": "Görseldeki 'Özgürlük Heykeli' hangi şehirdedir?", "image": "Images/ozgurluk_heykeli.jpg", "options": ["Washington DC", "New York", "Los Angeles", "Chicago"], "answer": "New York", "coordinates": [40.6892, -74.0445] },
      { "id": 5, "text": "Asya ve Avrupa kıtalarını birbirine bağlayan şehir hangisidir?", "image": null, "options": ["İstanbul", "Atina", "Sofya", "Tiflis"], "answer": "İstanbul", "coordinates": [41.0082, 28.9784] }
    ]
  },
  {
    "level": 3, // GÖKYÜZÜ
    "questions": [
      { "id": 1, "text": "Kutuplara doğru gidildikçe alanları aşırı büyüten harita projeksiyonu hangisidir?", "image": null, "options": ["Mercator", "Robinson", "Konik", "Azimutal"], "answer": "Mercator", "coordinates": [71.7069, -42.6043] },
      { "id": 2, "text": "Asya ile Kuzey Amerika'yı ayıran boğaz hangisidir?", "image": "Images/bering_bogazi.jpg", "options": ["İstanbul Boğazı", "Cebelitarık", "Bering", "Süveyş"], "answer": "Bering", "coordinates": [65.8491, -168.9691] },
      { "id": 3, "text": "Bu fotoğraftaki 'Machu Picchu' antik kenti hangi ülkededir?", "image": "Images/machu_picchu.jpg", "options": ["Arjantin", "Brezilya", "Peru", "Şili"], "answer": "Peru", "coordinates": [-13.1631, -72.5450] },
      { "id": 4, "text": "Hangi ülke hem Asya hem de Avrupa kıtasında toprağa sahiptir?", "image": null, "options": ["Rusya", "Almanya", "Çin", "İran"], "answer": "Rusya", "coordinates": [61.5240, 105.3188] },
      { "id": 5, "text": "0° Enlem ve 0° Boylam'ın kesiştiği nokta ('Null Island') hangi körfezdedir?", "image": null, "options": ["Meksika Körfezi", "Basra Körfezi", "Gine Körfezi", "Bengal Körfezi"], "answer": "Gine Körfezi", "coordinates": [0, 0] }
    ]
  },
  {
    "level": 4, // UZAY
    "questions": [
      { "id": 1, "text": "Dünyanın bilinen en derin noktası neresidir?", "image": null, "options": ["Büyük Kanyon", "Mariana Çukuru", "Everest", "Lut Gölü"], "answer": "Mariana Çukuru", "coordinates": [11.2156, 142.1529] },
      { "id": 2, "text": "GPS uydularının bulunduğu yörünge sınıfı hangisidir?", "image": null, "options": ["LEO", "MEO (Orta)", "GEO", "HEO"], "answer": "MEO (Orta)", "coordinates": [38.8995, -77.0166] },
      { "id": 3, "text": "Görseldeki dünyanın en kurak çölü hangisidir?", "image": "Images/atacama.jpg", "options": ["Sahra", "Gobi", "Atacama", "Kalahari"], "answer": "Atacama", "coordinates": [-23.8634, -69.1328] },
      { "id": 4, "text": "Fotoğraftaki 'Petra Antik Kenti' hangi ülkededir?", "image": "Images/petra.jpg", "options": ["Ürdün", "Suriye", "Irak", "Lübnan"], "answer": "Ürdün",
        "coordinates": [30.3285, 35.4444] },
      { "id": 5, "text": "Hangi ülke en fazla zaman dilimine (time zone) sahiptir?", "image": null, "options": ["Rusya", "ABD", "Çin", "Fransa"], "answer": "Fransa", "coordinates": [46.2276, 2.2137] }
    ]
  }
];

// --- OYUN DEĞİŞKENLERİ ---
let map;
let currentLevel = 1;
let unlockedLevels = 1;
let score = 0;
let mistakes = 0;
let timerInterval;
let questionsData = [];
let currentQuestionIndex = 0;

// 1. HARİTAYI BAŞLAT
function initMap() {
    if (!map) {
        map = L.map('map').setView([39.9334, 32.8597], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    }
}

// 2. OYUNU BAŞLAT
function startGame(level) {
    // Menüyü kapat, oyunu aç
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    // Harita boyutu bozulmasın diye kısa gecikme ile yenile
    setTimeout(() => {
        initMap();
        map.invalidateSize();
    }, 100);

    // Soruları yükle
    const levelObj = allGameData.find(l => l.level === level);
    questionsData = levelObj ? levelObj.questions : [];

    // Değişkenleri sıfırla
    currentLevel = level;
    score = 0;
    mistakes = 0;
    currentQuestionIndex = 0;

    startTimer();
    loadQuestion(0);
}

// 3. SORU YÜKLEME (Şıkların çıkmama sorunu burada düzeltildi)
function loadQuestion(index) {
    // Sorular bitti mi?
    if (index >= questionsData.length) {
        finishLevel(true);
        return;
    }

    const q = questionsData[index];

    // Metni yaz
    document.getElementById('question-text').innerText = q.text;

    // Görsel var mı?
    const imgEl = document.getElementById('question-image');
    if (q.image) {
        imgEl.src = q.image;
        imgEl.style.display = 'block';
    } else {
        imgEl.style.display = 'none';
    }

    // Şıkları temizle
    const optContainer = document.getElementById('options-container');
    if (!optContainer) return; // Hata önleyici
    optContainer.innerHTML = ''; 

    // Haritayı uçur
    if (map && q.coordinates) {
        map.flyTo(q.coordinates, 6, { duration: 1.5 });
    }

    // Şıkları buton olarak ekle
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, q.answer);
        optContainer.appendChild(btn);
    });
}

// 4. CEVAP KONTROLÜ
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
    } else {
        mistakes++;
        if (mistakes > 2) {
            finishLevel(false);
            return;
        }
    }
    // Sonraki soru
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

// 5. LEVEL SONU
function finishLevel(isSuccess) {
    clearInterval(timerInterval);
    const modal = document.getElementById('level-end-screen');
    const title = document.getElementById('end-title');
    const msg = document.getElementById('end-message');
    
    modal.style.display = 'flex';

    if (isSuccess && score >= 3) {
        title.innerText = "TEBRİKLER!";
        title.style.color = "green";
        msg.innerText = `Level ${currentLevel} tamamlandı! Puan: ${score}/5`;
        
        // Bir sonraki leveli aç
        if (currentLevel < 4) {
            unlockedLevels = Math.max(unlockedLevels, currentLevel + 1);
        }
    } else {
        title.innerText = "BAŞARISIZ!";
        title.style.color = "red";
        msg.innerText = "Yeterli doğru cevap yok veya çok hata yaptın.";
    }
}

// 6. MENÜYE DÖN VE KİLİTLERİ GÜNCELLE
function returnToMenu() {
    document.getElementById('level-end-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('menu-screen').style.display = 'flex';
    
    updateMenuLocks();
}

function updateMenuLocks() {
    for (let i = 2; i <= 4; i++) {
        const btn = document.getElementById(`btn-lvl${i}`);
        if (i <= unlockedLevels) {
            btn.classList.remove('locked');
            btn.classList.add('unlocked');
            btn.onclick = function() { startGame(i); };
        }
    }
}

// 7. SAYAÇ
function startTimer() {
    let timeLeft = 60;
    document.getElementById('timer').innerText = "Süre: " + timeLeft;
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = "Süre: " + timeLeft;
        if (timeLeft <= 0) {
            finishLevel(false);
        }
    }, 1000);
}