import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware with enhanced error tracking
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  // Enhanced logging for static file requests
  if (!path.startsWith('/api')) {
    console.log(`[Static Request] ${req.method} ${path}`);
  }

  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api") || res.statusCode !== 200) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware with detailed logging
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error('Detailed error:', {
      status,
      message,
      stack: err.stack,
      path: _req.path
    });

    res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // Enhanced static file serving for production
    const publicDir = path.resolve(__dirname, 'public');
    console.log('Serving static files from:', publicDir);

    // Serve static files with proper cache headers
    app.use(express.static(publicDir, {
      maxAge: '1y',
      etag: true,
      index: false // Don't serve directory indexes
    }));

    // SPA fallback
    app.get('*', (req, res) => {
      console.log('SPA Fallback for:', req.path);
      res.sendFile(path.join(publicDir, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
})();