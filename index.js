const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRouter = require('./routes/authRoute');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
dbConnect();

// Middleware para parsear JSON y urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Definir rutas
app.use('/api/user', authRouter);





// Middleware para manejar rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
