const express = require("express");
const { findCart, AddtoCart, UpdatetoCart, DeleteToCart } = require("../controllers/favourites.controller");
const router = express.Router();

router.get('/:id', findCart)
router.post('/', AddtoCart)
router.post("/update", UpdatetoCart);
router.delete('/:id', DeleteToCart)
module.exports = router
