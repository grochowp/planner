import { useState } from "react";
import { UserCard } from "../View/UserCard";
import { TasksList } from "../TasksList";

export function KanbanTree({ activeUser, onSetActiveUser }) {
  const [taskIndex, setTaskIndex] = useState(0);

  return (
    <div className="kanbanTree">
      <UserCard user={activeUser} taskIndex={taskIndex} />
      <TasksList
        activeUser={activeUser}
        onSetActiveUser={onSetActiveUser}
        taskIndex={taskIndex}
        onSetTaskIndex={setTaskIndex}
      />
    </div>
  );
}
