const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Welcome to Bible Wizard!",
  });
});
app.get("/plans", (req, res) => {
  return res.status(200).send(
[
  {
    name: "BIB 101"
  },
  {
    name: "BIB 201"
  }
]

  );
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;