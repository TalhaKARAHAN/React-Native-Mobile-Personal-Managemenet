const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Veritabanını aç
const db = new sqlite3.Database('../server/personelDatabase.db');

// Departmana göre gruplama
router.get('/group-by-department', (req, res) => {
  db.all(`SELECT departman, COUNT(*) as count, SUM(maas) as totalSalary 
          FROM Personel 
          GROUP BY departman`, [], (err, rows) => {
      if (err) {
          return res.status(500).send(err.message);
      }
      res.json(rows);
  });
});

// Yeni rol ekleme
router.post('/', (req, res) => {
  const { rol, aciklama } = req.body;
  if (!rol) {
      return res.status(400).send('Rol adı zorunludur.');
  }
  db.run('INSERT INTO Roller (rol, aciklama) VALUES (?, ?)', [rol, aciklama], function (err) {
      if (err) {
          res.status(500).send('Rol eklenemedi: ' + err.message);
      } else {
          res.status(201).json({ id: this.lastID });
      }
  });
});

// Rolleri getir
router.get('/', (req, res) => {
  db.all('SELECT * FROM Roller', [], (err, rows) => {
      if (err) {
          res.status(500).send(err.message);
      } else {
          res.json(rows);
      }
  });
});

module.exports = router; // Router'ı dışa aktar
