import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";
import { TasksService } from "./services/TasksService.js";
import { connection } from "./database.js";
//TODO utworzyć service np. UserManagementService
import { handleLogin } from "./LoginPage/Login.js  ";
import { handleRegister } from "./LoginPage/Register.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const tasksService = new TasksService(connection);

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
    res.status(500).json({ message: "Unable to login" });
  }
});

app.post("/register", (req, res) => {
  try {
    handleRegister(req, res, connection);
  } catch (error) {
    res.status(500).json({ message: "Failed to create new account" });
  }
});

app.post("/add", (req, res) => {
  try {
    tasksService.addTaskToMainTask(req, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
});

app.post("/delete", (req, res) => {
  try {
    tasksService.deleteTaskFromMainTask(req, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.post("/move", (req, res) => {
  try {
    tasksService.moveTaskBetweenMainTask(req, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.post("/addMain", (req, res) => {
  try {
    tasksService.addMainTask(req, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.post("/deleteMain", (req, res) => {
  try {
    tasksService.deleteMainTask(req, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.post("/selectTask", (req, res) => {
  try {
    tasksService.selectActiveTask(req, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});
