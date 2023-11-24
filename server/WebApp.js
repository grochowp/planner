const express = require("express");
const cors = require("cors"); // Dodaj import Cors

const app = express();
const port = 3001;

const testValue = 100;

app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ test: testValue });
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

const mysql = require("mysql2");

// Ustawienia połączenia
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "XUg1DwBC",
  database: "planner",
});

// Nawiązanie połączenia
connection.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych:", err);
  } else {
    console.log("Połączono z bazą danych MySQL");
    // Tutaj możesz wykonywać zapytania SQL
  }
});

// Zakończenie połączenia
connection.end();
