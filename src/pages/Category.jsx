import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api("/categories").then((d) => setCategories(d.categories)).catch((e) => setError(e.message));
  }, []);

  return (
    <div className="category-page">
      <h1>Movie Categories</h1>
      <p>Select a category to explore movies.</p>
      {error && <p className="mv-error">{error}</p>}

      <div className="category-grid">
        {categories.map((c) => (
          <div className="category-card" key={c._id} onClick={() => navigate(`/movies?category=${c.slug}`)}>
            {c.name} <small>({c.movieCount})</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
