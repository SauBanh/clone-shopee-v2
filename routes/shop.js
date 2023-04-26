const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete", shopController.postDeleteCart);

router.get("/product/:productId", shopController.getProduct);

module.exports = router;
