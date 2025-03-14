import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faPaperPlane, faFileAlt, faExclamationTriangle, faTrash, faArchive, faStar, faExclamation, faTag, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] w-full ">
      <div className="pb-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 p-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
          <FontAwesomeIcon icon={faPlus} />
          <span >Compose</span>
        </button>
      </div>

      <div className="no-scrollbar max-h-full  py-6">
        {/*== Inbox Menu Start ==*/}
        <nav className="space-y-5">
          {/*== Mailbox Group Start ==*/}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400">
              MAILBOX
            </h3>

            <ul className="flex flex-col gap-1">
              <li>
                <a href="#" className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-brand-500 bg-brand-50 dark:text-brand-400 dark:bg-brand-500/[0.12]">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faInbox} />
                    <span >Inbox</span>
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
                    <span >Sent</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faFileAlt} />
                    <span >Drafts</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span >Spam</span>
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
                    <span >Trash</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faArchive} />
                    <span >Archive</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/*== Mailbox Group End ==*/}
          
          {/*== Filter Group Start ==*/}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400">
              FILTER
            </h3>

            <ul className="flex flex-col gap-1">
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faStar} />
                    <span >Starred</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faExclamation} />
                    <span >Important</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/*== Filter Group End ==*/}

          {/*== Label Group Start ==*/}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400">
              LABEL
            </h3>

            <ul className="flex flex-col gap-1">
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#12B76A" }} />
                    <span >Personal</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#F04438" }} />
                    <span >Work</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#FD853A" }} />
                    <span >Payments</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#36BFFA" }} />
                    <span >Invoices</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faTag} style={{ color: "#6172F3" }} />
                    <span >Blank</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/*== Label Group End ==*/}
        </nav>
        {/*== Inbox Menu End ==*/}
      </div>
    </div>
  );
}