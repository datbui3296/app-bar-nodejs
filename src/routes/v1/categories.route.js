const express = require("express");
const CategoryController = require("../../controllers/categories.controller");
const CategoryValidation = require("../../validations/categories.validation");
const CategoryServive = require("../../services/categories.service");
// const authMiddleware = require("../../middlewares/auth.middleware");
// const UploadMiddleware = require("/../middlewares/upload.middleware");

const router = express.Router();

router.post("/createCategory",  CategoryController.createCategory);
router.patch("/updateCategory/:id", CategoryController.updateCategory);
router.get("/getCategoryById/:id",  CategoryController.getCategoryById);
router.delete("/deleteCategory/:id",  CategoryController.deleteCategory);
router.get("/Categories/:page/:pageSize", CategoryController.getCategories);


module.exports = router;