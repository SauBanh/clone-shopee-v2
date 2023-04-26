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

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        getProductInCart((cart, totalPrice, totalProducts) => {
            res.render("shop/home", {
                products: products,
                title: "Shopee",
                cart: cart,
                totalPrice: totalPrice,
                totalProducts: totalProducts,
            });
        });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product, products, totalProducts) => {
        getProductInCart((cart, totalPrice, totalProducts) => {
            res.render("shop/product-detail", {
                product: product,
                products: products,
                title: "Product Details",
                cart: cart,
                totalPrice: totalPrice,
                totalProducts: totalProducts,
            });
        });
    });
};

exports.getCart = (req, res, next) => {
    getProductInCart((cart, totalPrice, totalProducts) => {
        res.render("shop/cart", {
            title: "Your Cart",
            cart: cart,
            totalPrice: totalPrice,
            totalProducts: totalProducts,
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product, products) => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect("back");
};

exports.postDeleteCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product, products) => {
        Cart.deleteProduct(productId, product.price);
    });
    res.redirect("back");
};
