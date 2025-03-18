import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faPaperPlane, faFileAlt, faExclamationTriangle, faTrash, faArchive, faStar, faExclamation, faTag, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] w-full ">
      <div className="pb-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 p-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
          <FontAwesomeIcon icon={faPlus} />
          <span>Создать</span>
        </button>
      </div>

      <div className="no-scrollbar max-h-full py-6">
        {/*== Начало меню почты ==*/}
        <nav className="space-y-5">
          {/*== Начало группы почтовых ящиков ==*/}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400">
              ПОЧТОВЫЙ ЯЩИК
            </h3>

            <ul className="flex flex-col gap-1">
              <li>
                <a href="#" className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-brand-500 bg-brand-50 dark:text-brand-400 dark:bg-brand-500/[0.12]">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faInbox} />
                    <span>Входящие</span>
                  </span>
                  <span className="text-brand-500 dark:text-brand-400">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>Отправленные</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faFileAlt} />
                    <span>Черновики</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span>Спам</span>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-brand-500 dark:group-hover:text-brand-400">
                    2
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Корзина</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faArchive} />
                    <span>Архив</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/*== Конец группы почтовых ящиков ==*/}
          
          {/*== Начало группы фильтров ==*/}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400">
              ФИЛЬТР
            </h3>

            <ul className="flex flex-col gap-1">
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faStar} />
                    <span>Избранное</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faExclamation} />
                    <span>Важное</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/*== Конец группы фильтров ==*/}

          {/*== Начало группы меток ==*/}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400">
              МЕТКА
            </h3>

            <ul className="flex flex-col gap-1">
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#12B76A" }} />
                    <span>Личное</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#F04438" }} />
                    <span>Работа</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#FD853A" }} />
                    <span>Платежи</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#36BFFA" }} />
                    <span>Счета</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#6172F3" }} />
                    <span>Пусто</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/*== Конец группы меток ==*/}
        </nav>
        {/*== Конец меню почты ==*/}
      </div>
    </div>
  );
}