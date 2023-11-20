import { useState } from "react";
import { UserCard } from "../View/UserCard";
import { TasksList } from "../TasksList";

export function KanbanTree({ activeUser, onSetActiveUser }) {
  const [currentTask, setCurrentTask] = useState(activeUser.tasks[0]);

  return (
    <div className="kanbanTree">
      <UserCard user={activeUser} currentTask={currentTask} />
      <TasksList activeUser={activeUser} onSetActiveUser={onSetActiveUser} />
    </div>
  );
}
