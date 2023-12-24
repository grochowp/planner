import React, { useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { taskContext } from "../../../App";
import { userService } from "../../../Services/userService";

export const AddUserForm = ({ showAddUser, onHandleAddUser }) => {
  const [activeTask] = useContext(taskContext);

  const usersToDisplay = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTask) {
          for (const userID of activeTask.usersIDs) {
            const user = await userService.findUser(userID);
            usersToDisplay.push(user.user);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [activeTask]);

  const handle = () => {
    console.log(usersToDisplay);
  };

  return (
    <CSSTransition
      in={showAddUser}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="add-task-form">
        <CSSTransition
          in={showAddUser}
          timeout={500}
          classNames="form"
          unmountOnExit
        >
          <div className="form">
            <form>
              <div className="task-card-data add-task-top">
                <p onClick={handle} className="add-task-name">
                  Add a new user
                </p>
                <p
                  className="add-task-close"
                  onClick={() => {
                    onHandleAddUser(false);
                  }}
                >
                  x
                </p>
              </div>
              <div className="main-task-container"></div>
            </form>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
