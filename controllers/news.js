
const { getTopics } = require("../models/news");
const { getArticlesById } = require("../models/news");

exports.readArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  getArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });

exports.readTopics = (req, res) => {
  getTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });

};
