const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, flieContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(flieContent));
        }
    });
};

module.exports = class Product {
    constructor(
        id,
        title,
        imgUrl,
        price,
        discount,
        description,
        type,
        location
    ) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.type = type;
        this.location = location;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProducts = products.findIndex(
                    (prod) => prod.id === this.id
                );
                const updatedProducts = [...products];
                updatedProducts[existingProducts] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((p) => p.id === id);
            cb(product, products);
        });
    }
};
