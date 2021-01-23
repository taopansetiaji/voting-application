const Vote = require("../models").Vote;
const Candidate = require("../models").Candidate;
const Joi = require("joi");

const takeVote = async (req, res) => {
  // Vote keys
  const schema = Joi.object().keys({
    choice: Joi.string().required(true),
  });

  try {
    // Validation voting
    const { error } = await schema.validateAsync(req.body, (schema) => {
      if (error) return res.status(400).send(error);
    });

    // Verify have choosed
    const userChoosing = await Vote.findOne({
      where: { user_id: req.userId.toString() },
    });
    if (userChoosing)
      return res
        .status(200)
        .send("Thank for comming, but you has been choosing!");

    // Checking available candidates
    const candidateExist = await Candidate.findOne({
      where: {
        name: req.body.choice,
      },
    });

    if (candidateExist) {
      // Create vote
      Vote.create({
        choice: req.body.choice,
        user_id: req.userId,
      });
      res.status(200).send("Success choosing candidate!");
    } else {
      res.status(400).send("Candidate is not available");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const resultVote = async (req, res) => {
  try {
    const result = await Vote.findAndCountAll({
      attributes: ["choice"],
      group: ["choice"],
    });
    res.status(200).send(result.count);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { takeVote, resultVote };
