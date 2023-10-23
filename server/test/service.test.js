let dataService = require("../src/dataService.js");
const dataServiceTest = JSON.parse(JSON.stringify(dataService));
const app = require("../src/server.js");
const request = require("supertest");

describe("Testing the service endpoints", () => {

  // Refresh the dataset before each test
  beforeEach(() => {
    dataService = JSON.parse(JSON.stringify(dataServiceTest));
  })

  test("GET /service/1/getTicket - should return the ticket number", async () => {
    await request(app)
      .get("/service/1/getTicket")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBe(1);
      });
  });

  test("GET /service/10/getTicket - should return 404 with a message", async () => {
    await request(app)
      .get("/service/10/getTicket")
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("No counter was found with the service id 10");
      });
  });

  test("GET /service/2/getTicket - mutliple counters, should return 200 and ticket number", async () => {
    await request(app)
      .get("/service/2/getTicket")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBe(2);
      });
  });
});
