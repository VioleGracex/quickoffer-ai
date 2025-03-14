import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const HeaderHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { name: "О нас", href: "#section1" },
    { name: "Услуги", href: "#section2" },
    { name: "Цены", href: "#section3" },
    { name: "Поддержка", href: "#section4" }
  ];

  return (
    <div>
      <header
        className={`fixed w-full top-0 z-50 transition-all ${
          isScrolled ? "bg-white shadow-lg" : "bg-white"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto h-16 px-4 md:px-16 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold text-black">QuickOffer AI</div>
          <nav className="hidden md:flex justify-center items-center gap-8 flex-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-base font-normal text-black hover:text-gray-800 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex gap-4">
            <Link
              to="/signin"
              className="px-5 py-2 text-black text-base font-normal border border-black hover:text-white hover:bg-gray-800 transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 text-black text-base font-normal border border-black hover:text-white hover:bg-gray-800 transition-colors"
            >
              Регистрация
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-x-0 top-0 w-full bg-white z-40 shadow-lg transition-transform transform translate-y-0">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="p-2 text-black hover:text-gray-800 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-4 p-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-base font-normal text-black hover:text-gray-800 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/signin"
              className="px-5 py-2 bg-black text-white text-base font-normal hover:bg-gray-800 transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-black text-white text-base font-normal hover:bg-gray-800 transition-colors"
            >
              Регистрация
            </Link>
          </nav>
        </div>
      )}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
};

export default HeaderHome;
