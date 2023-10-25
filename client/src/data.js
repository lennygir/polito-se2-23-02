export const bs_counters = [
  {
    id: 1,
    services: [{ id: 2, name: "Radiologia", color: "info" }],
  },
  {
    id: 2,
    services: [
      { id: 1, name: "Emergenze", color: "error" },
      { id: 3, name: "Maternità", color: "secondary" },
    ],
  },
  {
    id: 3,
    services: [
      { id: 1, name: "Emergenze", color: "error" },
      { id: 2, name: "Radiologia", color: "info" },
      { id: 3, name: "Maternità", color: "secondary" },
    ],
  },
];

export const bs_services = [
  { id: 1, name: "Emergenze", color: "error" },
  { id: 2, name: "Radiologia", color: "info" },
  { id: 3, name: "Maternità", color: "secondary" },
];
