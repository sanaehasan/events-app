const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seed/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("/api", () => {
  test("GET:200 status - with a welcom message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).toBe("welcom to my api for events");
      });
  });
});
