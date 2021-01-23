const router = require("express").Router();
const { Verified, Candidate } = require("../controller");

router.post("/add", [Verified.auth, Verified.isAdmin], Candidate.add);
router.get("/", [Verified.auth, Verified.isAdmin], Candidate.getCandidate);

module.exports = router;
