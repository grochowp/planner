const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3001;

const testValue = 100;

app.use(cors());

// Ustawienia połączenia
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "XUg1DwBC",
  database: "planner",
});

app.get("/", (req, res) => {
  res.json("from backend side");
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

// Nawiązanie połączenia
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users, tasks";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
