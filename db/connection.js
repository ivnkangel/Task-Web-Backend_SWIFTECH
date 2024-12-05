const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal:', err.message);
        process.exit(1);
    }
    console.log('Berhasil terhubung ke database');
});

module.exports = db;
