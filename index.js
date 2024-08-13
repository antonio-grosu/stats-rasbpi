const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, I'm API from RaspberryPI");
});
app.listen(8080, () => {
  console.log("Running on port 8080");
});
