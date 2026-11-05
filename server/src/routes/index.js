import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import * as auth from "../controllers/authController.js";
import * as movie from "../controllers/movieController.js";
import * as category from "../controllers/categoryController.js";
import * as watch from "../controllers/watchlistController.js";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

// Auth
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);
router.get("/auth/me", protect, auth.me);

// Movies (public read, admin write)
router.get("/movies", movie.getMovies);
router.get("/movies/trending", movie.getTrending); // must stay above /movies/:id
router.get("/movies/:id", movie.getMovie);
router.post("/movies", protect, adminOnly, movie.createMovie);
router.put("/movies/:id", protect, adminOnly, movie.updateMovie);
router.delete("/movies/:id", protect, adminOnly, movie.deleteMovie);

// Categories
router.get("/categories", category.getCategories);
router.post("/categories", protect, adminOnly, category.createCategory);
router.delete("/categories/:id", protect, adminOnly, category.deleteCategory);

// Watchlist (logged-in users)
router.get("/watchlist", protect, watch.getWatchlist);
router.post("/watchlist/:movieId", protect, watch.addToWatchlist);
router.delete("/watchlist/:movieId", protect, watch.removeFromWatchlist);

export default router;
