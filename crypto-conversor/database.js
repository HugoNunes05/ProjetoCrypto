const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1910',
    database: 'crypto'
});

module.exports = db;