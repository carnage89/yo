import { Handler } from "@netlify/functions";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const handler: Handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // In a real implementation, you would have a PDF file in your project
    // For now, we'll create a simple response that indicates the file should be added
    
    const portfolioPath = join(process.cwd(), "assets", "portfolio.pdf");
    
    if (!existsSync(portfolioPath)) {
      // If no PDF file exists, return a helpful error
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Файл портфолио не найден. Пожалуйста, добавьте файл portfolio.pdf в папку assets.",
        }),
      };
    }

    // Read the PDF file
    const pdfBuffer = readFileSync(portfolioPath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Alexey-Rozepin-Portfolio.pdf"',
        "Content-Length": pdfBuffer.length.toString(),
      },
      body: pdfBuffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Error in download-portfolio function:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Произошла ошибка при загрузке файла. Попробуйте позже.",
      }),
    };
  }
};
