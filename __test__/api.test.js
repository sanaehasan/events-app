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

describe("/any", () => {
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
  test("Get: 400 bad request when query id is not a number", () => {
    return request(app)
      .get("/api/users/hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Id should be a number");
      });
  });
});
describe("/api/users", () => {
  test("GET: 200 status  find user by email and password", () => {
    return request(app)
      .get("/api/users?email=awalbrook0@mtv.com&password=hello")
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
      .get("/api/users?email=awalbrook0@mtv.com&password=he")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("email or password is incorrect");
      });
  });
});

describe("/api/events", () => {
  test("GET: 200 status get all events", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        expect(body.events.length).toBe(10);
      });
  });
  test("Get: 200 status when getting events by city", () => {
    return request(app)
      .get("/api/events?city=Stapleford")
      .expect(200)
      .then(({ body }) => {
        expect(body.events[0]).toMatchObject({
          event_id: 1,
          createdby: 1,
          start_date: "11-06-2025",
          end_date: "19-06-2025",
          city: "Stapleford",
          country: "United Kingdom",
          image: "http://dummyimage.com/110x100.png/5fa2dd/ffffff",
          price: "365.75",
          title:
            "ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi",
          description:
            "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
          location: "93211 Claremont Drive",
          genre_id: 7,
          genre_name: "Reggae",
        });
      });
  });
  test("Get: 200 status when getting events by genre", () => {
    return request(app)
      .get("/api/events?genre=Reggae")
      .expect(200)
      .then(({ body }) => {
        expect(body.events[0]).toMatchObject({
          event_id: 1,
          createdby: 1,
          start_date: "11-06-2025",
          end_date: "19-06-2025",
          city: "Stapleford",
          country: "United Kingdom",
          image: "http://dummyimage.com/110x100.png/5fa2dd/ffffff",
          price: "365.75",
          title:
            "ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi",
          description:
            "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
          location: "93211 Claremont Drive",
          genre_id: 7,
          genre_name: "Reggae",
        });
      });
  });
  test("Get: 200 status when getting events by genre and city", () => {
    return request(app)
      .get("/api/events?city=Stapleford&genre=Reggae")
      .expect(200)
      .then(({ body }) => {
        expect(body.events[0]).toMatchObject({
          event_id: 1,
          createdby: 1,
          start_date: "11-06-2025",
          end_date: "19-06-2025",
          city: "Stapleford",
          country: "United Kingdom",
          image: "http://dummyimage.com/110x100.png/5fa2dd/ffffff",
          price: "365.75",
          title:
            "ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi",
          description:
            "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
          location: "93211 Claremont Drive",
          genre_id: 7,
          genre_name: "Reggae",
        });
      });
  });

  test("Get: 404 status when getting events by non existant genre ", () => {
    return request(app)
      .get("/api/events?genre=Reg")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("genre does not exist");
      });
  });
});
