import mongoose from "mongoose";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

export async function getWatchlist(req, res) {
  const user = await User.findById(req.user._id).populate("watchlist");
  res.json({ movies: user.watchlist });
}

export async function addToWatchlist(req, res) {
  const { movieId } = req.params;
  if (!mongoose.isValidObjectId(movieId)) return res.status(400).json({ message: "Invalid movie id" });
  if (!(await Movie.exists({ _id: movieId }))) return res.status(404).json({ message: "Movie not found" });
  await User.updateOne({ _id: req.user._id }, { $addToSet: { watchlist: movieId } });
  res.status(201).json({ message: "Added to watchlist" });
}

export async function removeFromWatchlist(req, res) {
  const { movieId } = req.params;
  if (!mongoose.isValidObjectId(movieId)) return res.status(400).json({ message: "Invalid movie id" });
  await User.updateOne({ _id: req.user._id }, { $pull: { watchlist: movieId } });
  res.json({ message: "Removed from watchlist" });
}
