const fs = require("fs");

let data = JSON.parse(fs.readFileSync("./src/data.json", "utf8"));

module.exports = {
  data: data,
};
