import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { token, watchlistIds } = useAuth();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    api("/watchlist", { token }).then((d) => setMovies(d.movies)).catch((e) => setError(e.message));
  }, [token, watchlistIds]);

  if (!token)
    return <section className="mv-page"><p>Please <Link to="/login">log in</Link> to see your watchlist.</p></section>;

  return (
    <section className="mv-page">
      <h2>My Watchlist</h2>
      {error && <p className="mv-error">{error}</p>}
      {!error && movies.length === 0 && <p className="mv-status">Nothing saved yet.</p>}
      <div className="mv-grid">
        {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>
    </section>
  );
}

export default Watchlist;
