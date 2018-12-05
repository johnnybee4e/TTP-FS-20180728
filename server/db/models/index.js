const Portfolio = require("./portfolio");
const Ledger = require("./ledger");
const User = require("./user");

Portfolio.belongsTo(User);
User.hasMany(Portfolio);

Ledger.belongsTo(User);
User.hasMany(Ledger);

module.exports = { Portfolio, Ledger, User };