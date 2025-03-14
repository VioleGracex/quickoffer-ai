import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faEye } from "@fortawesome/free-solid-svg-icons";

// Определение интерфейса TypeScript для строк таблицы
interface Product {
  id: number; // Уникальный идентификатор для каждого продукта
  name: string; // Название продукта
  variants: string; // Количество вариантов (например, "1 Вариант", "2 Варианта")
  category: string; // Категория продукта
  price: string; // Цена продукта (в виде строки с символом валюты)
  image: string; // URL или путь к изображению продукта
  status: "Доставлено" | "В ожидании" | "Отменено"; // Статус продукта
}

// Определение данных таблицы с использованием интерфейса
const tableData: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 13”",
    variants: "2 Варианта",
    category: "Ноутбук",
    price: "$2399.00",
    status: "Доставлено",
    image: "/images/product/product-01.jpg", // Замените на фактический URL изображения
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "1 Вариант",
    category: "Часы",
    price: "$879.00",
    status: "В ожидании",
    image: "/images/product/product-02.jpg", // Замените на фактический URL изображения
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    variants: "2 Варианта",
    category: "Смартфон",
    price: "$1869.00",
    status: "Доставлено",
    image: "/images/product/product-03.jpg", // Замените на фактический URL изображения
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    variants: "2 Варианта",
    category: "Электроника",
    price: "$1699.00",
    status: "Отменено",
    image: "/images/product/product-04.jpg", // Замените на фактический URL изображения
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    variants: "1 Вариант",
    category: "Аксессуары",
    price: "$240.00",
    status: "Доставлено",
    image: "/images/product/product-05.jpg", // Замените на фактический URL изображения
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Последние заказы
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faSliders} className="text-gray-500 dark:text-gray-400" />
            Фильтр
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faEye} className="text-gray-500 dark:text-gray-400" />
            Смотреть все
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Заголовок таблицы */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Продукты
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Категория
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Цена
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Статус
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Тело таблицы */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.category}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Доставлено"
                        ? "success"
                        : product.status === "В ожидании"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}