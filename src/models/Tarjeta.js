const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tarjeta = sequelize.define('tarjetas', {
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  etiqueta: {
    type: DataTypes.STRING(50),
    defaultValue: 'Setup',
  },
  posicion: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = { Tarjeta };