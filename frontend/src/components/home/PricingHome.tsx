import { Link } from 'react-router-dom';

const PricingHome = () => {
  return (
    <section id="pricing" className="w-full bg-white py-28">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 flex flex-col items-center">
        <div className="w-full text-center mb-8">
          <h2 className="text-black text-base font-semibold mb-2">Цены</h2>
          <h3 className="text-black text-5xl font-bold leading-tight mb-6">План цен</h3>
          <p className="text-black text-lg font-normal">Выберите план, который подходит вашему бизнесу.</p>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12">
          {[
            {
              title: "Базовый план",
              price: "$19/мес",
              features: [
                "Генерация предложений AI",
                "Поддержка разных форматов",
                "Простой ввод данных",
              ],
              link: "/signup",
            },
            {
              title: "Бизнес-план",
              price: "$29/мес",
              features: [
                "Все функции базового плана",
                "Приоритетная поддержка клиентов",
                "Дополнительные шаблоны",
                "Быстрая загрузка предложений",
                "Отправка по электронной почте",
              ],
              link: "/signup",
            },
          ].map((plan, index) => (
            <div key={index} className="flex-1 p-8 border border-black flex flex-col items-center">
              <div className="text-center mb-8">
                <h4 className="text-black text-xl font-bold mb-2">{plan.title}</h4>
                <p className="text-black text-5xl font-bold mb-4">{plan.price}</p>
              </div>
              <ul className="list-none mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-black text-base font-normal mb-2 flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div
                  data-alternate="False"
                  data-icon-position="No icon"
                  data-small="False"
                  data-style="Primary"
                  className="self-stretch px-6 py-3  outline outline-1 outline-black inline-flex justify-center items-center gap-2"
                >
                  <Link to={plan.link} className="justify-start text-black text-base font-normal font-['Roboto'] leading-normal">
                    Начать
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingHome;