export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-dark-light to-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in-up">
          {/* Modern professional avatar placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-white">
            АР
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Алексей Розепин</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Fullstack веб-разработчик
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Создаю современные сайты и Telegram ботов. Опыт работы 1+ год, 4 довольных клиента.
            Превращаю ваши идеи в цифровые решения.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("contacts")}
              className="btn-gradient px-8 py-4 rounded-full text-white font-semibold text-lg"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Заказать проект
            </button>

            <button
              onClick={downloadPortfolio}
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              <i className="fas fa-download mr-2"></i>
              Скачать портфолио
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-8">
            <a
              href="https://github.com/alexeyrozepin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://t.me/alexey_rozepin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors text-2xl"
            >
              <i className="fab fa-telegram"></i>
            </a>
            <a
              href="mailto:alexey.rozepin@example.com"
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <i className="fas fa-chevron-down text-accent text-2xl"></i>
      </div>
    </section>
  );
}
