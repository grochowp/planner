export function UserCard({ user }) {
  return (
    <div className="user-card">
      <h1 className="selected-user-card">
        {user.name} {user.surname}
      </h1>

      <div className="tasks">
        <h6>To do: 3</h6>
        <h6>In progress: 3</h6>
        <h6>Done: 3</h6>
      </div>
    </div>
  );
}
