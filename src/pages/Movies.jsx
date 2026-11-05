import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api";
import MovieCard from "../components/MovieCard";
import "./Movies.css";

function Movies() {
  const [params] = useSearchParams();
  const category = params.get("category") || "";
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    const qs = category ? `?category=${encodeURIComponent(category)}&limit=60` : "?limit=60";
    api(`/movies${qs}`)
      .then((d) => { setMovies(d.movies); setStatus("done"); })
      .catch((e) => setStatus(e.message));
  }, [category]);

  return (
    <section className="mv-page">
      <h2>
        {category ? "Movies" : "🔥 All Movies"}
        {category && (
          <span className="mv-chip">
            {category} · <Link to="/movies">clear</Link>
          </span>
        )}
      </h2>

      {status === "loading" && <p className="mv-status">Loading…</p>}
      {status !== "loading" && status !== "done" && <p className="mv-error">{status}</p>}
      {status === "done" && movies.length === 0 && <p className="mv-status">No movies found.</p>}

      <div className="mv-grid">
        {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>
    </section>
  );
}

export default Movies;
