import { userContext } from "../App";
import { useContext, useState } from "react";
import { LoginService } from "../Services/loginService";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faClipboard,
  faGear,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

export function SideBar() {
  const [, setActiveUser] = useContext(userContext);
  const [isHovered, setIsHovered] = useState(false);

  const location = useLocation();

  const handleLogout = () => {
    const noUser = LoginService.logout();
    setActiveUser(noUser);
  };

  return (
    <div className="left-side">
      <div className="left-side-top">
        <div className="image-logo"></div>
        <div className="left-bar-icon">
          <Link to={"/selection"}>
            <FontAwesomeIcon
              icon={faClipboard}
              style={{
                color: `${
                  location.pathname === "/selection" ? "#f7f7f7" : "#828282"
                }`,
              }}
            />
          </Link>
        </div>

        <div className="left-bar-icon">
          <Link to={"/kanban"}>
            <FontAwesomeIcon
              icon={faListCheck}
              style={{
                color: `${
                  location.pathname === "/kanban" ? "#f7f7f7" : "#828282"
                }`,
              }}
            />
          </Link>
        </div>

        {/* <div className="left-bar-icon ">
          <FontAwesomeIcon
            icon={faGear}
            style={{
              color: `${
                location.pathname === "/options" ? "#f7f7f7" : "#828282"
              }`,
            }}
          />
        </div> */}
      </div>
      <div
        className={`image-logout left-bar-icon ${isHovered ? "hovered" : ""}`}
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          style={{
            color: isHovered ? "#f7f7f7" : "#828282",
          }}
        />
      </div>
    </div>
  );
}

export default SideBar;
