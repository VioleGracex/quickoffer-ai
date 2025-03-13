import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import SideBar from "../../components/inbox/InboxSideBar";
import InboxBox from "../../components/inbox/InboxBox";

export default function Inbox() {
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Входящие" />
      <div className="min-h-screen px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <SideBar />
          </div>
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <InboxBox />
          </div>
        </div>
      </div>
    </div>
  );
}