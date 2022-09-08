const express = require("express");
const {
  readTopics,
  readArticlesById,
  readUsers,
} = require("./controllers/news");

const app = express();
console;
app.get("/api/topics", readTopics);
app.get("/api/articles/:article_id", readArticlesById);
app.get("/api/users", readUsers);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err.status && err.msg) {
    res.status(err.status).send({ err: err.msg });
  }

  res.sendStatus(500);
});

module.exports = app;
