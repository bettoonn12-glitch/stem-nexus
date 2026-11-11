import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3e3;
  app.use(express.json());
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "STEM Nexus Interactive" });
  });
  const distCandidates = [
    path.join(__dirname, "dist"),
    path.join(process.cwd(), "dist"),
    path.resolve("dist")
  ];
  const distDir = distCandidates.find((dir) => fs.existsSync(dir)) || path.join(process.cwd(), "dist");
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      const indexPath = path.join(distDir, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("STEM Nexus: index.html not found. Please build the application.");
      }
    });
  } else {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: 3e3 },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`STEM Nexus server ready on http://0.0.0.0:${port} (dist: ${distDir})`);
  });
  const shutdown = (signal) => {
    console.log(`Received ${signal}, closing HTTP server gracefully...`);
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
startServer().catch((err) => {
  console.error("Fatal server startup error:", err);
  process.exit(1);
});
