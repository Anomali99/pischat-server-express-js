const { Sequelize } = require("@sequelize/core");
const { MariaDbDialect } = require("@sequelize/mariadb");

const sequelize = new Sequelize({
  dialect: MariaDbDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  showWarnings: true,
  connectTimeout: 1000,
});

module.exports = sequelize;
