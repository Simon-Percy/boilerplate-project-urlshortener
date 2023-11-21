require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
app.use(express.urlencoded({ extended: true }));

// Your first API endpoint
app.post("/api/shorturl", function (req, res) {
  const url = req.body.url;

  res.json({ url });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
