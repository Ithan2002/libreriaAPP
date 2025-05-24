const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta según tu archivo de conexión

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'pagado'),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'pedidos',
  timestamps: true
});

module.exports = Pedido;
