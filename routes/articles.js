const router = require("express").Router();

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles.js");

const auth = require("../middlewares/auth.js");

router.use(auth);

router.get("/", getArticles);
router.post("/", createArticle);
router.delete("/:articleId", deleteArticle);

module.exports = router;
