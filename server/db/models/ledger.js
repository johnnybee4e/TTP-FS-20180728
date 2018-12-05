const Sequelize = require("sequelize");
const db = require("../db");

const Ledger = db.define("ledger", {
  stockSymbol: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  stockPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  total: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue(stockPrice) * this.getDataValue(quantity);
    }
  }
});

module.exports = Ledger;
