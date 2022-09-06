const express = require("express");
const { readArticlesById } = require("./controllers/news");

const app = express();

app.get("/api/articles/:article_id", readArticlesById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ err: err.msg });
  }

  res.sendStatus(500);
});

module.exports = app;
