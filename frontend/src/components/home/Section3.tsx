import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faFileAlt, faKeyboard } from '@fortawesome/free-solid-svg-icons';

const Section3 = () => {
  const features = [
    {
      title: "Искусственный интеллект для генерации текста",
      text: "Создавайте текстовые документы с помощью ИИ.",
      icon: faRobot,
    },
    {
      title: "Поддержка различных форматов файлов",
      text: "Загружайте PDF, Excel, PNG и JPG файлы.",
      icon: faFileAlt,
    },
    {
      title: "Простой ввод данных клиента",
      text: "Вводите данные через интуитивно понятный интерфейс.",
      icon: faKeyboard,
    },
  ];

  return (
    <section id="section3" className="w-full bg-white py-28">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-black text-base font-semibold">Функции</div>
            <div className="text-black text-5xl font-bold leading-tight">
              Ключевые возможности нашего приложения
            </div>
          </div>
          <div className="flex-1 text-black text-lg font-normal leading-relaxed">
            Наше приложение использует мощные алгоритмы ИИ для генерации текста,
            что позволяет создавать профессиональные коммерческие предложения за
            считанные секунды. Поддержка множества форматов файлов делает
            процесс еще проще. Ввод данных клиента через чат-интерфейс
            обеспечивает удобство и скорость.
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12 mt-16">
          {features.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col gap-6">
              <div className="w-12 h-12 flex justify-center items-center text-white bg-black rounded-full">
                <FontAwesomeIcon icon={item.icon} size="2x" />
              </div>
              <h3 className="text-black text-2xl font-bold">{item.title}</h3>
              <p className="text-black text-base font-normal">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;