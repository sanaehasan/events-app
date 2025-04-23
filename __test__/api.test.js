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
xdescribe("/api/users/:user_id", () => {
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
  test("Delete:204 delete user by id", () => {
    return request(app)
      .delete("/api/users/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toMatchObject({});
      });
  });
  test("Delete:204 delete user by non existant id", () => {
    return request(app)
      .delete("/api/users/50")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});
xdescribe("/api/users", () => {
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
  test("POST: 201 status when adding a user", () => {
    const newUser = {
      username: "sworks9",
      name: "Shauna Works",
      email: "sworks9@wsj.com",
      avatar: "https://robohash.org/nequesedquam.png?size=50x50&set=set1",
      role: "user",
      city: "Wirral",
      country: "United Kingdom",
      password: "kkk",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          user_id: 11,
          username: "sworks9",
          name: "Shauna Works",
          email: "sworks9@wsj.com",
          avatar: "https://robohash.org/nequesedquam.png?size=50x50&set=set1",
          role: "user",
          city: "Wirral",
          country: "United Kingdom",
        });
      });
  });
  test("patch: 200 status when updating a user", () => {
    const newUser = {
      user_id: 4,
      username: "sworks9",
      name: "Shauna Works",
      email: "sworks9@wsj.com",
      avatar: "https://robohash.org/nequesedquam.png?size=50x50&set=set1",
      role: "user",
      city: "Wirral",
      country: "United Kingdom",
      password: "kkk",
    };
    return request(app)
      .patch("/api/users")
      .send(newUser)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          user_id: 4,
          username: "sworks9",
          name: "Shauna Works",
          email: "sworks9@wsj.com",
          avatar: "https://robohash.org/nequesedquam.png?size=50x50&set=set1",
          role: "user",
          city: "Wirral",
          country: "United Kingdom",
        });
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
  test("GET: 200 status get  events by user_id", () => {
    return request(app)
      .get("/api/events/5")
      .expect(200)
      .then(({ body }) => {
        expect(body.events.length).toBe(10);
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
  test("POST: 201 status when adding en event", () => {
    const newEvent = {
      createdBy: 8,
      start_date: "27-09-2026",
      end_date: "22-11-2026",
      city: "Langley",
      country: "United Kingdom",
      image: "http://dummyimage.com/174x100.png/ff4444/ffffff",
      price: 423.69,
      title:
        "suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean",
      description:
        "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
      location: "4377 Little Fleur Terrace",
      genre_id: 7,
    };
    return request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(201)
      .then(({ body }) => {
        expect(body.event).toMatchObject({
          event_id: 11,
          createdby: 8,
          start_date: "27-09-2026",
          end_date: "22-11-2026",
          city: "Langley",
          country: "United Kingdom",
          image: "http://dummyimage.com/174x100.png/ff4444/ffffff",
          price: "423.69",
          title:
            "suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean",
          description:
            "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
          location: "4377 Little Fleur Terrace",
          genre_id: 7,
        });
      });
  });
  test("PATCH: 200 status when updating en event", () => {
    const Event = {
      event_id: 4,
      createdBy: 8,
      start_date: "27-09-2026",
      end_date: "22-11-2026",
      city: "Langley",
      country: "United Kingdom",
      image: "http://dummyimage.com/174x100.png/ff4444/ffffff",
      price: 423.69,
      title:
        "suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean",
      description:
        "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
      location: "4377 Little Fleur Terrace",
      genre_id: 7,
    };
    return request(app)
      .patch("/api/events")
      .send(Event)
      .expect(200)
      .then(({ body }) => {
        expect(body.event).toMatchObject({
          event_id: 4,
          createdby: 8,
          start_date: "27-09-2026",
          end_date: "22-11-2026",
          city: "Langley",
          country: "United Kingdom",
          image: "http://dummyimage.com/174x100.png/ff4444/ffffff",
          price: "423.69",
          title:
            "suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean",
          description:
            "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
          location: "4377 Little Fleur Terrace",
          genre_id: 7,
        });
      });
  });
  test("Delete:204 delete event by id", () => {
    return request(app)
      .delete("/api/events/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toMatchObject({});
      });
  });
  test("Delete:204 delete event by non existant id", () => {
    return request(app)
      .delete("/api/events/50")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
});

xdescribe("/api/genre", () => {
  test("GET:200 status - get all genre entrees", () => {
    return request(app)
      .get("/api/genre")
      .expect(200)
      .then(({ body }) => {
        expect(body.genre.length).toBe(7);
        expect(body.genre[0]).toMatchObject({
          genre_id: 1,
          genre_name: "music",
        });
      });
  });
});
describe("/api/attendees", () => {
  test("POST:201 post an attendee for an event", () => {
    const newAttendee = { user_id: 2, event_id: 7 };
    return request(app)
      .post("/api/attendees")
      .send(newAttendee)
      .then(({ body }) => {
        expect(body.attendee).toMatchObject({
          attendee_id: 101,
          user_id: 2,
          event_id: 7,
        });
      });
  });
  test("Delete:204 delete attendee by id", () => {
    return request(app)
      .delete("/api/attendees/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toMatchObject({});
      });
  });
  test("Delete:204 delete attendee by non existant id", () => {
    return request(app)
      .delete("/api/attendees/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Attendee not found");
      });
  });
});
