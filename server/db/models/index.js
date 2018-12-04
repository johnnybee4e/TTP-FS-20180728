const Portfolio = require("./Portfolio");
const Stock = require("./Stock");
const User = require("./User");

User.belongsToMany(Stock, { through: "portfolio" });
Stock.belongsToMany(User, { through: "portfolio" });

module.exports = { Portfolio, Stock, User };