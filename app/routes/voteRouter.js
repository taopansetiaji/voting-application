const router = require("express").Router();
const { Vote, Verified } = require("../controller");

router.post("/voting", [Verified.auth], Vote.takeVote);
router.get("/", [Verified.auth], Vote.resultVote);

module.exports = router;
