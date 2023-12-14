import { useState, createContext } from "react";
import "./styles/index.scss";
import "./styles/login.scss";
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

export const userContext = createContext();

function App() {
  const [activeUser, setActiveUser] = useState();

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
