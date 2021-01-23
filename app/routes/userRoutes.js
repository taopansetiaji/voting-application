const router = require("express").Router();
const { User } = require("../controller");

router.post("/register", User.register);
router.post("/login", User.login);
router.get("/", User.getUsers);

module.exports = router;
