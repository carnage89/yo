var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { z } from "zod";
var contactFormSchema = z.object({
  name: z.string().min(2, "\u0418\u043C\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0443\u043C 2 \u0441\u0438\u043C\u0432\u043E\u043B\u0430"),
  email: z.string().email("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email"),
  project: z.string().optional(),
  message: z.string().min(10, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0443\u043C 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432")
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/send-to-telegram", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (!botToken || !chatId) {
        console.error("Missing Telegram configuration");
        return res.status(500).json({
          success: false,
          error: "\u0421\u0435\u0440\u0432\u0438\u0441 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0447\u0435\u0440\u0435\u0437 Telegram."
        });
      }
      const projectType = validatedData.project ? `
\u{1F4CB} \u0422\u0438\u043F \u043F\u0440\u043E\u0435\u043A\u0442\u0430: ${getProjectTypeLabel(validatedData.project)}` : "";
      const message = `\u{1F680} \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430-\u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E!

\u{1F464} \u0418\u043C\u044F: ${validatedData.name}
\u{1F4E7} Email: ${validatedData.email}${projectType}

\u{1F4AC} \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430:
${validatedData.message}

\u23F0 \u0412\u0440\u0435\u043C\u044F: ${(/* @__PURE__ */ new Date()).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML"
          })
        }
      );
      if (!telegramResponse.ok) {
        const errorData = await telegramResponse.json();
        console.error("Telegram API error:", errorData);
        throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0432 Telegram");
      }
      res.json({
        success: true,
        message: "\u0417\u0430\u044F\u0432\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430"
      });
    } catch (error) {
      console.error("Error in send-to-telegram:", error);
      if (error instanceof Error && error.message.includes("validation")) {
        return res.status(400).json({
          success: false,
          error: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u044B"
        });
      }
      res.status(500).json({
        success: false,
        error: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0437\u0430\u044F\u0432\u043A\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435."
      });
    }
  });
  app2.get("/api/download-portfolio", (req, res) => {
    try {
      const fs2 = __require("fs");
      const path3 = __require("path");
      const portfolioPath = path3.join(process.cwd(), "assets", "portfolio.pdf");
      if (!fs2.existsSync(portfolioPath)) {
        return res.status(404).json({
          error: "\u0424\u0430\u0439\u043B \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D."
        });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Alexey-Rozepin-Portfolio.pdf"');
      const fileStream = fs2.createReadStream(portfolioPath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error downloading portfolio:", error);
      res.status(500).json({
        error: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0444\u0430\u0439\u043B\u0430."
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function getProjectTypeLabel(projectType) {
  const labels = {
    website: "\u0412\u0435\u0431-\u0441\u0430\u0439\u0442",
    landing: "\u041B\u0435\u043D\u0434\u0438\u043D\u0433",
    ecommerce: "\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D",
    "telegram-bot": "Telegram \u0431\u043E\u0442",
    other: "\u0414\u0440\u0443\u0433\u043E\u0435"
  };
  return labels[projectType] || projectType;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
