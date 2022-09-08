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
  it("/api/articles/:article_id", () => {
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

        expect(articleObj[0]).toEqual(article_3);
      });
  });
  it("/api/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/1000")
      .expect(404)
      .then((res) => {
        const msg = res.body.err;
        expect(msg).toBe("Article id not found");
      });
  });

  it("/api/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/cat")
      .expect(400)
      .then((res) => {
        const msg = res.body.err;

        expect(msg).toBe("Not an Article ID. Please enter numeric value.");
      });
  });
});
