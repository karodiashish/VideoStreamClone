import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import { createRoutes } from "./routes";
import { MemStorage } from "./storage";

const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize storage
const storage = new MemStorage();

// API routes
app.use("/", createRoutes(storage));

// Serve static files in production or set up Vite in development
if (process.env.NODE_ENV === "production") {
  serveStatic(app);
} else {
  setupVite(app, server);
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  log(`Server running on port ${PORT}`);
});
