const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

function getProductInCart(cb) {
    Cart.getProducts((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            let totalProducts = 0;
            for (let product of products) {
                const cartProductData = cart.products.find(
                    (prod) => prod.id === product.id
                );
                if (cartProductData) {
                    totalProducts += cartProductData.qty;
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty,
                    });
                }
            }
            cb(cartProducts, cart.totalPrice, totalProducts);
        });
    });
}

exports.getAddProduct = (req, res, next) => {
    getProductInCart((cart, totalPrice, totalProducts) => {
        res.render("admin/form-action", {
            editing: false,
            title: "Page Add Product",
            cart: cart,
            totalPrice: totalPrice,
            totalProducts: totalProducts,
        });
    });
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
        getProductInCart((cart, totalPrice, totalProducts) => {
            res.render("admin/list-products", {
                products: products,
                title: "List Products",
                cart: cart,
                totalPrice: totalPrice,
                totalProducts: totalProducts,
            });
        });
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect("/");
    }
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect("/");
        }
        getProductInCart((cart, totalPrice, totalProducts) => {
            res.render("admin/form-action", {
                product: product,
                title: "Edit Product",
                editing: editMode,
                cart: cart,
                totalPrice: totalPrice,
                totalProducts: totalProducts,
            });
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imgUrl = req.body.imageUrl;
    const price = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const type = req.body.type;
    const location = req.body.location;
    const product = new Product(
        productId,
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

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect("/admin/products");
};
