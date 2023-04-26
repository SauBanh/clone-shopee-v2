const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

function getProductInCart(cb) {
    Cart.getProducts((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductData = cart.products.find(
                    (prod) => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty,
                    });
                }
            }
            cb(cartProducts);
        });
    });
}

exports.get404 = (req, res, next) => {
    getProductInCart((cart) => {
        res.status(404).render("404", { title: "Page Not Found", cart: cart });
    });
};
