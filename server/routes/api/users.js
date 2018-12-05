const router = require("express").Router();
const { User, Ledger, Portfolio } = require("../../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/ledger", async (req, res, next) => {
  const { userId } = req.params;

  if (req.user.id !== Number(userId)) {
    res.status(403).send("Forbidden");
  } else {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: [{ model: Ledger }]
      });
      const { ledgers } = user;
      res.status(200).send(ledgers);
    } catch (err) {
      next(err);
    }
  }
});

router.get("/:userId/portfolio", async (req, res, next) => {
  const { userId } = req.params;

  if (req.user.id !== Number(userId)) {
    res.status(403).send("Forbidden");
  } else {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: [{ model: Portfolio }]
      });
      const { portfolio } = user;
      res.status(200).send(portfolio);
    } catch (err) {
      next(err);
    }
  }
});
