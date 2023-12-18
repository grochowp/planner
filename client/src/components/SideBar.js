import { userContext } from "../App";
import { useContext } from "react";
import { LoginService } from "../Services/loginService";
import { Link } from "react-router-dom";

export function SideBar() {
  const [, setActiveUser] = useContext(userContext);
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
