import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        NET<span>Movie</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/category">Categories</Link>
        <Link to="/search">Search</Link>
        {user && <Link to="/watchlist">Watchlist</Link>}
      </nav>

      <div className="nav-right">
        <Link to="/search" className="search-btn">🔍</Link>

        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="login-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
