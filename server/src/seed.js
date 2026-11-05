import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Category from "./models/Category.js";
import Movie from "./models/Movie.js";
import User from "./models/User.js";
import { slugify } from "./utils/token.js";

const categoryNames = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Animation", "Adventure", "Crime", "Fantasy", "Documentary"];

const tmdb = (p) => `https://image.tmdb.org/t/p/w500${p}`;

// Posters for the first four come from your existing frontend; the rest have no poster
// and the UI shows a placeholder. Add posterUrl later via PUT /api/movies/:id.
const movies = [
  { title: "Interstellar", year: 2014, duration: 169, rating: 8.7, director: "Christopher Nolan", genres: ["sci-fi", "drama", "adventure"], trending: true, posterUrl: tmdb("/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"), description: "A team of explorers travels through a wormhole in space to ensure humanity's survival." },
  { title: "Batman", year: 2022, duration: 176, rating: 7.8, director: "Matt Reeves", genres: ["action", "crime", "thriller"], trending: true, posterUrl: tmdb("/74xTEgt7R36Fpooo50r9T25onhq.jpg"), description: "Batman uncovers corruption in Gotham City while hunting a serial killer known as the Riddler." },
  { title: "Joker", year: 2019, duration: 122, rating: 8.4, director: "Todd Phillips", genres: ["crime", "drama", "thriller"], trending: true, posterUrl: tmdb("/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"), description: "A failed comedian descends into madness and becomes a symbol of chaos in Gotham." },
  { title: "Avengers", year: 2012, duration: 143, rating: 8.0, director: "Joss Whedon", genres: ["action", "sci-fi", "adventure"], trending: true, posterUrl: tmdb("/or06FN3Dka5tukK1e9sl16pB3iy.jpg"), description: "Earth's mightiest heroes must come together to stop Loki and his alien army." },
  { title: "Inception", year: 2010, duration: 148, rating: 8.8, director: "Christopher Nolan", genres: ["sci-fi", "action", "thriller"], description: "A thief who steals secrets through dreams is given the task of planting an idea." },
  { title: "Spider-Man", year: 2002, duration: 121, rating: 7.4, director: "Sam Raimi", genres: ["action", "adventure", "fantasy"], description: "A teenager gains spider-like abilities and fights crime in New York." },
  { title: "Titanic", year: 1997, duration: 195, rating: 7.9, director: "James Cameron", genres: ["romance", "drama"], description: "A love story unfolds aboard the doomed RMS Titanic." },
  { title: "Iron Man", year: 2008, duration: 126, rating: 7.9, director: "Jon Favreau", genres: ["action", "sci-fi", "adventure"], description: "A billionaire engineer builds a powered suit of armor to fight evil." },
  { title: "Thor", year: 2011, duration: 115, rating: 7.0, director: "Kenneth Branagh", genres: ["action", "fantasy", "adventure"], description: "The mighty Thor is banished to Earth and must prove himself worthy." },
];

async function run() {
  await connectDB();

  await Category.deleteMany();
  await Category.insertMany(categoryNames.map((name) => ({ name, slug: slugify(name) })));

  await Movie.deleteMany();
  await Movie.insertMany(movies);

  const email = (process.env.ADMIN_EMAIL || "admin@netmovie.com").toLowerCase();
  if (!(await User.exists({ email }))) {
    await User.create({ name: "Admin", email, password: process.env.ADMIN_PASSWORD || "Admin@12345", role: "admin" });
    console.log(`Admin created: ${email}`);
  }

  console.log(`Seeded ${categoryNames.length} categories and ${movies.length} movies`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
