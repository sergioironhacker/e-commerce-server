const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
dbConnect();

// Middleware para parsear JSON y urlencoded
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Definir rutas
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);





// Middleware para manejar rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} pedro pedro pedro pe 🚀`);
});
