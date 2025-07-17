import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import TopBar from "./topbar";
import useProfileStore from "@/pages/dashboard/profile/use-profile-store";
import useFetchWithAbort from "@/hooks/use-fetch-with-abort";
import useAuth from "@/auth/use-auth";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { getData } = useProfileStore();
  const [fetchData] = useFetchWithAbort(getData);

  const { user } = useAuth();

  console.log('user :', user)

  useEffect(() => {
    if (user?.id) {
      fetchData({ id: user?.id });
    }
  }, [fetchData, user?.id]);

  return (
    <div className={`flex h-screen`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopBar />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
