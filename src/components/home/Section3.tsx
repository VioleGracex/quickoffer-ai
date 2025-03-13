const Section3 = () => {
  return (
    <div>
      <div className="w-[1440px] px-16 py-28 bg-Color-Scheme-1-Background inline-flex flex-col justify-start items-start gap-20 overflow-hidden">
        <div className="self-stretch inline-flex justify-start items-start gap-20">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="inline-flex justify-start items-center">
              <div className="justify-start text-Color-Scheme-1-Text text-base font-semibold font-['Roboto'] leading-normal">
                Функции
              </div>
            </div>
            <div className="self-stretch justify-start text-Color-Scheme-1-Text text-5xl font-bold font-['Roboto'] leading-[57.60px]">
              Ключевые возможности нашего приложения
            </div>
          </div>
          <div className="flex-1 justify-start text-Color-Scheme-1-Text text-lg font-normal font-['Roboto'] leading-[27px]">
            Наше приложение использует мощные алгоритмы ИИ для генерации текста,
            что позволяет создавать профессиональные коммерческие предложения за
            считанные секунды. Поддержка множества форматов файлов делает
            процесс еще проще. Ввод данных клиента через чат-интерфейс
            обеспечивает удобство и скорость.
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-16">
          <div className="self-stretch inline-flex justify-start items-start gap-12">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
              <div className="w-12 h-12 relative overflow-hidden">
                <div className="w-9 h-10 left-[6px] top-[4px] absolute bg-Color-Scheme-1-Text" />
              </div>
              <div className="self-stretch justify-start text-Color-Scheme-1-Text text-[32px] font-bold font-['Roboto'] leading-[41.60px]">
                Искусственный интеллект для генерации текста
              </div>
              <div className="self-stretch justify-start text-Color-Scheme-1-Text text-base font-normal font-['Roboto'] leading-normal">
                Создавайте текстовые документы с помощью ИИ.
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
              <div className="w-12 h-12 relative overflow-hidden">
                <div className="w-9 h-10 left-[6px] top-[4px] absolute bg-Color-Scheme-1-Text" />
              </div>
              <div className="self-stretch justify-start text-Color-Scheme-1-Text text-[32px] font-bold font-['Roboto'] leading-[41.60px]">
                Поддержка различных форматов файлов
              </div>
              <div className="self-stretch justify-start text-Color-Scheme-1-Text text-base font-normal font-['Roboto'] leading-normal">
                Загружайте PDF, Excel, PNG и JPG файлы.
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
              <div className="w-12 h-12 relative overflow-hidden">
                <div className="w-9 h-10 left-[6px] top-[4px] absolute bg-Color-Scheme-1-Text" />
              </div>
              <div className="self-stretch justify-start text-Color-Scheme-1-Text text-[32px] font-bold font-['Roboto'] leading-[41.60px]">
                Простой ввод данных клиента
              </div>
              <div className="self-stretch justify-start text-Color-Scheme-1-Text text-base font-normal font-['Roboto'] leading-normal">
                Вводите данные через интуитивно понятный интерфейс.
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex justify-start items-center gap-6">
          <div
            data-alternate="False"
            data-icon-position="No icon"
            data-small="False"
            data-style="Secondary"
            className="px-6 py-3 outline outline-1 outline-Color-Neutral-Darkest flex justify-center items-center gap-2 overflow-hidden"
          >
            <div className="justify-start text-Color-Neutral-Darkest text-base font-normal font-['Roboto'] leading-normal">
              Скачать
            </div>
          </div>
          <div
            data-alternate="False"
            data-icon-position="Trailing"
            data-small="False"
            data-style="Link"
            className="flex justify-center items-center gap-2 overflow-hidden"
          >
            <div className="justify-start text-Color-Neutral-Darkest text-base font-normal font-['Roboto'] leading-normal">
              Отправить
            </div>
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-[7.12px] h-[11.41px] left-[8.29px] top-[5.54px] absolute bg-Color-Scheme-1-Text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
