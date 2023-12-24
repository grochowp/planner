import { Link } from "react-router-dom";

export function Button({ onClick, onFocus, type, children, styles, route }) {
  return (
    <>
      {route ? (
        <Link to={route}>
          <button className={styles ? `btn-${styles}` : ""} onClick={onClick}>
            <span>{children}</span>
          </button>
        </Link>
      ) : (
        <button
          type={type}
          className={styles ? `btn-${styles}` : ""}
          onClick={onClick}
          onFocus={onFocus}
        >
          <span>{children}</span>
        </button>
      )}
    </>
  );
}

export default Button;
