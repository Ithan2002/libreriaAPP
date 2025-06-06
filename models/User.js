const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('usertest', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }

});

module.exports = User;

