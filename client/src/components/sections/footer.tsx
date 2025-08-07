export function Footer() {
  return (
    <footer className="bg-secondary py-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold gradient-text">Алексей Розепин</span>
            <p className="text-gray-400 text-sm">Fullstack веб-разработчик</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/alexeyrozepin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a
              href="https://t.me/alexey_rozepin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              <i className="fab fa-telegram text-xl"></i>
            </a>
            <a
              href="mailto:alexey.rozepin@example.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm">© 2024 Алексей Розепин. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
