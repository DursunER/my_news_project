const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.getTopics = () => {
  return db.query(`SELECT * FROM topics `).then((topics) => {
    return topics.rows;
  });
};

exports.getArticlesById = (id) => {
  if (isNaN(id)) {
    return Promise.reject({
      status: 400,
      msg: "Not an Article ID. Please enter numeric value.",
    });
  }
  return db
    .query(`SELECT * FROM articles WHERE article_Id = $1`, [id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article id not found" });
      }

      return article.rows[0];
    });
};

exports.getUsers = () => {
  return db.query(`SELECT * FROM users `).then((users) => {
    return users.rows;
  });
};

exports.updateVote = (inc_votes, article_Id) => {
  console.log("in model");
  return db
    .query(
      `UPDATE articles
    SET votes = votes + $1 
    WHERE article_Id = $2 RETURNING *;`,
      [inc_votes, article_Id]
    )
    .then((article) => {
      return article.rows[0];
    });
};
