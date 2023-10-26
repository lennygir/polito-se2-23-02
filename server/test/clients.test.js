const app = require("../src/server.js");
const request = require("supertest");

describe("Retrieve the list of services", () => {
    test("GET /service - should return the list of services", async () => {
      await request(app)
        .get("/service")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(3);
        });
    });
    test("GET /service - should return the list of services", async () => {
      await request(app)
        .get("/service")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual([
            {
              "id": 1,
              "name": "Emergenze",
              "serviceTime": 20
            },
            {
              "id": 2,
              "name": "Radiologia",
              "serviceTime": 35
            },
            {
              "id": 3,
              "name": "Maternità",
              "serviceTime": 60
            }
          ]);
        });
    });
});