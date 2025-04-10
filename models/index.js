const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importa los modelos
const Libro = require('./libro');
// Asocia modelos si es necesario
// Por ejemplo: Usuario.hasMany(Libro);

const db = {
  Sequelize,
  sequelize,
  Libro,
};

module.exports = db;
