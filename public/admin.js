// --- KULLANICI KONTROLÜ (EN ÜSTE EKLE) ---
const currentUser = JSON.parse(localStorage.getItem('user'));

if (!currentUser || currentUser.role !== 'admin') {
    alert("Buraya giriş yetkiniz yok! Ana sayfaya yönlendiriliyorsunuz.");
    window.location.href = '/'; // Login sayfasına at
}
// -----------------------------------------

// ... (Buradan sonra eski initMap ve diğer kodların devam etsin) ...
let map;
let marker;

// 1. Haritayı Başlat
function initMap() {
    map = L.map('map').setView([39.9334, 32.8597], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Haritaya tıklayınca koordinatları al
    map.on('click', function(e) {
        const lat = e.latlng.lat.toFixed(4);
        const lng = e.latlng.lng.toFixed(4);
        
        document.getElementById('lat').value = lat;
        document.getElementById('lng').value = lng;

        // Tıklanan yere geçici işaret koy
        if (marker) map.removeLayer(marker);
        marker = L.marker([lat, lng]).addTo(map);
    });
}

// 2. Mevcut Soruları Listele (GET)
async function loadQuestions() {
    const res = await fetch('/api/questions');
    const questions = await res.json();
    
    const list = document.getElementById('questionsList');
    list.innerHTML = '';

    questions.forEach(q => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.innerHTML = `
            <strong>Lvl ${q.level}:</strong> ${q.text} <br>
            <small>Cevap: ${q.answer}</small>
            <button class="del-btn" onclick="deleteQuestion('${q._id}')">Sil</button>
        `;
        list.appendChild(item);
        
        // Haritaya da ekle
        L.marker(q.coordinates).addTo(map)
            .bindPopup(`<b>${q.text}</b><br>${q.answer}`);
    });
}

// 3. Yeni Soru Ekle (POST)
document.getElementById('addQuestionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newQuestion = {
        level: parseInt(document.getElementById('level').value),
        text: document.getElementById('text').value,
        options: document.getElementById('options').value.split(',').map(s => s.trim()),
        answer: document.getElementById('answer').value,
        coordinates: [
            parseFloat(document.getElementById('lat').value),
            parseFloat(document.getElementById('lng').value)
        ],
        image: null // Şimdilik görsel yok
    };

    const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
    });

    if (res.ok) {
        alert('Soru eklendi!');
        loadQuestions(); // Listeyi yenile
        document.getElementById('addQuestionForm').reset();
    } else {
        alert('Hata oluştu!');
    }
});

// 4. Soru Sil (DELETE)
async function deleteQuestion(id) {
    if (!confirm('Bu soruyu silmek istediğine emin misin?')) return;

    const res = await fetch(`/api/questions/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        loadQuestions(); // Listeyi yenile
    } else {
        alert('Silinemedi!');
    }
}

// Sayfa açılınca başlat
initMap();
loadQuestions();