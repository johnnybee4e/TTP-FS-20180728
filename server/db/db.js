const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/ttp-fs-20180728", {
  logging: false
});

module.exports = db;