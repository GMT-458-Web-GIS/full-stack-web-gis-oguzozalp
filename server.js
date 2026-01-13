const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Statik dosyaları (HTML, CSS, JS) 'public' klasöründen sun
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa rotası
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});