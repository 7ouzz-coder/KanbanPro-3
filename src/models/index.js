const { sequelize } = require('../config/db');
const { Usuario } = require('./Usuario');
const { Tablero } = require('./Tablero');
const { Lista }   = require('./Lista');
const { Tarjeta } = require('./Tarjeta');

// Relaciones uno a muchos
Usuario.hasMany(Tablero, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Tablero.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Tablero.hasMany(Lista, { foreignKey: 'tableroId', onDelete: 'CASCADE' });
Lista.belongsTo(Tablero, { foreignKey: 'tableroId' });

Lista.hasMany(Tarjeta, { foreignKey: 'listaId', onDelete: 'CASCADE' });
Tarjeta.belongsTo(Lista, { foreignKey: 'listaId' });

module.exports = { sequelize, Usuario, Tablero, Lista, Tarjeta };