const router = require("express").Router();

const usersRouter = require("./users.js");
const articlesRouter = require("./articles.js");
const { createUser, login } = require("../controllers/users.js");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", usersRouter);
router.use("/articles", articlesRouter);

module.exports = router;
