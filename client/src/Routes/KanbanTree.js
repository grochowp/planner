import { useState } from "react";
import { UserCard } from "../UserCard";
import { TasksList } from "../Tasks";

export function KanbanTree({ activeUser }) {
  return (
    <div className="kanbanTree">
      <UserCard user={activeUser} />
      <TasksList tasks={activeUser.tasks} />
    </div>
  );
}
