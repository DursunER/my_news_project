const { getTopics } = require("../models/news");

exports.readTopics = (req, res) => {
  getTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });
};
