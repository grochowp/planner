import { useState, createContext } from "react";
import "./styles/kanban.scss";
import "./styles/login.scss";
import "./styles/leftSide.scss";
import "./styles/SelectTasks.scss";
import { SideBar } from "./components/SideBar";
import { KanbanTree } from "./Routes/kanban/KanbanTree";
import { Login } from "./Routes/LoginAndRegister/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SelectTask } from "./Routes/SelectTask/SelectTask";

export const userContext = createContext();
export const taskContext = createContext();

function App() {
  const [activeUser, setActiveUser] = useState();
  const [activeTask, setActiveTask] = useState();
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <userContext.Provider value={[activeUser, setActiveUser]}>
          <taskContext.Provider value={[activeTask, setActiveTask]}>
            {activeUser && <SideBar />}
            <Routes>
              <Route
                path="/selection"
                element={activeUser ? <SelectTask /> : <Navigate to={"/"} />}
              />
              <Route
                path="/kanban"
                element={activeUser ? <KanbanTree /> : <Navigate to={"/"} />}
              />

              <Route
                path="/*"
                element={
                  !activeUser ? (
                    <Login onSetUser={setActiveUser} />
                  ) : (
                    <Navigate to={"/selection"} />
                  )
                }
              />
            </Routes>
          </taskContext.Provider>
        </userContext.Provider>
      </div>
    </Router>
  );
}
export default App;
