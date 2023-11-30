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

  const [testValue, setTestValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/test"); // Dodaj pełny adres URL serwera
        const testValue = response.data.test;
        setTestValue(testValue);
        console.log('Wartość zmiennej "test" z backendu:', testValue);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchData();
  }, []);

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
