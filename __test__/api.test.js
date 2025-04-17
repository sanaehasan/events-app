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

xdescribe("/api", () => {
  test("GET:200 status - with a welcom message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).toBe("welcom to my api for events");
      });
  });
});

xdescribe("/any", () => {
  test("GET:404 -return msg endpoint does not exist", () => {
    return request(app)
      .get("/hello")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Endpoint does not exist!");
      });
  });
});
describe("/api/users/:user_id", () => {
  test("GET: 200 status - get a user by id", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });
});
