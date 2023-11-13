import { useState, useEffect } from "react";
import "./index.scss";

const users = [
  {
    id: 0,
    name: "Patryk",
    surname: "Grochowski",
    login: "patryk1234",
    password: 1234,
    role: "user",
    picture: "aaa",
    active: false,
  },
  {
    id: 1,
    name: "Rafal",
    surname: "Gulewski",
    login: "rafal321",
    password: 4321,
    role: "user",
    picture: "bbb",
    active: true,
  },
];

function App() {
  return <SideBar />;
}

function SideBar() {
  const handleSearch = () => {
    console.log(1);
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
            id={user.id}
            name={user.name}
            surname={user.surname}
            picture={user.picture}
            active={user.active}
          />
        ))}
      </div>
      <div className="logo"></div>
    </div>
  );
}

function Button({ onClick, children, styles }) {
  return (
    <button className={`btn${styles ? `-${styles}` : ""}`}>{children}</button>
  );
}

function User({ id, name, surname, picture, active }) {
  return (
    <div className={`user ${active ? "active" : ""}`}>
      <h5>
        {name} {surname}
      </h5>
    </div>
  );
}
export default App;
