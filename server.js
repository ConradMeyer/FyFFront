// ------ Importar dependencias ------
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
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
  
// CREAR USUARIO
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

// BUSCAR OFERTAS (SCRAPING)
server.get('/search/:keyword', async (req, res) => {

    const html = await axios.get(`https://www.tecnoempleo.com/busqueda-empleo.php?te=${req.params.keyword}&ex=,1,2,&pr=#buscador-ofertas`);
    const $ = await cheerio.load(html.data);

    let resumenes = [];
    let titulos = [];
    let urls = [];

    $('a.text-gray-700.font-weight-bold').each(function () {
        titulos.push($(this).text().trim().replace(/\t|\n/g, ""));
    });

    $('span.d-block.fs--15.hidden-md-down.lead.text-gray-800').each(function () {
        resumenes.push($(this).text().trim().replace(/\t|\n/g, ""))
    });

    $('a.text-gray-700.font-weight-bold').each(function () {
        urls.push($(this).attr("href"));
    });

    const result = resumenes.map((el, i) => {
        const obj = {titulo: titulos[i], resumen: el, url: urls[i]}
        return obj
    })

    res.send(JSON.stringify(result))
})

