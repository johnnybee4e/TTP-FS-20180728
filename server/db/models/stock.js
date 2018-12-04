const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  symbol: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = Stock;