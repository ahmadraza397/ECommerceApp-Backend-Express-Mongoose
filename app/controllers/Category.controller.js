const Category = require("../model/Category.model");

// all categories
const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.json({ message: error });
  }
};

//get categories by id
const getCategoriesById = async (req, res) => {
  const category = await Category.findById(req.params.catId);

  if (!category) {
    res
      .status(500)
      .json({ message: "the category with the given ID not found" });
  }
  res.status(200).send({
    status: "200",
    message: "Success",
    data: category,
  });
};

//create categories
const createCategory = async (req, res) => {
  //validation;
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name cannot be empty",
    });
  }
  const checkCategory = await Category.findOne({ name: req.body.name });
  console.log(checkCategory);
  if (checkCategory) {
    res.status(400).send({
      message: "Category already Exist!",
    });
  } else {
    // creating Category
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    // saving category in the database
    category
      .save()
      .then((category) => {
        console.log(category);
        res.status(200).send({
          status: "200",
          message: "Succeed",
          data: category,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error while saving in Database!",
        });
      });
  }
};

//update category with Id
const updateCAtegoryById = async (req, res) => {
  const categoryBeforeUpdate = await Category.find({ _id: req.params.catId });
  //find category and update with req body
  Category.findByIdAndUpdate(
    req.params.catId,
    {
      name: req.body.name || categoryBeforeUpdate.name,
      icon: req.body.icon || categoryBeforeUpdate.icon,
      color: req.body.color || categoryBeforeUpdate.color,
    },
    { new: true }
  )
    .then((category) => {
      if (!category) {
        res.status(404).send({
          message: "Category not found with id" + req.params.catId,
        });
      }
      res.send({
        status: "200",
        message: "Updated!",
        data: category,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Product not found with id " + req.params.catId,
        });
      }
      res.status(505).send({
        message: "Error getting Product with id " + req.params.catId,
      });
    });
};

//delete category by Id
const deleteCategoryById = (req, res) => {
  Category.findByIdAndRemove(req.params.catId)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id" + req.params.catId,
        });
      }
      res.send({
        status: "200",
        message: "Category Deleted!",
        data: category,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Category not found with id " + req.params.catId,
        });
      }
      res.status(505).send({
        message: "Error getting Category with id " + req.params.catId,
      });
    });
};

module.exports = {
  getCategories,
  getCategoriesById,
  createCategory,
  updateCAtegoryById,
  deleteCategoryById,
};
