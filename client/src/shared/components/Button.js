import { Link } from 'react-router-dom';

export function Button({ onClick, children, styles, route }) {
    return (
        <div>
            {route ? (
                <Link to={route}>
                    <button
                        className={styles ? `btn-${styles}` : ''}
                        onClick={onClick}
                    >
                        <span>{children}</span>
                    </button>
                </Link>
            ) : (
                <button
                    className={styles ? `btn-${styles}` : ''}
                    onClick={onClick}
                >
                    <span>{children}</span>
                </button>
            )}
        </div>
    );
}

export default Button;
