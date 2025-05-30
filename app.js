const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const libroRouter = require('./routes/libro');
const authRoutes = require('./routes/auth');
const carritoRoutes = require('./routes/carrito'); 
const pedidoRoutes = require('./routes/pedido');
const detallePedidoRoutes = require('./routes/detallePedido');
const app = express();
const autenticación = require('./middlewares/autentificación')

//swagger
// Swagger: documentación de la API
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.use('/document', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(autenticación);

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/libro', libroRouter);
app.use('/auth', authRoutes);
app.use('/carrito', carritoRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/api/detalle-pedidos', detallePedidoRoutes);



// Manejo de error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores general
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
res.status(err.status || 500);
res.render('error', {
  title: 'Error',
  message: err.message,
  error: req.app.get('env') === 'development' ? err : {},
});

});



module.exports = app;
