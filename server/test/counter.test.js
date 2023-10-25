const dataService = require("../src/dataService.js");
const app = require("../src/server.js");
const request = require("supertest");

beforeEach(() => {
  dataService.data.counters = [
    {
      id: 1,
      services: [2],
      clients: [],
      servedClient: null
    },
    {
      id: 2,
      services: [],
      clients: [],
      servedClient: null
    },
    {
      id: 3,
      services: [1, 3],
      clients: [],
      servedClient: null
    }
  ];
});

describe("Testing the counter endpoints", () => {
  test("GET /counter/1/callNextClient - should return the ticket number", async () => {
    dataService.data.counters.find((c) => c.id === 1).clients.push(1);
    await request(app)
      .get("/counter/1/callNextClient")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBe(1);
      });
  });

  test("GET /counter/2/callNextClient - should return 204 and no data", async () => {
    await request(app)
      .get("/counter/2/callNextClient")
      .expect(204)
      .then((response) => {
        expect(response.body).toStrictEqual({});
      });
  });

  test("GET /counter/10/callNextClient - should return 404 with a message", async () => {
    await request(app)
      .get("/counter/10/callNextClient")
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Counter 10 not found");
      });
  });

  //test of get counters
  test("GET /counter/retCounters - should return 404 with a message", async () => {
    dataService.data.counters.splice(0, dataService.data.counters.length);

    await request(app)
      .get("/counter/retCounters")
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("No counters is found");
      });
  });

  test("GET /counter/retCounters - should return the list of counters", async () => {
    await request(app)
      .get("/counter/retCounters")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual([
          {
            "id": 1,
            "services": [2],
            "clients": [],
            "servedClient": null
          },
          {
            "id": 2,
            "services": [],
            "clients": [],
            "servedClient": null
          },
          {
            "id": 3,
            "services": [1, 3],
            "clients": [],
            "servedClient": null
          }
        ]);
      });
  });

});
