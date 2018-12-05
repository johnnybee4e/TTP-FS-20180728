const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

const User = db.define("user", {
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
