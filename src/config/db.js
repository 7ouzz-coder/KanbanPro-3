const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  logging: false,
  pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = { sequelize };