import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ResponsiveBreadcrumb from "@/shared/breadcrumb";
import { User, Shield, ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import useProfileStore from "@/pages/dashboard/profile/use-profile-store";
import { MAIN_ROUTES } from "@/routing/routes";
import { getUserInitials } from "@/utils/helper";
import { useBreadcrumbData } from "@/hooks/use-breadcrumb-data";

const TopBar = ({ toggle }) => {
  const { data } = useProfileStore();
  const navigate = useNavigate();
  const { clientData, activeTab } = useBreadcrumbData();

  const handleNavigation = () => {
    navigate(MAIN_ROUTES.profile.url);
  };

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] h-full border-b border-gray-200 dark:border-[#1F1F23]">
      <div className="flex gap-4 items-center" >
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg bg-[#111827] dark:bg-[#111827] shadow-md"
          onClick={toggle}
        >
          <Menu className="h-5 w-5 text-white dark:text-white" />
        </button>
        <ResponsiveBreadcrumb
          maxItems={4}
          className="max-w-[300px] lg:max-w-none"
          clientData={clientData}
          activeTab={activeTab}
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-3 p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={data?.profile || ""}
                  alt={data?.name || "User Avatar"}
                />
                <AvatarFallback className="font-medium bg-primary text-primary-foreground">
                  {getUserInitials(data?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {data?.name || "User"}
                  </span>
                  {data?.role && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium capitalize">
                        {data.role}
                      </span>
                    </div>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={2}
            className="w-[220px] bg-background border-border rounded-lg shadow-lg"
          >
            {/* User Info Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={data?.profile || "/default-avatar.png"}
                    alt={data?.name || "User Avatar"}
                  />
                  <AvatarFallback className="font-medium">
                    {getUserInitials(data?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {data?.name || "User"}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {data?.email || ""}
                  </p>
                  {data?.role && (
                    <div className="flex items-center gap-1 mt-1">
                      <Shield className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium capitalize">
                        {data.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-1">
              <DropdownMenuItem
                onClick={handleNavigation}
                className="cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              >
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">View Profile</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default TopBar;
