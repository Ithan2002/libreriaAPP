const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// Modelos
db.User = require('./User');
db.Libro = require('./libro');
db.Pedido = require('./pedido');
db.DetallePedido = require('./detallePedido');

// Relaciones

// Un usuario puede tener muchos pedidos
db.Pedido.belongsTo(db.User, { foreignKey: 'usuario_id' });
db.User.hasMany(db.Pedido, { foreignKey: 'usuario_id' });

// Un pedido puede tener muchos detalles (libros)
db.DetallePedido.belongsTo(db.Pedido, { foreignKey: 'pedido_id' });
db.Pedido.hasMany(db.DetallePedido, { foreignKey: 'pedido_id' });

// Cada detallePedido apunta a un libro
db.DetallePedido.belongsTo(db.Libro, { foreignKey: 'libro_id' });
db.Libro.hasMany(db.DetallePedido, { foreignKey: 'libro_id' });

// Conexión
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
