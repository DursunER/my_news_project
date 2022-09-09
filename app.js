const express = require("express");
const {
  readTopics,
  readArticlesById,
  readUsers,
  readArticleUpdate,
} = require("./controllers/news");

const app = express();
app.use(express.json());

app.get("/api/topics", readTopics);
app.get("/api/articles/:article_Id", readArticlesById);
app.get("/api/users", readUsers);
app.patch("/api/articles/:article_Id", readArticleUpdate);

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
