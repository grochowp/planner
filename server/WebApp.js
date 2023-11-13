const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

const PORT = process.env.PORT || 1337;

server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
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
