const { Sequelize } = require('sequelize');
//                               'database', 'username', 'password'
const sequelize = new Sequelize('usuarios_db', 'root', '123456', {
  host: 'localhost',
  port:'3306',
  dialect: 'mysql'
});

module.exports = sequelize;
