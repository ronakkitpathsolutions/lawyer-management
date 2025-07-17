import React, { useMemo } from 'react'
import { Link } from 'react-router'

const NavItem = ({
    url = '/',
    icon: Icon,
    label = 'Nav Item',
    toggle,
    activeKey,
    ...props
}) => {

    const isActive = useMemo(() => {
        const currentPath = window.location.pathname
        return currentPath === url || currentPath.split('/').includes(activeKey)
    }, [activeKey, url])

  return (
    <Link to={url} onClick={toggle} className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive ? 'bg-gray-100 dark:bg-[#1F1F23]' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]'}`}
      {...props}>
      {Icon && <Icon className="h-4 w-4 mr-3 flex-shrink-0" />}
      {label}
    </Link>
  )
}

export default NavItem