import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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

      </nav>

      <div className="nav-right">

        <button className="search-btn">
          🔍
        </button>

         <Link to="/login" className="login-btn">
           Login
          </Link>

      </div>

    </header>
  );
}

export default Navbar;