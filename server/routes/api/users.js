const express = require('express');
const router = express.Router();
const { User } = require('../../db')


/* GET users listing. */
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let user = await User.findByPk(userId)
    res.send(user);  
  } catch (e) {
    res.status(404).send('User not Found');
    console.error(e);
  }
});

module.exports = router;