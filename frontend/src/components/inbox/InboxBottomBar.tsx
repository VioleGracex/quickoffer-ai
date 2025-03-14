import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faReplyAll, faForward, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface InboxBottomBarProps {
  emailDetailsView: boolean;
}

export default function InboxBottomBar({ emailDetailsView }: InboxBottomBarProps) {
  return emailDetailsView ? (
    <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#171f2f]">
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          <FontAwesomeIcon icon={faReply} />
          Reply
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          <FontAwesomeIcon icon={faReplyAll} />
          Reply all
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          <FontAwesomeIcon icon={faForward} />
          Forward
        </button>
      </div>
    </div>
  ) : (
    <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-[#171f2f]">
      <p className="text-sm text-gray-500 dark:text-gray-400">Showing 1 of 159</p>
      <div className="flex items-center justify-end gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}