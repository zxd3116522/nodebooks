const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'z3116522',
    database: 'zxd_db_test',
})


module.exports = db;