const {
  getTopics,
  getArticlesById,
  getUsers,
  updateVote,
} = require("../models/news");

exports.readTopics = (req, res) => {
  getTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.readArticlesById = (req, res, next) => {
  const { article_Id } = req.params;

  getArticlesById(article_Id)
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

exports.readArticleUpdate = (req, res) => {
  console.log("in controller");
  const { article_Id } = req.params;
  const { inc_votes } = req.body;
  console.log(req.body);
  updateVote(inc_votes, article_Id).then((article) => {
    res.status(200).send({ article });
  });
};
