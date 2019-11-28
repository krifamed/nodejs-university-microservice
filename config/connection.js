const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',  
    user: 'root',
    password: '123',
    database: 'administration'
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to database');
});
module.exports = db;