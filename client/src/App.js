import { useEffect, useState } from "react";
import "./index.scss";
import { SideBar } from "./View/SideBar";
import { KanbanTree } from "./Routes/KanbanTree";
import { Login } from "./Routes/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TestApp } from "./Routes/TestApp";
import { act } from "react-dom/test-utils";

const usersTemp = [
  {
    id: 0,
    name: "Patryk",
    surname: "Grochowski",
    login: "patryk1234",
    password: 1234,
    role: "user",
    picture: "aaa",
    tasks: [
      {
        taskID: 0,
        task: "school",
        ToDo: ["zaa a aaaaaaa", "bbb"],
        InProgress: ["ccc", "ddd"],
        Done: ["eee", "fff", "ddd"],
      },
      {
        taskID: 1,
        task: "work",
        ToDo: ["kill yourself", "bbb"],
        InProgress: ["masturbate", "ddd"],
        Done: ["precum", "fff"],
      },
    ],
  },
  {
    id: 1,
    name: "Rafal",
    surname: "Gulewski",
    login: "rafal321",
    password: 4321,
    role: "user",
    picture: "bbb",
  },
];

export const apps = [
  {
    id: 0,
    name: "Tablica Kanban",
    route: "/kanban",
  },
  {
    id: 1,
    name: "testApp",
    route: "/test",
  },
];

function App() {
  const [activeUser, setActiveUser] = useState(usersTemp[0]);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {activeUser ? (
          <>
            <SideBar activeUser={activeUser} />
            <Routes>
              <Route
                path="/kanban"
                element={
                  <KanbanTree
                    activeUser={activeUser}
                    onSetActiveUser={setActiveUser}
                  />
                }
              />
              <Route path="/test" element={<TestApp />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login users={usersTemp} onSetUser={setActiveUser} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}
export default App;
