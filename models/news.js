const { promises } = require("graceful-fs");
const db = require("../db/connection");

exports.getArticlesById = (id) => {
  if (isNaN(id)) {
    return Promise.reject({
      status: 400,
      msg: "Not an Article ID. Please enter numeric value.",
    });
  }
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article id not found" });
      }

      return article.rows;
    });
};
