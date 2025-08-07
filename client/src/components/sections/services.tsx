export function ServicesSection() {
  const scrollToContacts = () => {
    const element = document.getElementById("contacts");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Услуги</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Профессиональная разработка веб-решений и автоматизация бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Website Development Service */}
          <div className="bg-dark-light p-8 rounded-2xl card-hover border border-gray-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-globe text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Fullstack сайты</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Лендинги и многостраничные сайты</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Интернет-магазины и каталоги</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Веб-приложения и панели управления</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Адаптивный дизайн для всех устройств</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>SEO оптимизация и высокая скорость</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={scrollToContacts}
                className="btn-gradient px-6 py-3 rounded-full text-white font-semibold w-full"
              >
                Заказать сайт
              </button>
            </div>
          </div>

          {/* Telegram Bot Service */}
          <div className="bg-dark-light p-8 rounded-2xl card-hover border border-gray-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-telegram text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Telegram боты</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Боты для автоматизации бизнеса</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Обработка заказов и заявок</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Интеграция с CRM и базами данных</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Уведомления и рассылки</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-accent"></i>
                <span>Аналитика и отчеты</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={scrollToContacts}
                className="btn-gradient px-6 py-3 rounded-full text-white font-semibold w-full"
              >
                Заказать бота
              </button>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-12">Процесс работы</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Обсуждение</h4>
              <p className="text-gray-400 text-sm">Анализируем ваши задачи и требования</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Планирование</h4>
              <p className="text-gray-400 text-sm">Создаем техническое задание и макеты</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Разработка</h4>
              <p className="text-gray-400 text-sm">Кодим и тестируем решение</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Запуск</h4>
              <p className="text-gray-400 text-sm">Деплой и поддержка проекта</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
