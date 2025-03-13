import React from "react";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/register");
  };

  return (
    <section id="section1" className="w-full bg-Color-Scheme-1-Background">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col justify-start items-center">
        <img
          className="w-full h-auto"
          src="https://placehold.co/1440x596"
          alt="Placeholder"
        />
        <div className="w-full px-4 md:px-16 py-20 flex flex-col md:flex-row justify-start items-start gap-8 md:gap-20">
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            <h1 className="text-Color-Scheme-1-Text text-[36px] md:text-[56px] font-bold font-['Roboto'] leading-[45px] md:leading-[67.20px] mb-4">
              Создавайте профессиональные бизнес-предложения за секунды
            </h1>
            <p className="text-Color-Scheme-1-Text text-base md:text-lg font-normal font-['Roboto'] leading-[24px] md:leading-[27px]">
              Загрузите свой шаблон, введите данные клиента, и позвольте ИИ
              мгновенно сгенерировать polished предложение. Это быстро и удобно!
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-start items-center md:items-start gap-4">
            <button
              onClick={handleStartClick}
              className="w-full md:w-auto px-6 py-3 bg-Color-Neutral-Darkest text-Color-White text-base font-normal font-['Roboto'] leading-normal border border-Color-Neutral-Darkest"
            >
              Начать
            </button>
            <button className="w-full md:w-auto px-6 py-3 text-Color-Neutral-Darkest text-base font-normal font-['Roboto'] leading-normal border border-Color-Neutral-Darkest">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;