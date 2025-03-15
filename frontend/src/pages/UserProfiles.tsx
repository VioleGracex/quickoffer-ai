import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import useAuth from "../routes/useAuth";
import { useEffect, useState } from "react";
import PageMeta from "../components/common/PageMeta";

export default function UserProfiles() {
  const { user, fetchUserDetails, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user === null) {
      fetchUserDetails(token).finally(() => setLoading(false));
    }
  }, [fetchUserDetails,user ]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <PageMeta
        title="React.js Профильная Панель | TailAdmin - Шаблон Административной Панели на Next.js"
        description="Это страница Профильной Панели на React.js для TailAdmin - Шаблон Административной Панели на React.js и Tailwind CSS"
      />
      <PageBreadcrumb pageTitle="Профиль" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={user} updateUser={updateUser} />
          <UserInfoCard user={user} updateUser={updateUser} />
          
        </div>
      </div>
    </>
  );
}