const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

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
  const { login, password } = req.body;

  const sql = `
    SELECT users.*, tasks.*
    FROM users
    LEFT JOIN tasks ON users.userID = tasks.userID
    WHERE users.login = ? AND users.password = ?
  `;

  connection.query(sql, [login, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    // Jeśli użytkownik istnieje w bazie danych
    if (results.length > 0) {
      const combinedUser = results.reduce(
        (acc, result) => {
          const tasks = {
            taskID: result.TaskID,
            taskIndex: result.TaskIndex,
            taskName: result.TaskName,
            ToDo: JSON.parse(result.ToDo),
            InProgress: JSON.parse(result.InProgress),
            Done: JSON.parse(result.Done),
          };
          acc.tasks.push(tasks);
          if (acc.UserID === undefined) {
            acc.userID = result.UserID;
            acc.name = result.Name;
            acc.surname = result.Surname;
            acc.login = result.Login;
            acc.password = result.Password;
          }

          return acc;
        },
        { tasks: [] }
      );

      res.json({ message: "Login successful", user: combinedUser });
    } else {
      res.status(401).json({ message: "Invalid login credentials" });
    }
  });
});

// Nawiązanie połączenia
