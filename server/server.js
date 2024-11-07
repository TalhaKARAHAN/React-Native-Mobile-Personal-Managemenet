const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const personelRoutes = require('../api/personel'); // personel.js dosyası
const rollerRoutes = require('../api/roller'); // roller.js dosyası

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// API yollarını tanımla
app.use('/api/personel', personelRoutes); // 'api/personel' yoluna yönlendirme
app.use('/api/roller', rollerRoutes); // 'api/roller' yoluna yönlendirme

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
