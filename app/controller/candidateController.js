const Candidate = require("../models").Candidate;
const Joi = require("joi");

const add = async (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  try {
    const { error } = await schema.validateAsync(req.body, (schema) => {
      if (error) return res.status(400).send(error);
    });

    Candidate.create({
      name: req.body.name,
      staff_id: req.userId,
    });

    res.status(200).send("Candidate added!");
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCandidate = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({});
    res.status(200).send(candidates);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { add, getCandidate };
