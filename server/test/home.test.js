"use strict";
const app = require("../src/server.js");
const request = require("supertest");

describe("Testing the home endpoints", () => {
  test("GET /", async () => {
    await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("API home page");
      });
  });
});
