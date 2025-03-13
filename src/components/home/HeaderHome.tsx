import React, { useEffect, useState } from "react";
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
          isScrolled ? "bg-white shadow-lg" : "bg-Color-Scheme-1-Background"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto h-16 px-4 md:px-16 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold text-Color-Scheme-1-Text">
            QuickOffer AI
          </div>
          <nav className="hidden md:flex justify-center items-center gap-8">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="text-base font-normal text-Color-Scheme-1-Text">
                {item.name}
              </a>
            ))}

            <Link to="/signin" className="px-5 py-2 bg-Color-Neutral-Darkest text-Color-White text-base font-normal border border-black">
              Войти
            </Link>
            <Link to="/signup" className="px-5 py-2 bg-Color-Neutral-Дarkест text-Color-White text-base font-normal border border-black">
              Регистрация
            </Link>
          </nav>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 bg-Color-Neutral-Darkest text-Color-White rounded"
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="fixed inset-0 bg-Color-Scheme-1-Background z-40">
            <nav className="flex flex-col items-center gap-4 p-4">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="text-base font-normal text-Color-Scheme-1-Text">
                  {item.name}
                </a>
              ))}
              <Link to="/signin" className="px-5 py-2 bg-Color-Neutral-Darkest text-Color-White text-base font-normal">
                Войти
              </Link>
              <Link to="/signup" className="px-5 py-2 bg-Color-Neutral-Дarkест text-Color-White text-base font-normal">
                Регистрация
              </Link>
            </nav>
          </div>
        )}
      </header>
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-Color-Neutral-Darkest text-Color-White rounded-full shadow-lg"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
};

export default HeaderHome;