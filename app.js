const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const libroRouter = require('./routes/libro');
const authRoutes = require('./routes/auth'); // Asegúrate que este archivo exista

const app = express();

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/libro', libroRouter);
app.use('/auth', authRoutes);

// Manejo de error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores general
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// 🔄 Sincronización con la base de datos
const sequelize = require('./config/database');
require('./models/libro'); // Solo importa el modelo para que Sequelize lo registre

sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

module.exports = app;
