const express = require("express");
const router = express.Router();

const {
  findAll,
  findOne,
  Create,
  Update,
  Delete,
} = require("../controllers/product.controller");

router.get("/", findAll);

router.get("/:id", findOne);

router.post("/", Create);

router.patch("/:id", Update);

router.delete("/:id", Delete);

module.exports = router;
