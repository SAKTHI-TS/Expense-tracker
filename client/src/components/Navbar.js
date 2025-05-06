import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setAuth }) => {
  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Expense Tracker</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <button onClick={logout} className="btn btn-logout">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
            <Link to="/register" className="btn btn-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;