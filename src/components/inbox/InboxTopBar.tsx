import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft, faChevronRight, faCheck, faTrash, faArchive, faReply, faReplyAll, faForward } from "@fortawesome/free-solid-svg-icons";

interface InboxTopBarProps {
  emailDetailsView: boolean;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function InboxTopBar({ emailDetailsView, onBack, onPrev, onNext }: InboxTopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-4">
      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-3">
        {emailDetailsView ? (
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        ) : (
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center">
            <button className="flex h-10 w-10 items-center justify-center rounded-l-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-error-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-error-500">
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-r-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-white">
              <FontAwesomeIcon icon={faArchive} />
            </button>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faReply} />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faReplyAll} />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-end gap-2 mt-3 sm:mt-0">
        <button
          onClick={onPrev}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={onNext}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}