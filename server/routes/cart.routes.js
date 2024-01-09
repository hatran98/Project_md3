const express = require("express");
const { findCart, AddtoCart, UpdatetoCart, DeleteToCart, OrderBy, SelectBill, UpdateInfo, SelectAll, UpdateHisto, DeleteHisto, Filter } = require("../controllers/cart.controller");
const router = express.Router();

router.post("/", AddtoCart);
router.get('/history', SelectAll)
router.get('/status/:id', Filter)
router.patch('/status/:id', UpdateHisto)
router.delete('/status/:id', DeleteHisto)
router.post("/update", UpdatetoCart);
router.post('/order', OrderBy)
router.get('/history/:id', SelectBill)
router.patch('/history/:id', UpdateInfo)
router.get("/:id", findCart);
router.delete('/:id', DeleteToCart)
module.exports = router
