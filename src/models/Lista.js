const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lista = sequelize.define('listas', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  posicion: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = { Lista };