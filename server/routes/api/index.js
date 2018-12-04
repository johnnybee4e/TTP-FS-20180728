const express = require('express');
const router = express.Router();

/* users api route */
router.use("/users", require('./users'))
module.exports = router;