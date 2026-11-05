import { useEffect, useState } from "react";
import { api } from "../api";
import MovieCard from "../components/MovieCard";
import "./Search.css";

function Search() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // Debounced server-side search
  useEffect(() => {
    const t = setTimeout(() => {
      api(`/movies?search=${encodeURIComponent(search)}&limit=40`)
        .then((d) => { setMovies(d.movies); setError(""); })
        .catch((e) => setError(e.message));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="search-page">
      <h1>Search Movies</h1>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p className="mv-error">{error}</p>}

      <div className="mv-grid">
        {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>
      {!error && movies.length === 0 && <p className="mv-status">No movies found.</p>}
    </div>
  );
}

export default Search;
