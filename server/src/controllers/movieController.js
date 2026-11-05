import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import { escapeRegex } from "../utils/token.js";

const SORTS = {
  newest: { createdAt: -1 },
  rating: { rating: -1 },
  year: { year: -1 },
  title: { title: 1 },
};

// GET /api/movies?search=&category=&page=&limit=&sort=
export async function getMovies(req, res) {
  const { search, category, sort = "newest" } = req.query;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);

  const filter = {};
  if (typeof search === "string" && search.trim())
    filter.title = { $regex: escapeRegex(search.trim()), $options: "i" };
  if (typeof category === "string" && category.trim()) filter.genres = category.trim().toLowerCase();

  const [movies, total] = await Promise.all([
    Movie.find(filter)
      .sort(SORTS[sort] || SORTS.newest)
      .skip((page - 1) * limit)
      .limit(limit),
    Movie.countDocuments(filter),
  ]);

  res.json({ movies, page, pages: Math.ceil(total / limit), total });
}

export async function getTrending(req, res) {
  const movies = await Movie.find({ trending: true }).sort({ rating: -1 }).limit(12);
  res.json({ movies });
}

export async function getMovie(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid movie id" });
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json({ movie });
}

const FIELDS = ["title", "description", "posterUrl", "backdropUrl", "trailerUrl", "year", "duration", "rating", "director", "cast", "genres", "trending"];
const pick = (body) => Object.fromEntries(FIELDS.filter((f) => body?.[f] !== undefined).map((f) => [f, body[f]]));
const clean = (data) => {
  if (Array.isArray(data.genres)) data.genres = data.genres.map((g) => String(g).toLowerCase());
  return data;
};

export async function createMovie(req, res) {
  const movie = await Movie.create(clean(pick(req.body)));
  res.status(201).json({ movie });
}

export async function updateMovie(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid movie id" });
  const movie = await Movie.findByIdAndUpdate(req.params.id, clean(pick(req.body)), { new: true, runValidators: true });
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json({ movie });
}

export async function deleteMovie(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid movie id" });
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json({ message: "Movie deleted" });
}
