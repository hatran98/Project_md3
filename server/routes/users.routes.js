const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth.middleware");
const { findAll, findOne, create, Block } = require('../controllers/users.controllers');


router.get("/", findAll);

router.get("/:id", findOne);

router.post('/', create)

router.patch('/:id', Block)

module.exports = router;
