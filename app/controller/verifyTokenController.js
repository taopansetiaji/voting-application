const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");
const User = require("../models").User;
require("dotenv/config");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied!");

  try {
    jwt.verify(token, process.env.SECRET);
    const decoded = decode(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).send("Invalid token!");
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  if (user.role.toLowerCase() === "staff") {
    next();
  } else {
    res
      .status(400)
      .send("You're not staff, you haven't permit to access this page!");
  }
};
module.exports = { auth, isAdmin };
