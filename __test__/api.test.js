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
  xtest("GET: 200 status - get a user by id", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          user_id: 1,
          username: "awalbrook0",
          name: "Athene Walbrook",
          email: "awalbrook0@mtv.com",
          avatar:
            "https://robohash.org/repellatquiadeserunt.png?size=50x50&set=set1",
          role: "admin",
          city: "Glasgow",
          country: "United Kingdom",
          password:
            "$2a$12$bV.0cWLFpqg3MTAW/qgAaOqmnvZjPn7dnMAkS77rpLqehtffeIjya",
        });
      });
  });
  test("Get: 404 when called for an id that does not exist in the database", () => {
    return request(app)
      .get("/api/users/90")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});
