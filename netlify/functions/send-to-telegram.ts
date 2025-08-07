import { Handler } from "@netlify/functions";
import { contactFormSchema } from "../../shared/schema";

export const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse and validate request body
    const body = JSON.parse(event.body || "{}");
    const validatedData = contactFormSchema.parse(body);

    // Get environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram configuration");
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "Сервис временно недоступен. Пожалуйста, свяжитесь напрямую через Telegram.",
        }),
      };
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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        message: "Заявка успешно отправлена",
      }),
    };
  } catch (error) {
    console.error("Error in send-to-telegram function:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Некорректные данные формы",
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Произошла ошибка при отправке заявки. Попробуйте позже.",
      }),
    };
  }
};

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
