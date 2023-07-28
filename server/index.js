const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan=require('morgan');
const {mongoose}=require('./database');
const app = express();
const { chequearToken } = require('./middlewares/auth')
const port = 3000; // Puerto del servidor
app.set('nombreApp','Aplicacion para manejo de tienda');
app.set('puerto',process.env.PORT|| 3000);


// Middleware para habilitar CORS (permitir todas las solicitudes desde cualquier origen)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Variable para almacenar el último dato recibido
let ultimoDatoHex = '';

app.use('/api/facturas',chequearToken,require('./routes/facturas.routes'))
app.use('/api/productos',require('./routes/productos.routes'))
app.use('/api/registro',chequearToken,require('./routes/server.routes'))
app.use('/api/login',require('./routes/usuarios.routes'))
//app.use('/api/usuarios',require('./routes/usuarios.routes'))

app.listen(app.get('puerto'), ()=>{
    console.log('Nombre de la App',app.get('nombreApp'));
    console.log('Puesto del servidor',app.get('puerto'));
})

app.post('/datohex', (req, res) => {
    const datoHex = req.body.datoHex; // Obtener el valor DatoHex desde el cuerpo de la solicitud
    console.log("Valor recibido del ESP32:", datoHex);

    // Aquí puedes verificar la lógica para obtener el valor DatoHex correctamente

    // Actualizar el valor del último dato recibido
    ultimoDatoHex = datoHex;

    // Configurar el encabezado para permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    // Configurar el tipo de contenido como texto
    res.header('Content-Type', 'text/plain');

    // Enviar el valor DatoHex en la respuesta como un texto simple
    res.send(datoHex);
});

app.get('/ultimoDatoHex', (req, res) => {
    console.log("Valor enviado a Angular:", ultimoDatoHex);
  
    // Configurar el encabezado para permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    // Configurar el tipo de contenido como texto
    res.header('Content-Type', 'text/plain');
  
    // Enviar el valor del último dato recibido en la respuesta
    res.send(ultimoDatoHex);
  });