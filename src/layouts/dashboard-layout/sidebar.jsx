import React, { useCallback } from "react";
import { Menu, Home, UsersIcon, User, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import NavItem from "./nav-item";
import { AUTH_ROUTES, DASHBOARD_ROUTES, MAIN_ROUTES } from "@/routing/routes";
import Confirmation from "@/shared/confirmation";
import useAuth from "@/auth/use-auth";

const Sidebar = () => {
  const [isOpen, { toggle }] = useDisclosure(false);
  const [isLogoutOpen, { open: openLogout, close: closeLogout }] =
    useDisclosure(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = useCallback(() => toggle(), [toggle]);

  const handleLogout = useCallback(() => {
    toggle();
    openLogout();
  }, [openLogout, toggle]);

  const handleFinalLogout = useCallback(() => {
    logout();
    navigate(AUTH_ROUTES.login.url);
  }, [logout, navigate]);

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-3 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={handleNavigation}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-72 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="https://kokonutui.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                LOGO
              </span>
            </div>
          </Link>
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem
                    label="Dashboard"
                    activeKey="dashboard"
                    toggle={handleNavigation}
                    url={DASHBOARD_ROUTES.dashboard.url}
                    icon={Home}
                  />
                  <NavItem
                    label="Clients"
                    activeKey="clients"
                    toggle={handleNavigation}
                    url={MAIN_ROUTES.clients.url}
                    icon={UsersIcon}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <NavItem
              label="Logout"
              type="button"
              icon={LogOutIcon}
              handleClick={handleLogout}
            />
          </div>
        </div>
      </nav>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={toggle}
        />
      )}

      <Confirmation
        open={isLogoutOpen}
        handleClose={closeLogout}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        handleSubmit={handleFinalLogout}
      />
    </>
  );
};

export default Sidebar;
