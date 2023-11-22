import { useState } from 'react';
import './index.scss';
import { SideBar } from './components/SideBar';
import { KanbanTree } from './Routes/kanban/KanbanTree';
import { Login } from './Routes/Login';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { TestApp } from './Routes/test/TestApp';

function App() {
    const [activeUser, setActiveUser] = useState();

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <>
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
                                    <Navigate to={'/'} />
                                )
                            }
                        />
                        <Route
                            path="/test"
                            element={
                                activeUser ? <TestApp /> : <Navigate to={'/'} />
                            }
                        />
                        <Route
                            path="/*"
                            element={
                                !activeUser ? (
                                    <Login onSetUser={setActiveUser} />
                                ) : (
                                    <Navigate to={'/kanban'} />
                                )
                            }
                        />
                    </Routes>
                </>
            </div>
        </Router>
    );
}
export default App;
