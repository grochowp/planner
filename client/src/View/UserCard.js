export function UserCard({ user, currentTask }) {
  return (
    <div className="user-card">
      <h1 className="selected-user-card">
        {user.name} {user.surname}
      </h1>
      <div className="tasks">
        <h6>To o: {currentTask.ToDo.length}</h6>
        <h6>In progress: {currentTask.InProgress.length}</h6>
        <h6>Done: {currentTask.Done.length}</h6>
      </div>
    </div>
  );
}
