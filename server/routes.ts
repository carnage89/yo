import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for sending contact form to Telegram
  app.post("/api/send-to-telegram", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);

      // Get environment variables
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken || !chatId) {
        console.error("Missing Telegram configuration");
        return res.status(500).json({
          success: false,
          error: "Сервис временно недоступен. Пожалуйста, свяжитесь напрямую через Telegram.",
        });
      }

      // Format message for Telegram
      const projectType = validatedData.project 
        ? `\n📋 Тип проекта: ${getProjectTypeLabel(validatedData.project)}`
        : "";

      const message = `🚀 Новая заявка с сайта-портфолио!

👤 Имя: ${validatedData.name}
📧 Email: ${validatedData.email}${projectType}

💬 Описание проекта:
${validatedData.message}

⏰ Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

      // Send message to Telegram
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (!telegramResponse.ok) {
        const errorData = await telegramResponse.json();
        console.error("Telegram API error:", errorData);
        throw new Error("Ошибка отправки в Telegram");
      }

      res.json({
        success: true,
        message: "Заявка успешно отправлена",
      });
    } catch (error) {
      console.error("Error in send-to-telegram:", error);

      if (error instanceof Error && error.message.includes("validation")) {
        return res.status(400).json({
          success: false,
          error: "Некорректные данные формы",
        });
      }

      res.status(500).json({
        success: false,
        error: "Произошла ошибка при отправке заявки. Попробуйте позже.",
      });
    }
  });

  // API route for downloading portfolio
  app.get("/api/download-portfolio", (req, res) => {
    try {
      const fs = require('fs');
      const path = require('path');
      
      const portfolioPath = path.join(process.cwd(), "assets", "portfolio.pdf");
      
      if (!fs.existsSync(portfolioPath)) {
        return res.status(404).json({
          error: "Файл портфолио не найден.",
        });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Alexey-Rozepin-Portfolio.pdf"');
      
      const fileStream = fs.createReadStream(portfolioPath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error downloading portfolio:", error);
      res.status(500).json({
        error: "Произошла ошибка при загрузке файла.",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getProjectTypeLabel(projectType: string): string {
  const labels: Record<string, string> = {
    website: "Веб-сайт",
    landing: "Лендинг",
    ecommerce: "Интернет-магазин",
    "telegram-bot": "Telegram бот",
    other: "Другое",
  };
  
  return labels[projectType] || projectType;
}
