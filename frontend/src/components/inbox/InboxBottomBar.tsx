import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faReplyAll, faForward, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface InboxBottomBarProps {
  emailDetailsView: boolean;
}

export default function InboxBottomBar({ emailDetailsView }: InboxBottomBarProps) {
  return emailDetailsView ? (
    <div className="sticky bottom-0 w-full border-t border-gray-200 dark:border-gray-800 dark:bg-[#171f2f]">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faReply} />
            Ответить
          </button>

          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faReplyAll} />
            Ответить всем
          </button>

          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faForward} />
            Переслать
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="sticky bottom-0 w-full border-t border-gray-200 dark:border-gray-800 dark:bg-[#171f2f]">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Показано 1 из 159</p>
          <div className="flex items-center justify-end gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}