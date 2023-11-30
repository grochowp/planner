import { useContext } from "react";
import { userContext } from "../../../App";

export const UserCard = ({ taskIndex }) => {
  const [activeUser] = useContext(userContext);
  const tasks = activeUser.tasks[taskIndex];
  return (
    <div className="user-card">
      <h1 className="selected-user-card">
        {activeUser.name} {activeUser.surname}
      </h1>
      <div className="tasks">
        <h6>To do: {tasks.ToDo.length}</h6>
        <h6>In progress: {tasks.InProgress.length}</h6>
        <h6>Done: {tasks.Done.length}</h6>
      </div>
    </div>
  );
};
