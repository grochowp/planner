import React, { useContext } from "react";
import Button from "../../../shared/components/Button";
import { userContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

export const Task = ({ tasks, index }) => {
  const [activeUser, setActiveUser] = useContext(userContext);

  // const moveTask = async (fromList, toList, task) => {
  //   try {
  //     const userAfterMove = await TaskService.move(
  //       task,
  //       fromList,
  //       toList,
  //       activeUser.userID,
  //       taskID
  //     );

  //     setActiveUser(userAfterMove.user);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // const handleDeleteTask = async (task) => {
  //   try {
  //     const userAfterDelete = await TaskService.delete(
  //       task,
  //       listType,
  //       activeUser.userID,
  //       taskID
  //     );
  //     setActiveUser(userAfterDelete.user);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="single-task">
      <div className="single-task-info">
        <h3>{tasks.name}</h3>
        <Button styles="add-single-task">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      {tasks.tasks.map((task) => (
        <div className={`task color-${index}`}>
          <div className="task-left">{task}</div>
          <div className="task-right">
            <div>
              <Button styles="delete-single-task">x</Button>
            </div>
            <div className="task-right-move">
              <Button styles={`move-task ${index === 0 ? "hidden" : ""}`}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
              <Button styles={`move-task ${index === 3 ? "hidden" : ""}`}>
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>

    // <div className="tasks-list-task-container">
    //   <div className="tasks-list-task">
    //     {task}
    //     <div className="btn-in-task">
    //       {listType === TaskState.ToDo.name || (
    //         <Button
    //           styles="none"
    //           onClick={() => {
    //             if (listType === TaskState.InProgress.name) {
    //               moveTask(
    //                 TaskState.InProgress.name,
    //                 TaskState.ToDo.name,
    //                 task
    //               );
    //             } else if (listType === TaskState.Done.name) {
    //               moveTask(
    //                 TaskState.Done.name,
    //                 TaskState.InProgress.name,
    //                 task
    //               );
    //             }
    //           }}
    //         >
    //           <i className="gg-push-chevron-left"></i>
    //         </Button>
    //       )}
    //       <Button styles="none">
    //         <i className="gg-trash" onClick={() => handleDeleteTask(task)}></i>
    //       </Button>
    //       {listType === TaskState.Done.name || (
    //         <Button
    //           styles="none"
    //           onClick={() => {
    //             if (listType === TaskState.ToDo.name) {
    //               moveTask(
    //                 TaskState.ToDo.name,
    //                 TaskState.InProgress.name,
    //                 task
    //               );
    //             } else if (listType === TaskState.InProgress.name) {
    //               moveTask(
    //                 TaskState.InProgress.name,
    //                 TaskState.Done.name,
    //                 task
    //               );
    //             }
    //           }}
    //         >
    //           <i className="gg-push-chevron-right"></i>
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};
