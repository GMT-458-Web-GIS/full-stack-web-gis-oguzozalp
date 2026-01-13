// --- VERİ SETİ (BOŞ OLARAK BAŞLAR, API'DEN GELECEK) ---
let allGameData = [];

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
async function startGame(level) {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    setTimeout(() => {
        initMap();
        map.invalidateSize();
    }, 100);

    // EĞER VERİLER HENÜZ ÇEKİLMEDİYSE API'DEN ÇEK
    if (allGameData.length === 0) {
        try {
            console.log("Veritabanından sorular çekiliyor...");
            const response = await fetch('/api/questions'); // Backend'e istek at
            if (!response.ok) throw new Error("Veri alınamadı");
            allGameData = await response.json();
            console.log("Sorular yüklendi:", allGameData);
        } catch (error) {
            console.error("Hata:", error);
            alert("Veritabanı bağlantı hatası! Lütfen internetinizi kontrol edin.");
            return;
        }
    }

    // Seçilen levele göre soruları filtrele
    const levelObj = allGameData.filter(q => q.level === level);
    questionsData = levelObj; 

    currentLevel = level;
    score = 0;
    mistakes = 0;
    currentQuestionIndex = 0;

    startTimer();
    loadQuestion(0);
}

// 3. SORU YÜKLEME
function loadQuestion(index) {
    if (index >= questionsData.length) {
        finishLevel(true);
        return;
    }

    const q = questionsData[index];

    document.getElementById('question-text').innerText = q.text;

    const imgEl = document.getElementById('question-image');
    if (q.image) {
        imgEl.src = q.image;
        imgEl.style.display = 'block';
    } else {
        imgEl.style.display = 'none';
    }

    const optContainer = document.getElementById('options-container');
    if (!optContainer) return; 
    optContainer.innerHTML = ''; 

    if (map && q.coordinates) {
        map.flyTo(q.coordinates, 6, { duration: 1.5 });
    }

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
        
        if (currentLevel < 4) {
            unlockedLevels = Math.max(unlockedLevels, currentLevel + 1);
        }
    } else {
        title.innerText = "BAŞARISIZ!";
        title.style.color = "red";
        msg.innerText = "Yeterli doğru cevap yok veya çok hata yaptın.";
    }
}

// 6. MENÜYE DÖN
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