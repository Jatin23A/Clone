import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MovieCard({ movie }) {
  const { user, watchlistIds, toggleWatchlist } = useAuth();
  const navigate = useNavigate();
  const saved = watchlistIds.includes(movie._id);

  const onSave = () => (user ? toggleWatchlist(movie._id) : navigate("/login"));

  return (
    <div className="mv-card">
      {movie.posterUrl ? (
        <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
      ) : (
        <div className="mv-noposter">{movie.title}</div>
      )}
      <div className="mv-info">
        <h3>{movie.title}</h3>
        <p>
          {movie.year || "—"} · ⭐ {movie.rating?.toFixed?.(1) ?? "—"}
        </p>
        <button onClick={onSave}>{saved ? "✓ In Watchlist" : "+ Watchlist"}</button>
      </div>
    </div>
  );
}
