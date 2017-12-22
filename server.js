const express = require("express");
const request = require("request");
const cors = require("cors");
const http = require("http");
const {API_KEY} = require("./config");
const {CLIENT_ORIGIN} = require("./config");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("./"));

app.use(
  cors({ origin: CLIENT_ORIGIN })
);

app.get("/headlines/:query", (req, res) => {
  let url = `https://finance.yahoo.com/rss/headline?s=${req.params.query}&region=US&lang=en-US`;
  request.get({ url: url, headers: {"content-type": "text/xml"} }).pipe(res);
});

app.get("/data/:query", (req, res) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${req.params.query}&apikey=${API_KEY}`;
  request.get({ url: url, headers: {"content-type": "application/json"} }).pipe(res);
});

app.use("*", function (req, res) {
  return res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });