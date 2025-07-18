import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, User, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useProfileStore from "@/pages/dashboard/profile/use-profile-store";
import { MAIN_ROUTES } from "@/routing/routes";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

const TopBar = () => {
  const { data } = useProfileStore();
  const navigate = useNavigate();

  const  handleNavigation = () => {
    navigate(MAIN_ROUTES.profile.url)
  }

  // Function to get user initials for avatar fallback
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] h-full">
      <div className="font-medium text-sm hidden lg:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2 p-1.5 transition-colors cursor-pointer">
              <Avatar className="w-10 h-10">
                  <AvatarFallback className="font-medium">
                    {getUserInitials(data?.name)}
                  </AvatarFallback>
                </Avatar>
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
              <DropdownMenuItem onClick={handleNavigation} className="cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                <User className="h-4 w-4 mr-2 text-gray-500" />
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
