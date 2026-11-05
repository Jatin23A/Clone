import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true, index: true },
    description: { type: String, default: "" },
    posterUrl: { type: String, default: "" },
    backdropUrl: { type: String, default: "" },
    trailerUrl: { type: String, default: "" },
    year: { type: Number },
    duration: { type: Number, min: 0 }, // minutes
    rating: { type: Number, min: 0, max: 10, default: 0 },
    director: { type: String, default: "" },
    cast: [String],
    genres: { type: [String], index: true }, // category slugs, e.g. "sci-fi"
    trending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
