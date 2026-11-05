import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set in .env");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}/api`)))
  .catch((err) => {
    console.error("Failed to start:", err.message);
    process.exit(1);
  });
