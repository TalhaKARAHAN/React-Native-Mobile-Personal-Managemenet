const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Veritabanını aç
const db = new sqlite3.Database('../server/personelDatabase.db');

// Kullanıcı giriş işlemi
router.post('/login', (req, res) => {
  const { kullanici_adi, sifre } = req.body;

  db.get(`SELECT Kullanıcılar.id, Kullanıcılar.kullanici_adi, Roller.rol FROM Kullanıcılar 
          INNER JOIN Roller ON Kullanıcılar.rol_id = Roller.id 
          WHERE kullanici_adi = ? AND sifre = ?`, [kullanici_adi, sifre], (err, row) => {
    if (err) {
      return res.status(500).send('Sunucu hatası');
    }
    if (row) {
      return res.json({ success: true, rol: row.rol });
    }
    res.status(401).send('Geçersiz kullanıcı adı veya şifre');
  });
});

// Personel ekle
router.post('/', (req, res) => {
  const { ad, soyad, departman, maas, sifre, rol_id } = req.body;

  if (!ad || !soyad || !departman || !sifre || !rol_id) {
    return res.status(400).send('Tüm alanlar zorunludur.');
  }

  const kullanici_adi = `${departman}_${ad.toLowerCase()}${soyad.toLowerCase()}`;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run('INSERT INTO Personel (ad, soyad, departman, maas, rol_id) VALUES (?, ?, ?, ?, ?)', 
      [ad, soyad, departman, maas, rol_id], function (err) {
      if (err) {
        db.run('ROLLBACK');
        return res.status(500).send(err.message);
      }

      const personel_id = this.lastID;

      db.run('INSERT INTO Kullanıcılar (kullanici_adi, sifre, rol_id) VALUES (?, ?, ?)', 
        [kullanici_adi, sifre, rol_id], function (err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).send('Kullanıcı eklenemedi: ' + err.message);
        }

        db.run('COMMIT');
        res.status(201).json({ id: personel_id, kullanici_adi });
      });
    });
  });
});

module.exports = router; // Router'ı dışa aktar