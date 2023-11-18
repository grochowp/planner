import { useState } from "react";
import { UserCard } from "../UserCard";
import { TasksList } from "../TasksList";

export function KanbanTree({ activeUser, usersTemp }) {
  const [currentTask, setCurrentTask] = useState(activeUser.tasks[0]);
  const [userData, setUserData] = useState(activeUser);

  return (
    <div className="kanbanTree">
      <UserCard user={userData} currentTask={currentTask} />
      <TasksList
        activeUser={activeUser}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        tasks={userData.tasks}
      />
    </div>
  );
}
