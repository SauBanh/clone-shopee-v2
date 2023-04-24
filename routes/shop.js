const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("shop/home");
});

router.get("/cart", (req, res, next) => {
    res.render("shop/cart");
});

router.get("/product", (req, res, next) => {
    res.render("shop/product-detail");
});

module.exports = router;
