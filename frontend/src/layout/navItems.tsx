import {
    BoxCubeIcon,
    CalenderIcon,
    GridIcon,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
    MailIcon, // Assuming InboxIcon is imported
  } from "../icons";
  
  type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  };
  
  export const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Панель управления",
      subItems: [{ name: "Основная панель", path: "/main-dashboard", pro: false }],
    },
    {
      icon: <UserCircleIcon />,
      name: "Профиль пользователя",
      path: "/profile",
    },
    {
      icon: <MailIcon />,
      name: "Email",
      subItems: [{ name: "Входящие", path: "/inbox", pro: false }],
    },
    {
      name: "Обработка документов",
      icon: <PageIcon />,
      subItems: [
        { name: "OCR", path: "/ocr", pro: false },
        { name: "Форма создания КП", path: "/offer-ai", pro: false },
      ],
    },
    {
      name: "Формы",
      icon: <ListIcon />,
      subItems: [{ name: "Элементы формы", path: "/form-elements", pro: false }],
    },
    {
      name: "Таблицы",
      icon: <TableIcon />,
      subItems: [{ name: "Основные таблицы", path: "/basic-tables", pro: false }],
    },
    {
      icon: <CalenderIcon />,
      name: "Календарь",
      path: "/calendar",
    },
    {
      name: "Страницы",
      icon: <PageIcon />,
      subItems: [
        { name: "Пустая страница", path: "/blank", pro: false },
        { name: "Ошибка 404", path: "/error-404", pro: false },
      ],
    },
  ];
  
  export const othersItems: NavItem[] = [
    {
      icon: <PieChartIcon />,
      name: "Диаграммы",
      subItems: [
        { name: "Линейная диаграмма", path: "/line-chart", pro: false },
        { name: "Гистограмма", path: "/bar-chart", pro: false },
      ],
    },
    {
      icon: <BoxCubeIcon />,
      name: "Элементы UI",
      subItems: [
        { name: "Оповещения", path: "/alerts", pro: false },
        { name: "Аватары", path: "/avatars", pro: false },
        { name: "Значок", path: "/badge", pro: false },
        { name: "Кнопки", path: "/buttons", pro: false },
        { name: "Изображения", path: "/images", pro: false },
        { name: "Видео", path: "/videos", pro: false },
      ],
    },
    {
      icon: <PlugInIcon />,
      name: "Аутентификация",
      subItems: [
        { name: "Вход", path: "/signin", pro: false },
        { name: "Регистрация", path: "/signup", pro: false },
      ],
    },
  ];