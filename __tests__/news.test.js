const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");

const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => {
  return db.end();
});

describe("GET", () => {
  test("/api/topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { topics } = response.body;

        expect(Array.isArray(topics)).toBe(true);
        expect(topics.length === 3).toBe(true);

        topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });

  test("/api/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((res) => {
        const article_3 = {
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
        };

        const articleObj = res.body.article;

        expect(articleObj).toEqual(article_3);
      });
  });

  test("/api/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/1000")
      .expect(404)
      .then((res) => {
        const msg = res.body.err;
        expect(msg).toBe("Article id not found");
      });
  });

  test("/api/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/cat")
      .expect(400)
      .then((res) => {
        const msg = res.body.err;

        expect(msg).toBe("Not an Article ID. Please enter numeric value.");
      });
  });

  test("/api/users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const userList = res.body.users;

        expect(userList.length > 0).toBe(true);

        userList.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });

  test("/api/articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articleList = res.body.articles;
        expect(articleList.length > 0).toBe(true);

        articleList.forEach((article) => {
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
        });
      });
  });
});
