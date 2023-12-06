import { useState, useEffect, createContext } from "react";
import "./index.scss";
import { SideBar } from "./components/SideBar";
import { KanbanTree } from "./Routes/kanban/KanbanTree";
import { Login } from "./Routes/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { TestApp } from "./Routes/test/TestApp";

import axios from "axios";

export const userContext = createContext();

function App() {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    if (activeUser && activeUser.ID) {
      const userID = activeUser.ID;

      fetch(`http://localhost:3000/api/user/${userID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Tutaj możesz zaktualizować stan danych użytkownika w komponencie
        })
        .catch((error) =>
          console.error("Błąd podczas pobierania danych użytkownika:", error)
        );
    }
  }, [activeUser]); // useEffect zostanie uruchomiony przy zmianie wartości activeUsery

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <>
          <userContext.Provider value={[activeUser, setActiveUser]}>
            {activeUser && <SideBar activeUser={activeUser} />}
            <Routes>
              <Route
                path="/kanban"
                element={
                  activeUser ? (
                    <KanbanTree
                      activeUser={activeUser}
                      onSetActiveUser={setActiveUser}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
              <Route
                path="/test"
                element={activeUser ? <TestApp /> : <Navigate to={"/"} />}
              />
              <Route
                path="/*"
                element={
                  !activeUser ? (
                    <Login onSetUser={setActiveUser} />
                  ) : (
                    <Navigate to={"/kanban"} />
                  )
                }
              />
            </Routes>
          </userContext.Provider>
        </>
      </div>
    </Router>
  );
}
export default App;
