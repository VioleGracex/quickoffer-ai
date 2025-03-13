import React from "react";

const FooterHome = () => {
  return (
    <div>
      <div className="w-[1440px] px-16 py-20 bg-Color-Scheme-1-Background inline-flex flex-col justify-start items-center gap-20">
        <div className="self-stretch inline-flex justify-between items-start">
          <div className="inline-flex flex-col justify-start items-start gap-8">
            <div className="flex flex-col justify-start items-start gap-6 overflow-hidden">
              <div
                data-alternate="False"
                className="w-[84px] h-9 relative overflow-hidden"
              >
                <div className="w-[70px] h-9 left-[6.67px] top-0 absolute overflow-hidden">
                  <div className="w-[18.81px] h-[15.95px] left-[50.82px] top-[10.87px] absolute bg-Color-Neutral-Darkest" />
                  <div className="w-[19.44px] h-[24.68px] left-[34.33px] top-[11.32px] absolute bg-Color-Neutral-Darkest" />
                  <div className="w-[18.81px] h-[15.95px] left-[18.55px] top-[10.87px] absolute bg-Color-Neutral-Darkest" />
                  <div className="w-[21.60px] h-[16.19px] left-0 top-[10.24px] absolute bg-Color-Neutral-Darkest" />
                  <div className="w-[15.13px] h-[9.29px] left-[1.15px] top-0 absolute bg-Color-Neutral-Darkest" />
                </div>
              </div>
            </div>
            <div className="w-[493px] inline-flex justify-start items-start gap-8">
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-semibold font-['Roboto'] leading-[21px]">
                О нас
              </div>
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-semibold font-['Roboto'] leading-[21px]">
                Контакты
              </div>
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-semibold font-['Roboto'] leading-[21px]">
                Условия использования
              </div>
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-semibold font-['Roboto'] leading-[21px]">
                Настройки файлов
              </div>
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-semibold font-['Roboto'] leading-[21px]">
                Подписка
              </div>
            </div>
          </div>
          <div className="w-[400px] inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-Color-Scheme-1-Text text-base font-semibold font-['Roboto'] leading-normal">
              Подписаться
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch h-12 inline-flex justify-start items-start gap-4">
                <div
                  data-alternate="False"
                  data-type="Default"
                  className="flex-1 p-3 outline outline-1 outline-Color-Neutral-Darkest flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-black/60 text-base font-normal font-['Roboto'] leading-normal">
                    Введите ваш email
                  </div>
                </div>
                <div
                  data-alternate="False"
                  data-icon-position="No icon"
                  data-small="False"
                  data-style="Secondary"
                  className="px-6 py-3 outline outline-1 outline-Color-Neutral-Darkest flex justify-center items-center gap-2"
                >
                  <div className="justify-start text-Color-Neutral-Darkest text-base font-normal font-['Roboto'] leading-normal">
                    Подписаться
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[18px] inline-flex justify-start items-start gap-1">
                <div className="justify-start text-Color-Scheme-1-Text text-xs font-normal font-['Roboto'] leading-[18px]">
                  Подписываясь, вы соглашаетесь с нашей Политикой
                  конфиденциальности
                </div>
                <div className="justify-start text-Color-Scheme-1-Text text-xs font-normal font-['Roboto'] underline leading-[18px]">
                  Подписываясь, вы соглашаетесь с нашей Политикой
                  конфиденциальности
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-center gap-8">
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-Color-Scheme-1-Border"></div>
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="flex justify-start items-start gap-6">
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-normal font-['Roboto'] underline leading-[21px]">
                Политика конфиденциальности
              </div>
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-normal font-['Roboto'] underline leading-[21px]">
                Условия обслуживания
              </div>
              <div className="justify-start text-Color-Scheme-1-Text text-sm font-normal font-['Roboto'] underline leading-[21px]">
                Настройки файлов
              </div>
            </div>
            <div className="justify-start text-Color-Scheme-1-Text text-sm font-normal font-['Roboto'] leading-[21px]">
              © 2025 Relume. Все права защищены.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterHome;
