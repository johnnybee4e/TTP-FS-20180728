const Sequelize = require("sequelize");
const db = require("../db");

const Portfolio = db.define("portfolio", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      isInt: true
    }
  }
});

Portfolio.prototype.updateQuantity = function(quantity) {
  console.log("portfolio quantity", this.quantity, "quantity to add", quantity);
  this.quantity === null
    ? (this.quantity = quantity)
    : (this.quantity += quantity);
};
module.exports = Portfolio;