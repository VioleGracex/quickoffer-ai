import {
    GridIcon,
    PageIcon,
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
    
  ];
  
  export const othersItems: NavItem[] = [
    
  ];