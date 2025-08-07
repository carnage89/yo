import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function ContactsSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/.netlify/functions/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Заявка отправлена!",
          description: "Спасибо за ваше обращение. Скоро свяжусь с вами.",
        });
        form.reset();
      } else {
        throw new Error(result.error || "Ошибка отправки");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую через Telegram.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Контакты</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Готов обсудить ваш проект. Свяжитесь со мной удобным способом
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Способы связи</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-dark-light rounded-xl">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <i className="fas fa-envelope text-accent text-xl"></i>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-400">boberbobrovic27@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-dark-light rounded-xl">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <i className="fab fa-telegram text-primary text-xl"></i>
                  </div>
                  <div>
                    <div className="font-medium">Telegram</div>
                    <div className="text-gray-400">@diaboliccum</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-dark-light rounded-xl">
                  <div className="bg-gray-600/20 p-3 rounded-lg">
                    <i className="fab fa-github text-white text-xl"></i>
                  </div>
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-gray-400">@carnage89</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-dark-light p-6 rounded-xl">
              <h4 className="font-semibold mb-4">Время ответа</h4>
              <p className="text-gray-400 text-sm mb-2">
                <i className="fas fa-clock mr-2"></i>
                Отвечаю в течение часа. работаю без выходных
              </p>
              <p className="text-gray-400 text-sm">
                <i className="fas fa-calendar mr-2"></i>
                Работаю ПН-СБ с 10:00 до 20:00 (МСК)
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-light p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6">Отправить заявку</h3>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  placeholder="Как к вам обращаться?"
                  className="w-full px-4 py-3 bg-secondary border border-gray-600 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent text-white"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-secondary border border-gray-600 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent text-white"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2">
                  Тип проекта
                </label>
                <Select onValueChange={(value) => form.setValue("project", value)}>
                  <SelectTrigger className="w-full px-4 py-3 bg-secondary border border-gray-600 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent text-white">
                    <SelectValue placeholder="Выберите тип проекта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Веб-сайт</SelectItem>
                    <SelectItem value="landing">Лендинг</SelectItem>
                    <SelectItem value="ecommerce">Интернет-магазин</SelectItem>
                    <SelectItem value="telegram-bot">Telegram бот</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Описание проекта *
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Расскажите подробнее о вашем проекте..."
                  className="w-full px-4 py-3 bg-secondary border border-gray-600 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent text-white resize-none"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gradient py-4 rounded-xl text-white font-semibold text-lg"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Отправляем...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Отправить заявку
                  </>
                )}
              </Button>
            </form>

            <p className="text-gray-500 text-sm mt-4 text-center">
              Отправляя заявку, вы соглашаетесь на обработку персональных данных
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
