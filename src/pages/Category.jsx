import React from "react";
import "./Category.css";

function Category() {
  const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Animation",
    "Adventure",
    "Crime",
    "Fantasy",
    "Documentary",
  ];

  return (
    <div className="category-page">
      <h1>Movie Categories</h1>
      <p>Select a category to explore movies.</p>

      <div className="category-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;