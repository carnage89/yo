export function CasesSection() {
  const downloadPortfolio = async () => {
    try {
      const response = await fetch("/.netlify/functions/download-portfolio");
      if (!response.ok) {
        throw new Error("Ошибка загрузки файла");
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Alexey-Rozepin-Portfolio.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading portfolio:", error);
      alert("Ошибка загрузки файла. Попробуйте позже.");
    }
  };

  return (
    <section id="cases" className="section-padding bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Кейсы</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Примеры реализованных проектов и решений
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Case 1 - Website */}
          <div className="bg-secondary rounded-2xl overflow-hidden card-hover">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <i className="fas fa-shopping-cart text-4xl text-primary"></i>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                  Интернет-магазин
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Магазин товаров для дома</h3>
              <p className="text-gray-400 text-sm mb-4">
                Полнофункциональный интернет-магазин с каталогом, корзиной и системой заказов
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">React • Node.js</span>
              </div>
            </div>
          </div>

          {/* Case 2 - Telegram Bot */}
          <div className="bg-secondary rounded-2xl overflow-hidden card-hover">
            <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <i className="fab fa-telegram text-4xl text-accent"></i>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">
                  Telegram Bot
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Бот для приема заказов</h3>
              <p className="text-gray-400 text-sm mb-4">
                Автоматизация приема заказов и уведомлений для ресторана
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">Python • Telegram API</span>
              </div>
            </div>
          </div>

          {/* Case 3 - Landing Page */}
          <div className="bg-secondary rounded-2xl overflow-hidden card-hover">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/40 flex items-center justify-center">
              <i className="fas fa-laptop-code text-4xl text-primary"></i>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                  Landing Page
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Лендинг IT-услуг</h3>
              <p className="text-gray-400 text-sm mb-4">
                Продающий лендинг с формами обратной связи и аналитикой
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">HTML5 • CSS3 • JS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Portfolio CTA */}
        <div className="text-center bg-secondary p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Хотите увидеть больше?</h3>
          <p className="text-gray-400 mb-6">
            Скачайте полное портфолио с подробным описанием проектов и технических решений
          </p>
          <button
            onClick={downloadPortfolio}
            className="btn-gradient px-8 py-4 rounded-full text-white font-semibold text-lg"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            Скачать портфолио PDF
          </button>
        </div>
      </div>
    </section>
  );
}
