const Sequelize = require("sequelize");
const db = require("../db");

const Portfolio = db.define("portfolio", {
  stockSymbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true
    }
  }
});

Portfolio.prototype.updateQuantity = function(numShares) {
  this.quantity += numShares;
};
module.exports = Portfolio;
