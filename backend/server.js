import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables FIRST before anything else
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Validate API key on startup
if (
  !process.env.GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY === "your_gemini_api_key_here"
) {
  console.error("❌ ERROR: GEMINI_API_KEY is not set in backend/.env");
  process.exit(1);
}

// Initialize server with async context for dynamic imports
(async () => {
  // Dynamically import routes AFTER dotenv is loaded
  const { default: analyzeRoutes } = await import("./routes/analyzeRoutes.js");

  // Ensure uploads directory exists
  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api", analyzeRoutes);
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`),
  );
})();
