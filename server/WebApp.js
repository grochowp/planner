const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const handleLogin = require("./LoginPage/Login"); // Importuj moduł

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ustawienia połączenia
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "XUg1DwBC",
  database: "planner",
});

app.get("/", (req, res) => {
  res.json("from backend side");
  // res.status(200).send("<h1>hi</h1>");
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

app.post("/login", (req, res) => {
  // Wywołaj funkcję obsługującą logowanie z modułu
  try {
    handleLogin(req, res, connection);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
