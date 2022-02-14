const express = require("express");
const products = express.Router();
const { getAllProducts, getProductById } = require("../sql/db");

/*************************** ROUTES ***************************/

//GET ALL PRODUCTS
products.get("/getAllProducts", (req, res) => {
    console.log("all products data", req.body);
    getAllProducts()
        .then(({ rows }) => {
            console.log("Got all products from table:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("err in getting all products from table", err);
        });
});

//GET PRODUCT BY ID
products.get("/api/product/:id", (req, res) => {
    console.log("selected product on server side", req.body);
    console.log("params for selected product on server side", req.params);
    //const search = req.params.search;
    getProductById(req.params.id)
        .then(({ rows }) => {
            console.log("Got other product by id:", rows);
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("err in getting  product by id", err);
        });
});

/*************************** EXPORT ***************************/

module.exports = products;
