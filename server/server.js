const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // Uygulamanızın çalışacağı port

// CORS ve body-parser middleware'lerini kullan
app.use(cors());
app.use(bodyParser.json());

// Veritabanını aç
const db = new sqlite3.Database('personelDatabase.db', (err) => {
  if (err) {
    console.error('Veritabanı açma hatası: ' + err.message);
  } else {
    console.log('Veritabanı açıldı.');
  }
});

// Tüm personeli getir
app.get('/personel', (req, res) => {
  db.all('SELECT id, ad, soyad, departman, maas FROM Personel', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows); // Her personelin tüm bilgilerini döndürür
    }
  });
});

// Personel ekle
app.post('/personel', (req, res) => {
  const { ad, soyad, departman, maas } = req.body;
  
  // Girilen verilerin kontrolü
  if (!ad || !soyad || !departman || !maas) {
    return res.status(400).send('Tüm alanlar zorunludur.');
  }

  db.run('INSERT INTO Personel (ad, soyad, departman, maas) VALUES (?, ?, ?, ?)', [ad, soyad, departman, maas], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Personel sil
app.delete('/personel/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Personel WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.sendStatus(204); // No Content
    }
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
