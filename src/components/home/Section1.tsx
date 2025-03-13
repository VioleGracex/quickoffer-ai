import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <section id="section1" className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col justify-start items-center">
        <img
          className="w-full h-auto"
          src="https://placehold.co/1440x596"
          alt="Placeholder"
        />
        <div className="w-full px-4 md:px-16 py-20 flex flex-col md:flex-row justify-start items-start gap-8 md:gap-20">
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            <h1 className="text-black text-[36px] md:text-[56px] font-bold font-['Roboto'] leading-[45px] md:leading-[67.20px] mb-4">
              Создавайте профессиональные бизнес-предложения за секунды
            </h1>
          </div>
          <div className="flex-1 flex flex-col justify-start items-center md:items-start gap-4">
            <p className="text-black text-base md:text-lg font-normal font-['Roboto'] leading-[24px] md:leading-[27px]">
              Загрузите свой шаблон, введите данные клиента, и позвольте ИИ
              мгновенно сгенерировать polished предложение. Это быстро и удобно!
            </p>
            <div className="flex-1 flex flex-row justify-start items-center md:items-start gap-4">
              <Link
                to="/signup"
                className="w-full md:w-auto px-6 py-3 bg-black text-white text-base font-normal font-['Roboto'] leading-normal border border-black text-center"
              >
                Начать
              </Link>
              <Link
                to="/about"
                className="w-full md:w-auto px-6 py-3 text-black text-base font-normal font-['Roboto'] leading-normal border border-black text-center"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
