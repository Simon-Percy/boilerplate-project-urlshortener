require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
const urlparser = require("url");
const { MongoClient } = require("mongodb");
const dbURI = process.env.DB;

const client = new MongoClient(dbURI);
const db = client.db("tutorials");
const urls = db.collection("shorturls");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
app.use(express.urlencoded({ extended: true }));

// Your first API endpoint
app.post("/api/shorturl", function (req, res, next) {
  const short_url = Math.floor(Math.random() * 100);
  const original_url = req.body.url;
  const obj = { original_url, short_url };
  dns.lookup(urlparser.parse(original_url).hostname, (err, address) => {
    if (err) {
      res.json({ error: "Invalid URL" });
    } else {
      urls.insertOne(obj).then((result) => {
        res.json({ original_url, short_url });
        console.log(obj);
      });
    }
  });
});
app.get(`/api/shorturl/:short_url`, async (req, res) => {
  const shorturl = req.params.short_url;
  const short = await urls.findOne({ short_url: +shorturl });
  res.redirect(short.original_url);
});
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
