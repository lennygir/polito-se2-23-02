const app = require("../src/server.js");
const request = require("supertest");

describe("Retrieve the list of services", () => {
  test("GET /service - should return the list of services", async () => {
    await request(app)
      .get("/service")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toHaveLength(9);
      });
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
          id: 1,
          name: "Emergenze",
          serviceTime: 20,
          description: "Servizio di pronto soccorso.",
          color: "error",
        },
        {
          id: 2,
          name: "Radiologia",
          serviceTime: 35,
          description: "Servizio di diagnostica per immagini.",
          color: "primary",
        },
        {
          id: 3,
          name: "Maternità",
          serviceTime: 60,
          description: "Reparto dedicato alle nascite.",
          color: "secondary",
        },
        {
          id: 4,
          name: "Oncologia",
          serviceTime: 45,
          description: "Trattamento e assistenza oncologica.",
          color: "default",
        },
        {
          id: 5,
          name: "Pediatria",
          serviceTime: 30,
          description: "Cure mediche per bambini.",
          color: "info",
        },
        {
          id: 6,
          name: "Cardiologia",
          serviceTime: 40,
          description: "Trattamento delle malattie cardiache.",
          color: "error",
        },
        {
          id: 7,
          name: "Ortopedia",
          serviceTime: 50,
          description: "Specializzati nelle patologie muscolo-scheletriche.",
          color: "warning",
        },
        {
          id: 8,
          name: "Oculistica",
          serviceTime: 25,
          description: "Diagnostica e trattamento dei disturbi oculari.",
          color: "success",
        },
        {
          id: 9,
          name: "Neurologia",
          serviceTime: 55,
          description: "Trattamento delle malattie del sistema nervoso.",
          color: "secondary",
        },
      ]);
    });
});
