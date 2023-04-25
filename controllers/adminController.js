const Product = require("../models/productModel");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/form-action");
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imageUrl;
    const price = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const type = req.body.type;
    const location = req.body.location;
    const product = new Product(
        null,
        title,
        imgUrl,
        price,
        discount,
        description,
        type,
        location
    );
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/list-products", {
            products: products,
        });
    });
};
