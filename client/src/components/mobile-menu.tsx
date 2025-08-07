interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}

export function MobileMenu({ isOpen, onClose, scrollToSection }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-dark-light border-b border-gray-800">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <button
          onClick={() => scrollToSection("home")}
          className="block w-full text-left px-3 py-2 hover:text-accent transition-colors text-white"
        >
          Главная
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="block w-full text-left px-3 py-2 hover:text-accent transition-colors text-white"
        >
          Обо мне
        </button>
        <button
          onClick={() => scrollToSection("services")}
          className="block w-full text-left px-3 py-2 hover:text-accent transition-colors text-white"
        >
          Услуги
        </button>
        <button
          onClick={() => scrollToSection("cases")}
          className="block w-full text-left px-3 py-2 hover:text-accent transition-colors text-white"
        >
          Кейсы
        </button>
        <button
          onClick={() => scrollToSection("contacts")}
          className="block w-full text-left px-3 py-2 hover:text-accent transition-colors text-white"
        >
          Контакты
        </button>
      </div>
    </div>
  );
}
