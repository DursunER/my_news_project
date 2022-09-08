const { getTopics, getArticlesById, getUsers } = require("../models/news");

exports.readTopics = (req, res) => {
  getTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });
};

exports.readArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  getArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.readUsers = (req, res) => {
  getUsers().then((users) => {
    res.status(200).send({ users });
  });
};
