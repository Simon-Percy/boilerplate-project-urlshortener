require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
const mongoose = require("mongoose");
const dbURI = process.env.DB;
mongoose
  .connect(`${dbURI}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));
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
  const original_url = req.body.url;

  dns.lookup(original_url, async (err, address) => {
    if (err) {
      res.json({ error: "invalid url" });
      return;
    } else {
      const short_url = Math.floor(Math.random() * 3 + 1);
      res.json({ original_url, short_url });
    }
  });
});
app.get(`/api/shorturl/:path`, function (req, res) {
  res.redirect(original_url);
});
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
