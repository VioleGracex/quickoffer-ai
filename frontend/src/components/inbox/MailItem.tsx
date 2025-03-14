import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar, faCheck } from "@fortawesome/free-solid-svg-icons";

interface MailItemProps {
  id: number;
  subject: string;
  content: string;
  time: string;
  onClick: () => void;
}

export default function MailItem({ id, subject, content, time, onClick }: MailItemProps) {
  return (
    <div onClick={onClick} className="flex cursor-pointer items-center border-b border-gray-200 px-4 py-4 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/[0.03]">
      <div className="flex w-3/5 items-center sm:w-1/5">
        <label htmlFor={`checkbox-${id}`} className="cursor-pointer select-none">
          <span className="relative">
            <input type="checkbox" id={`checkbox-${id}`} className="tableCheckbox sr-only" />
            <span className="box mr-3 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300 bg-transparent text-white dark:border-gray-700">
              <span className="opacity-0">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </span>
          </span>
        </label>

        <div className="flex items-center">
          <span className="pr-3 text-gray-400">
            <FontAwesomeIcon icon={faStarRegular} className="block" />
            <FontAwesomeIcon icon={faStar} className="hidden" />
          </span>

          <span className="truncate text-sm text-gray-700 dark:text-gray-400">
            {subject}
          </span>
        </div>
      </div>
      <div className="flex w-1/5 items-center gap-3 sm:w-3/5">
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {content}
        </p>
      </div>
      <div className="w-1/5">
        <span className="block text-right text-theme-xs text-gray-400">
          {time}
        </span>
      </div>
    </div>
  );
}