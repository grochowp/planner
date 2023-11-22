export const UserCard = ({ user, tasks }) => {
  return (
    <div className="user-card">
      <h1 className="selected-user-card">
        {user.name} {user.surname}
      </h1>
      <div className="tasks">
        <h6>To do: {tasks.ToDo.length}</h6>
        <h6>In progress: {tasks.InProgress.length}</h6>
        <h6>Done: {tasks.Done.length}</h6>
      </div>
    </div>
  );
}
