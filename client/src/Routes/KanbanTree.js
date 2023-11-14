import { useState } from "react";
import { UserCard } from "../UserCard";

export function KanbanTree({ activeUser }) {
  return (
    <div style={{ display: "flex" }}>
      <UserCard user={activeUser} />
    </div>
  );
}
