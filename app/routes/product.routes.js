const express = require("express");
const router = express.Router();
const productMethods = require("../controllers/Product.controller");

router.get("/", productMethods.homeRoute);

// Create a new Product
router.post("/products", productMethods.create);

// Get All Products
router.get("/products", productMethods.findAll);

// Get Single Product with _id
router.get("/products/:productId", productMethods.findOne);

// Update Product with _id
router.put("/products/:productId", productMethods.update);

// Delete a Product with _id
router.delete("/products/:productId", productMethods.deleteProduct);

//count products
router.get("/products/get/count", productMethods.countProducts);

//featured products
router.get("/products/get/featured/:count", productMethods.getfeaturedProducts);

module.exports = router;
