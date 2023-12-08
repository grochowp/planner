const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const handleLogin = require("./LoginPage/Login");
const handleRegister = require("./LoginPage/Register");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ustawienia połączenia
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sqldb123",
  database: "planner",
});

app.get("/", (req, res) => {
  res.json("from backend side");
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

app.post("/login", (req, res) => {
  try {
    handleLogin(req, res, connection);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/register", (req, res) => {
  try {
    handleRegister(req, res, connection);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
