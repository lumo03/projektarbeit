const express = require("express");
const cookieParser = require("cookie-parser");
const { urlencoded } = require("express");
const auth = require("./middleware/authentication");
const loadData = require("./middleware/loadData");

const app = express();

app.use(express.json(), cookieParser, urlencoded({ extended: false }));
//app.use(auth);
//app.use(loadData);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
