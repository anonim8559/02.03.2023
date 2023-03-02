const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testowa maciej",
});

con.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Połaczono!");
});

app.get("/", function (req, res) {
  res.send("ok");
});

app.get("/select", function (req, res) {
  const sql = "SELECT * FROM super";
  con.query(sql, function (err, result, fields) {
    if (err) console.log(err);
    console.log(fields);
    res.send(result);
  });
});

app.get("/add/:imie/:nazwisko/:klasa", function (req, res) {
  const imie = req.params.imie;
  const nazwisko = req.params.nazwisko;
  const klasa = req.params.klasa;

  const sql = `INSERT INTO super (imie,nazwisko,klasa) VALUES ('${imie}','${nazwisko}','${klasa}')`;

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send("nie dodano");
    } else res.send("dodano");
  });
});

app.listen(3001);
