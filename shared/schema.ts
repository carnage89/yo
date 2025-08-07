import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  project: z.string().optional(),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface TelegramResponse {
  success: boolean;
  message?: string;
  error?: string;
}
