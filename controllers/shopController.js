const Product = require("../models/productModel");

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/home", { products: products });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product, products) => {
        res.render("shop/product-detail", {
            product: product,
            products: products,
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render("shop/cart");
};
