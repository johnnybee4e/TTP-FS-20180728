const Sequelize = require("sequelize");
const db = require("../db");
const Stock = require("./stock");
const Portfolio = require("./portfolio");
const crypto = require("crypto");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("password");
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("salt");
    }
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 500000,
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

/**
 * instance methods
 */

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

User.prototype.updateBalance = function(cost) {
  if (cost > this.balance) return "Insufficient Funds.";
  this.balance -= cost;
};

User.prototype.updatePortfolio = async function(
  stockName,
  stockSymbol,
  quantity
) {
  try {
    let portfolioToUpdate;

    // find or create a new row on stock table for stock being purchased
    const stock = await Stock.findOrCreate({
      where: { name: stockName, symbol: stockSymbol }
    });

    // using Sequelize instance method to get current portfolio stocks for user
    let userPortfolio = await this.getStocks();

    // if there are no stocks in portfolio, we add current stock
    if (!userPortfolio.length) await this.addStock(stock[0]);

    // use the user's information and the stock that they want to find portfolio line item
    // on portfolio table.
    portfolioToUpdate = await Portfolio.findOne({
      where: {
        userId: this.id,
        stockId: stock[0].id
      }
    });

    // using created portfolio's instance mthod to set/update quantity
    await portfolioToUpdate.updateQuantity(quantity);
    return portfolioToUpdate.quantity;
  } catch (err) {
    console.error(err);
  }
};

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);

User.beforeUpdate(setSaltAndPassword);

module.exports = User;