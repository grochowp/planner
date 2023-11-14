import { Link } from "react-router-dom";

export function Button({ onClick, children, styles, route }) {
  return (
    <Link to={route}>
      <button className={`btn${styles ? `-${styles}` : ""}`} onClick={onClick}>
        <span>{children}</span>
      </button>
    </Link>
  );
}

export default Button;
