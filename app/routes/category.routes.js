const express = require("express");
const router = express.Router();
const categoryMethods = require("../controllers/Category.controller");

//get all
router.get("/categories", categoryMethods.getCategories);

//get by id
router.get("/categories/:catId", categoryMethods.getCategoriesById);

//create
router.post("/categories", categoryMethods.createCategory);

//update by id
router.put("/categories/:catId", categoryMethods.updateCAtegoryById);

//delete by id
router.delete("/categories/:catId", categoryMethods.deleteCategoryById);

module.exports = router;
