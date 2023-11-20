import { useState } from "react";
import { UserCard } from "../View/UserCard";
import { TasksList } from "../TasksList";

export function KanbanTree({ activeUser, onSetActiveUser }) {
  const [currentTask, setCurrentTask] = useState(activeUser.tasks[0]);
  const [userData, setUserData] = useState(activeUser);

  return (
    <div className="kanbanTree">
      <UserCard
        user={userData}
        currentTask={currentTask}
        setUserData={setUserData}
      />
      <TasksList
        activeUser={activeUser}
        onSetActiveUser={onSetActiveUser}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
      />
    </div>
  );
}
