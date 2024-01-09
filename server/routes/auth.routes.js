const express = require("express");
const router = express.Router();
const { isReg } = require('../middlewares/register.middleware')
const { signup, signin } = require("../controllers/auth.controller");

router.post("/register", isReg, signup);

router.post("/login", signin);

module.exports = router;
