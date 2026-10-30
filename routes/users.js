const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users.js");
const auth = require("../middlewares/auth.js");

router.get("/me", auth, getCurrentUser);

module.exports = router;
