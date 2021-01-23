const bcrypt = require("bcryptjs");
const User = require("../models").User;
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv/config");

// Get all user - maybe we need in the future
const getUsers = async (req, res) => {
  const users = await User.findAll({});
  res.status(200).send(users);
};

// Register and validation
const register = async (req, res) => {
  // Register keys
  const schema = Joi.object()
    .keys({
      name: Joi.string().required(true),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(true),
      password: Joi.string().min(8).required(true),
      role: Joi.string().valid("staff", "voter").required(true),
    })
    .options({ abortEarly: false });

  // Checking duplicate user
  const emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send("Email aleady exist!");

  // Salting and Hasing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  try {
    // Register validation
    const { error } = await schema.validateAsync(req.body, (schema) => {
      if (error) return res.status(400).send(error);
    });

    // Insert to table
    User.create({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password: hashPassword,
    })
      .then(() => res.status(400).send("User created"))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login controller
const login = async (req, res) => {
  // Login keys
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(true),
    password: Joi.string().required(true),
  });

  try {
    // Validation
    const { error } = await schema.validateAsync(req.body, (schema) => {
      if (error) return res.status(400).send(error);
    });

    // Check email exist
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.status(400).send("Email doesn't exist!");

    // Check password match
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Password doesn't match!");

    // Request token
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {};

module.exports = { getUsers, register, login };
