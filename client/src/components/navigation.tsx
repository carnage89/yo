import { useState } from "react";
import { MobileMenu } from "./mobile-menu";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text">Алексей Розепин</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-accent transition-colors text-white"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-accent transition-colors text-white"
              >
                Обо мне
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="hover:text-accent transition-colors text-white"
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection("cases")}
                className="hover:text-accent transition-colors text-white"
              >
                Кейсы
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="hover:text-accent transition-colors text-white"
              >
                Контакты
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-accent transition-colors"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        scrollToSection={scrollToSection}
      />
    </nav>
  );
}
