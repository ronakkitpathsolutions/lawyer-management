import React from "react";
import { Link } from "react-router";

const NavItem = ({
  url = "/",
  icon: Icon,
  type = "link",
  label = "Nav Item",
  handleClick,
  toggle,
  activeKey,
  ...props
}) => {
  const isActive =
    window.location.pathname === url ||
    window.location.pathname.split("/").includes(activeKey);

  return type === "button" ? (
    <button
      className={`flex items-center px-3 py-2 text-sm w-full rounded-md transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-gray-300 hover:text-white hover:bg-[#111827]"
      }`}
      onClick={handleClick}
    >
      {Icon && <Icon className="h-4 w-4 mr-3 flex-shrink-0" />}
      {label}
    </button>
  ) : (
    <Link
      to={url}
      onClick={toggle}
      className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-gray-300 hover:text-white hover:bg-[#111827]"
      }`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 mr-3 flex-shrink-0" />}
      {label}
    </Link>
  );
};

export default NavItem;
