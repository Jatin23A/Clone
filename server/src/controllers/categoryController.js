import mongoose from "mongoose";
import Category from "../models/Category.js";
import Movie from "../models/Movie.js";
import { slugify } from "../utils/token.js";

export async function getCategories(req, res) {
  const [categories, counts] = await Promise.all([
    Category.find().sort({ name: 1 }).lean(),
    Movie.aggregate([{ $unwind: "$genres" }, { $group: { _id: "$genres", count: { $sum: 1 } } }]),
  ]);
  const map = Object.fromEntries(counts.map((c) => [c._id, c.count]));
  res.json({ categories: categories.map((c) => ({ ...c, movieCount: map[c.slug] || 0 })) });
}

export async function createCategory(req, res) {
  const name = req.body?.name;
  if (typeof name !== "string" || !name.trim()) return res.status(400).json({ message: "Category name is required" });
  const category = await Category.create({ name: name.trim(), slug: slugify(name) });
  res.status(201).json({ category });
}

export async function deleteCategory(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid category id" });
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json({ message: "Category deleted" });
}
