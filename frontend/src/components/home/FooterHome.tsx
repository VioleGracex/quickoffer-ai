import { Link } from "react-router-dom";

const FooterHome = () => {
  return (
    <footer className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 flex flex-col items-center gap-20">
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col justify-start items-start gap-8">
            <div className="flex items-center gap-2">
              {/* <div className="w-12 h-12 bg-black" /> */} {/* logo */}
              <span className="text-xl font-bold">QuickOfferAI</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="text-sm font-semibold text-black hover:text-gray-800 transition-colors">
                О нас
              </Link>
              <Link to="/contact" className="text-sm font-semibold text-black hover:text-gray-800 transition-colors">
                Контакты
              </Link>
              <Link to="/terms" className="text-sm font-semibold text-black hover:text-gray-800 transition-colors">
                Условия использования
              </Link>
              <Link to="/settings" className="text-sm font-semibold text-black hover:text-gray-800 transition-colors">
                Настройки файлов
              </Link>
              <Link to="/subscribe" className="text-sm font-semibold text-black hover:text-gray-800 transition-colors">
                Подписка
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[400px] flex flex-col justify-start items-start gap-4">
            <span className="text-base font-semibold text-black">Подписаться</span>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex w-full h-12 gap-4">
                <input
                  type="email"
                  placeholder="Введите ваш email"
                  className="flex-1 p-3 border border-black text-black placeholder-gray-600 outline-none"
                />
                <Link
                  to="/subscribe"
                  className="px-6 py-3 bg-black text-white text-base font-normal hover:bg-gray-800 transition-colors"
                >
                  Подписаться
                </Link>
              </div>
              <div className="flex flex-col md:flex-row justify-start items-start gap-1">
                <span className="text-xs font-normal text-black">
                  Подписываясь, вы соглашаетесь с нашей 
                </span>
                <Link to="/privacy" className="text-xs font-normal text-black underline">
                  Политикой конфиденциальности
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-8">
          <div className="w-full h-px bg-black"></div>
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex flex-wrap gap-6">
              <Link to="/privacy" className="text-sm font-normal text-black underline hover:text-gray-800 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-sm font-normal text-black underline hover:text-gray-800 transition-colors">
                Условия обслуживания
              </Link>
              <Link to="/settings" className="text-sm font-normal text-black underline hover:text-gray-800 transition-colors">
                Настройки файлов
              </Link>
            </div>
            <span className="text-sm font-normal text-black">
              © 2025 QuickOfferAI. Все права защищены.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;