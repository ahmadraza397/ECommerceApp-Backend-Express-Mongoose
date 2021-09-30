const mongoose = require("mongoose");
const Category = require("../model/Category.model");
const Product = require("../model/Product.model");

//Home Route
const homeRoute = (req, res) => {
  res.send("Home Route");
};

//Create and save a new Product

const create = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).send({ message: "Invaid Category" });
  }
  //validation;
  if (!req.body.title) {
    res.status(400).send({
      message: "Product title cannot be empty",
    });
  }
  const checkProd = await Product.findOne({ title: req.body.title });
  console.log(checkProd);
  if (checkProd) {
    res.status(400).send({
      message: "Product already Exist!",
    });
  } else {
    // creating product
    const product = new Product({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image,
      details: req.body.details,
      sale: req.body.sale,
    });
    // saving products in the database
    product
      .save()
      .then((product) => {
        console.log(product);
        res.status(200).send({
          status: "200",
          message: "Succeed",
          data: product,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error while saving in Database!",
        });
      });
  }
};

// get all products
const findAll = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};

// Get Single Product with _id
const findOne = (req, res) => {
  Product.findById(req.params.productId)
    .populate("category")
    .then((product) => {
      if (!product) {
        res.status(404).send({
          message: "Product not found with id" + req.params.productId,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.status(505).send({
        message: "Error getting Product with id " + req.params.productId,
      });
    });
};
// Update Product with _id
const update = async (req, res) => {
  const prodBeforeUpdate = await Product.find({ _id: req.params.productId });
  //find product and update with req body
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      title: req.body.title || prodBeforeUpdate.title,
      category: req.body.category || prodBeforeUpdate.category,
      price: req.body.price || prodBeforeUpdate.price,
      image: req.body.image || prodBeforeUpdate.image,
      details: req.body.details || prodBeforeUpdate.details,
      sale: req.body.sale || prodBeforeUpdate.sale,
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        res.status(404).send({
          message: "Product not found with id" + req.params.productId,
        });
      }
      res.send({
        status: "200",
        message: "Updated!",
        data: product,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.status(505).send({
        message: "Error getting Product with id " + req.params.productId,
      });
    });
};
// Delete a Product with _id

const deleteProduct = async (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productId,
        });
      }
      res.send({
        status: "200",
        message: "Product Deleted!",
        data: product,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.status(505).send({
        message: "Error getting Product with id " + req.params.productId,
      });
    });
};

//count products
const countProducts = async (req, res) => {
  const productCount = await Product.countDocuments();
  if (!productCount) {
    res.status(500).json({ message: "No Product Available!" });
  }
  res.status(200).send({
    status: "200",
    message: "Available Products",
    productCount: productCount,
  });
};

//featured products
const getfeaturedProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);
  if (!products) {
    res.status(500).json({ message: "Not Found" });
  }
  res.status(200).send({
    status: "200",
    message: "Succeed",
    data: products,
  });
};

module.exports = {
  homeRoute,
  create,
  findAll,
  findOne,
  update,
  deleteProduct,
  countProducts,
  getfeaturedProducts,
};
