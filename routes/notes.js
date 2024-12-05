const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/', (req, res) => {
    const { title, datetime, note } = req.body;
    if (!title || !datetime || !note) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi (title, datetime, note).' });
    }

    const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    db.query(sql, [title, datetime, note], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM notes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (results.length === 0) return res.status(404).send('Note tidak ditemukan');
        res.json(results[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    db.query(sql, [title, datetime, note, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) return res.status(404).send('Note tidak ditemukan');
        res.send('Note berhasil diubah');
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) return res.status(404).send('Note tidak ditemukan');
        res.send('Note berhasil dihapus');
    });
});

module.exports = router;
