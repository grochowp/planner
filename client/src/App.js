import { useState, useEffect } from "react";
import "./index.scss";

const usersTemp = [
  {
    id: 0,
    name: "Patryk",
    surname: "Grochowski",
    login: "patryk1234",
    password: 1234,
    role: "user",
    picture: "aaa",
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

function App() {
  const [activeUser, setActiveUser] = useState({});
  return (
    <div style={{ display: "flex" }}>
      <SideBar activeUser={activeUser} onActiveUser={setActiveUser} />
      {activeUser.name ? <UserCard user={activeUser} /> : ""}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      {console.log(user)}
      <h1 className="selected-user-card">
        {user.name} {user.surname}
      </h1>

      <div className="tasks">
        <h6>To do: 3</h6>
        <h6>In progress: 3</h6>
        <h6>Done: 3</h6>
      </div>
    </div>
  );
}

function SideBar({ activeUser, onActiveUser }) {
  const [users, setUsers] = useState(usersTemp);

  const handleChangeUser = (id) => {
    const updatedUsers = users.map((user) => ({
      ...user,
      active: user.id === id,
    }));
    onActiveUser(updatedUsers.find((user) => user.id === id));
  };

  const handleSearch = () => {
    // TO DO
  };

  return (
    <div className="left-side">
      <div className="search-bar">
        <input placeholder="search..." className="search-bar-input"></input>
        <Button onClick={handleSearch} styles={"search-bar"}>
          Find
        </Button>
      </div>
      <div className="users">
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            active={user.id === activeUser?.id}
            changeUserFunction={handleChangeUser}
          />
        ))}
      </div>
      <div className="logo">Tablica Kanban - Patryk Grochowski</div>
    </div>
  );
}

function User({ user, active, changeUserFunction }) {
  return (
    <div
      onClick={() => changeUserFunction(user.id)}
      className={`user ${active ? "active" : ""}`}
    >
      <h5>
        {user.name} {user.surname}
      </h5>
    </div>
  );
}
function Button({ onClick, children, styles }) {
  return (
    <button className={`btn${styles ? `-${styles}` : ""}`}>{children}</button>
  );
}
export default App;
