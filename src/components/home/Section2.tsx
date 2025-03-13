import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Section2 = () => {
  return (
    <section id="section2" className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-20 flex flex-col justify-start items-center">
        <h2 className="text-black text-[40px] font-bold font-['Roboto'] leading-[48px] mb-8 text-center">
          Простой процесс создания коммерческих предложений с помощью ИИ за три шага
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-20">
          {[
            {
              title: "Легко загружайте шаблоны и вводите данные клиентов в чат",
              text: "Следуйте этим простым шагам, чтобы быстро создать профессиональное предложение.",
              linkText: "Начать",
              linkHref: "/start",
              imgSrc: "https://placehold.co/405x240"
            },
            {
              title: "Загрузите шаблон в формате PDF, Excel, PNG или JPG",
              text: "Просто выберите файл и загрузите его в систему.",
              linkText: "Далее",
              linkHref: "/next",
              imgSrc: "https://placehold.co/405x240"
            },
            {
              title: "Введите данные клиента и детали сделки в удобном интерфейсе",
              text: "Просто введите информацию в чат, и мы все сделаем за вас.",
              linkText: "Создать",
              linkHref: "/create",
              imgSrc: "https://placehold.co/405x240"
            }
          ].map((item, index) => (
            <div key={index} className="flex-1 flex flex-col justify-start items-center md:items-start gap-4">
              <img className="w-full h-auto" src={item.imgSrc} alt="Placeholder" />
              <h3 className="text-black text-2xl font-bold font-['Roboto'] leading-[33.60px] text-center md:text-left">
                {item.title}
              </h3>
              <p className="text-black text-base font-normal font-['Roboto'] leading-normal text-center md:text-left">
                {item.text}
              </p>
              <Link
                to={item.linkHref}
                className="flex items-center text-black text-base font-normal font-['Roboto'] leading-normal"
              >
                {item.linkText}
                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;