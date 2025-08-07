export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Обо мне</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Узнайте больше о моем опыте и подходе к разработке
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Fullstack веб-разработчик с фокусом на результат
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Привет! Я Алексей, fullstack разработчик с опытом работы более года.
              За это время успешно реализовал проекты для 4 клиентов, специализируюсь
              на создании современных веб-сайтов и Telegram ботов.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Мой подход — это сочетание современных технологий, чистого кода и
              понимания бизнес-задач клиента. Каждый проект для меня — это возможность
              создать что-то действительно полезное и эффективное.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">1+</div>
                <div className="text-gray-400">Год опыта</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">4</div>
                <div className="text-gray-400">Довольных клиента</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-secondary p-6 rounded-xl card-hover">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <i className="fas fa-code text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Frontend разработка</h4>
                  <p className="text-gray-400">React, HTML5, CSS3, JavaScript, адаптивная верстка</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-xl card-hover">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/20 p-3 rounded-lg">
                  <i className="fas fa-server text-accent text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Backend разработка</h4>
                  <p className="text-gray-400">Node.js, Python, базы данных, API интеграции</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-xl card-hover">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <i className="fab fa-telegram text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Telegram боты</h4>
                  <p className="text-gray-400">Автоматизация бизнес-процессов через Telegram Bot API</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
