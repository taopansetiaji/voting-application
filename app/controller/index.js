const User = require("./userController");
const Vote = require("./voteController");
const Verified = require("./verifyTokenController");
const Candidate = require("./candidateController");

module.exports = {
  User,
  Verified,
  Vote,
  Candidate,
};
