const express = require("express");
const ArticleController = require("../../controllers/article.controller");
const ArticleValidation = require("../../validations/article.validation");
const CategoryServive = require("../../services/categories.service");
// const authMiddleware = require("../../middlewares/auth.middleware");
// const UploadMiddleware = require("/../middlewares/upload.middleware");

const router = express.Router();

router.post("/create",  ArticleController.createArticle);
router.patch("/update/:id", ArticleController.updateArticle);
router.get("/getArticles/:id",  ArticleController.getArticleById);
router.delete("/delete/:id",  ArticleController.deleteArticle);
router.get("/articles/:page/:pageSize", ArticleController.getArticles);
router.get("/articles", ArticleController.getAllArticle);
router.get("/getActicleEventOrPreferential/:id", ArticleController.getActicleEventOrPreferential);


module.exports = router;