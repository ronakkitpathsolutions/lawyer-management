import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import TopBar from "./topbar";
import useProfileStore from "@/pages/dashboard/profile/use-profile-store";
import useFetchWithAbort from "@/hooks/use-fetch-with-abort";
import useAuth from "@/auth/use-auth";
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";

const DashboardLayout = () => {
  const [isOpen, { toggle }] = useDisclosure(false);
  const { getData } = useProfileStore();
  const [fetchData] = useFetchWithAbort(getData);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchData({ id: user?.id });
    }
  }, [fetchData, user?.id]);

  return (
    <BreadcrumbProvider>
      <div className="flex h-screen w-full">
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <div className="flex flex-1 flex-col overflow-auto">
          <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
            <TopBar toggle={toggle} />
          </header>
          <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-[#0F0F12]">
            <Outlet />
          </main>
        </div>
      </div>
    </BreadcrumbProvider>
  );
};

export default DashboardLayout;
