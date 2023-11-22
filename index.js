require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.db);

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
  const original_url = req.body.url;

  dns.lookup(original_url, (error, address) => {
    const err = error;
    //console.log(address, err);
    if (err) {
      res.json({ error: "invalid url" });
      return;
    }
  });
  res.json({ original_url });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
