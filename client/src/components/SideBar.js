import { userContext } from "../App";
import { useContext } from "react";
import { LoginService } from "../Services/loginService";
import { Link } from "react-router-dom";

const apps = [
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

export function SideBar() {
  const [, setActiveUser] = useContext(userContext);
  console.log(setActiveUser);
  const handleLogout = () => {
    const noUser = LoginService.logout();
    setActiveUser(noUser);
  };

  return (
    <div className="left-side">
      <div className="left-side-top">
        <div className="image-logo"></div>
        <Link to={"/selection"}>
          <div className="image-tasks"></div>
        </Link>
        <Link to={"/kanban"}>
          <div className="image-active-task"></div>
        </Link>
        <div className="image-options"></div>
      </div>
      <div
        className="left-side-bottom image-logout"
        onClick={handleLogout}
      ></div>
    </div>
  );
}

export default SideBar;
