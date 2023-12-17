import { useState, createContext } from "react";
import "./styles/index.scss";
import "./styles/login.scss";
import "./styles/leftSide.scss";
import "./styles/SelectTasks.scss";
import { SideBar } from "./components/SideBar";
import { KanbanTree } from "./Routes/kanban/KanbanTree";
import { Login } from "./Routes/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SelectTask } from "./Routes/kanban/SelectTask";
import { usersTemp } from "./demoData/users";

export const userContext = createContext();

function App() {
  // const [activeUser, setActiveUser] = useState(usersTemp[0]);
  const [activeUser, setActiveUser] = useState();

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <>
          <userContext.Provider value={[activeUser, setActiveUser]}>
            {activeUser && <SideBar />}
            <Routes>
              <Route
                path="/selection"
                element={
                  activeUser ? (
                    <SelectTask
                      activeUser={activeUser}
                      setActiveUser={setActiveUser}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
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
