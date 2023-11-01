"use strict";
const request = require("supertest");
const app = require("../src/server");

describe("Adding a service into a counter", () => {
  test("Putting an existing service into an existing counter", async () => {
    await request(app)
      .put("/counters/1")
      .send({ services: [1] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(1);
        expect(response.body.services).toContain(1);
      });
  });
  test("Putting an existing service array into an existing counter", async () => {
    await request(app)
      .put("/counters/1")
      .send({ services: [1, 2, 3, 4] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(1);
        expect(response.body.services).toContain(1);
        expect(response.body.services).toContain(2);
        expect(response.body.services).toContain(3);
        expect(response.body.services).toContain(4);
      });
  });
  test("Putting a service that doesn't exist", async () => {
    await request(app)
      .put("/counters/1")
      .send({ services: [40] })
      .expect("Content-Type", /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe(
          "Some of the services you want to add do not exist",
        );
      });
  });
  test("Trying to modify a counter that doesn't exist", async () => {
    await request(app)
      .put("/counters/40")
      .send({ services: [1] })
      .expect("Content-Type", /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe(
          "The counter you want to modify does not exist",
        );
      });
  });
  test("Putting the same service into the same counter multiple times gives no duplication", async () => {
    await request(app)
      .put("/counters/2")
      .send({ services: [1] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(2);
        expect(response.body.services).toContain(1);
        expect(response.body.services).toHaveLength(1);
      });
    await request(app)
      .put("/counters/2")
      .send({ services: [1] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(2);
        expect(response.body.services).toContain(1);
        expect(response.body.services).toHaveLength(1);
      });
  });
  // todo: if there are clients being served the service insertion should not work
  test("The counter has some clients in it", async () => {
    request(app)
      .get("/service/4/getTicket")
      .expect(200)
      .then((response) => {
        request(app)
          .get("/counter/retCounters")
          .expect(200)
          .then((response) => {
            let counter_with_clients = response.body.data.find(
              (counter) => counter.clients.length !== 0
            );
            request(app)
              .put(`/counters/${counter_with_clients.id}`)
              .send({ services: [5] })
              .expect(403)
              .then((response) => {
                expect(response.text).toBe(
                  "You cannot modify the counter, because it has clients in its queue!",
                );
              });
          });
      });
  });
});

describe("Removing a service from a counter", () => {
  test("Removing an existing service from an existing counter", async () => {
    // add service 1 into counter 2
    await request(app).put("/counters/2").send({ service: 1 });
    // remove service 1 from counter 2
    await request(app)
      .delete("/counters/2/services/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({});
      });
  });
  test("Removing a non existent service", async () => {
    await request(app)
      .delete("/counters/2/services/18")
      .expect("Content-Type", /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe(
          "The service you want to remove does not exist",
        );
      });
  });
  test("Removing from a non existent counter", async () => {
    await request(app)
      .delete("/counters/8/services/1")
      .expect("Content-Type", /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe(
          "The counter you want to modify does not exist",
        );
      });
  });
  test("Trying to remove a service that exists, but is not into the counter", async () => {
    // add service 1 into counter 2
    await request(app).put("/counters/2").send({ service: 1 });
    // remove service 1 from counter 2
    await request(app).delete("/counters/2/services/1");
    // remove again service 1 from counter 2
    await request(app)
      .delete("/counters/2/services/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({});
      });
  });
});

describe("Get the queues current number", () => {
  // todo: needs the functions to add clients to the queues to test these
  test("Get the currently served client", async () => {
    // todo: add a client (new ticket api), get the currently served client and see if it is the previously added client
    await request(app)
      .get("/service/4/getTicket")
      .expect(200)
      .then((response) => {
        const id = response.body;
        request(app)
          .get("/counter/retCounters")
          .expect(200)
          .then((response) => {
            let counter_with_clients = response.body.data.find(
              (counter) => counter.clients.length !== 0,
            );
            request(app)
              .get(`/counters/${counter_with_clients.id}/served-client`)
              .expect(200)
              .then((response) => {
                expect(response.body).toBe(id);
              });
          });
      });
  });
  test("Queue with no client currently being served", async () => {
    await request(app)
      .get("/counters/1/served-client")
      .expect("Content-Type", /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe(
          "There is not a client currently served for this counter",
        );
      });
  });
  test("Getting the current ticket from a non existent counter", async () => {
    await request(app)
      .get("/counters/8/served-client")
      .expect("Content-Type", /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe(
          "The counter you want to see does not exist",
        );
      });
  });
});
