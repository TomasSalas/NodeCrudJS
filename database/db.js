const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bodega'
});

conexion.connect((err) => {
    if(err) {
        console.log(err);
        return
    }
    console.log('CONECTADO');
});

module.exports = conexion;