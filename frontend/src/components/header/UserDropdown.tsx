import React, { useEffect, useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faQuestionCircle, faSignOutAlt, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../routes/auth_api";

const dropdownItems = [
  {
    to: "/profile",
    icon: faUser,
    label: "Редактировать профиль",
  },
  {
    to: "/settings",
    icon: faCog,
    label: "Настройки учетной записи",
  },
  {
    to: "/support",
    icon: faQuestionCircle,
    label: "Поддержка",
  },
];

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, fetchUserDetails, signOut } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user === null) {
      fetchUserDetails(token);
    }
  }, [fetchUserDetails, user]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          {user?.avatar ? (
            <img src={user.avatar} alt="Пользователь" />
          ) : (
            <span className="text-gray-800 dark:text-white text-xl font-semibold">
              {user?.first_name?.charAt(0)}
            </span>
          )}
        </span>
        <span className="block mr-1 font-medium text-theme-sm">{user?.first_name}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <DropdownItem
                onItemClick={closeDropdown}
                tag="a"
                to={item.to}
                className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="group-hover:text-gray-700 dark:group-hover:text-gray-300"
                />
                {item.label}
              </DropdownItem>
            </li>
          ))}
        </ul>
        <Link
          to="/signin"
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="group-hover:text-gray-700 dark:group-hover:text-gray-300"
          />
          Выйти
        </Link>
      </Dropdown>
    </div>
  );
}