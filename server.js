// ------ Importar dependencias ------
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const md5 = require('md5');

// ------ Configuración inicial ------
const server = express();
const listenPort = process.env.PORT || 8080;

// HAY QUE APUNTAR AL FRONT ("/Public")
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Levantar el Servidor
server.listen(listenPort,
    () => console.log(`Server listening on ${listenPort}`)
);

//Conexion a SQL
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'fyf'
});

// VALIDATION
const validarEmail = mail => (/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(mail));
const validarPass = pass => (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass));
  
// Nuevo usuario
server.post('/signup', (req, res) => {

    const USER =  `INSERT INTO users (email, pass) VALUES (${req.body.email}, ${md5(req.body.pass)})`
    
    if (validarEmail(req.body.user) && validarPass(req.body.pass)) {
        connection.connect();
    
        connection.query(USER, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        });
        
        connection.end();
    }
    else {
        res.status(406).json({
            status: 406,
            data: "Email no valido / la contraseña debe contener 8 digitos y como minimo una letra y un numero",
            ok: false
        })
    }

})

// Leer usuarios
server.get('/read', (req, res) => {

    connection.connect();

    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(results);
        }
    });  
    
    connection.end();
})

// Crear usuario
server.post('/create', (req, res) => {

    const newUser = `INSERT INTO users (email, pass) VALUES ('${req.body.email}', '${req.body.pass}')`

    connection.connect();

    connection.query(newUser, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send("Usuario creado");
        }
    });
    
    connection.close();
})