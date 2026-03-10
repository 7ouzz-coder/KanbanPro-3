const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tablero = sequelize.define('tableros', {
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = { Tablero };