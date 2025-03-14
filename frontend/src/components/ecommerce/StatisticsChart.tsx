import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";

export default function StatisticsChart() {
  const options: ApexOptions = {
    legend: {
      show: false, // Скрыть легенду
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"], // Определить цвета линий
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", // Установить тип диаграммы на 'line'
      toolbar: {
        show: false, // Скрыть панель инструментов диаграммы
      },
    },
    stroke: {
      curve: "straight", // Определить стиль линии (прямой, сглаженный или ступенчатый)
      width: [2, 2], // Ширина линии для каждого набора данных
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Размер маркеров точек
      strokeColors: "#fff", // Цвет границы маркера
      strokeWidth: 2,
      hover: {
        size: 6, // Размер маркера при наведении
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Скрыть линии сетки по оси x
        },
      },
      yaxis: {
        lines: {
          show: true, // Показать линии сетки по оси y
        },
      },
    },
    dataLabels: {
      enabled: false, // Отключить метки данных
    },
    tooltip: {
      enabled: true, // Включить всплывающие подсказки
      x: {
        format: "dd MMM yyyy", // Формат для всплывающих подсказок по оси x
      },
    },
    xaxis: {
      type: "category", // Основанная на категориях ось x
      categories: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
      axisBorder: {
        show: false, // Скрыть границу оси x
      },
      axisTicks: {
        show: false, // Скрыть отметки оси x
      },
      tooltip: {
        enabled: false, // Отключить всплывающие подсказки для точек оси x
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", // Настроить размер шрифта для меток оси y
          colors: ["#6B7280"], // Цвет меток
        },
      },
      title: {
        text: "", // Удалить заголовок оси y
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Продажи",
      data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
    },
    {
      name: "Доход",
      data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
    },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Статистика
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Цель, которую вы установили на каждый месяц
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}