const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

// router.get("/products/:productId", adminController.getProducts);

module.exports = router;
