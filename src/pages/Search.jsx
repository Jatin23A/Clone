import React, { useState } from "react";
import "./Search.css";

function Search() {
  const movieList = [
    "Avengers",
    "Batman",
    "Joker",
    "Interstellar",
    "Inception",
    "Spider-Man",
    "Titanic",
    "Iron Man",
    "Thor",
  ];

  const [search, setSearch] = useState("");

  const filteredMovies = movieList.filter((movie) =>
    movie.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-page">
      <h1>Search Movies</h1>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="search-results">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div className="search-card" key={index}>
              {movie}
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;