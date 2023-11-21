export function UserCard({ user, taskIndex }) {
  return (
    <div className="user-card">
      <h1 className="selected-user-card">
        {user.name} {user.surname}
      </h1>
      <div className="tasks">
        <h6>To do: {user.tasks[taskIndex].ToDo.length}</h6>
        <h6>In progress: {user.tasks[taskIndex].InProgress.length}</h6>
        <h6>Done: {user.tasks[taskIndex].Done.length}</h6>
      </div>
    </div>
  );
}
