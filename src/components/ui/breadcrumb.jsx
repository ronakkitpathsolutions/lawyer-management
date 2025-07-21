import React from "react";
import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Individual breadcrumb item component
 */
const BreadcrumbItem = ({ item }) => {
    const baseClasses = "text-sm transition-colors truncate";
    const activeClasses = "text-gray-900 dark:text-gray-100 font-medium";
    const inactiveClasses = "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100";

    if (item.href && !item.isActive) {
        return (
            <Link
                to={item.href}
                className={cn(baseClasses, inactiveClasses)}
                title={item.label}
            >
                {item.label}
            </Link>
        );
    }

    return (
        <span
            className={cn(baseClasses, item.isActive ? activeClasses : inactiveClasses)}
            title={item.label}
        >
            {item.label}
        </span>
    );
};

/**
 * Breadcrumb separator component
 */
const BreadcrumbSeparator = () => (
    <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 mx-1 flex-shrink-0" />
);

/**
 * Main Breadcrumb component
 */
const Breadcrumb = ({
    items = [],
    showHomeIcon = true,
    maxItems = 4,
    className = "",
    homeHref = "/dashboard"
}) => {
    if (!items || items.length === 0) {
        return null;
    }

    // Collapse breadcrumbs if there are too many items
    const shouldCollapse = items.length > maxItems;
    let displayItems = items;

    if (shouldCollapse) {
        // Keep first item, ellipsis, and last 2 items
        const firstItem = items[0];
        const lastItems = items.slice(-2);

        displayItems = [
            firstItem,
            { label: "...", href: null, isActive: false, isEllipsis: true },
            ...lastItems
        ];
    }

    return (
        <nav
            className={cn(
                "flex items-center space-x-1 text-sm font-medium overflow-hidden",
                className
            )}
            aria-label="Breadcrumb"
        >
            {/* Home icon (optional) */}
            {showHomeIcon && (
                <>
                    <Link
                        to={homeHref}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex-shrink-0"
                        title="Home"
                    >
                        <Home className="h-4 w-4" />
                    </Link>
                    {displayItems.length > 0 && <BreadcrumbSeparator />}
                </>
            )}

            {/* Breadcrumb items */}
            {displayItems.map((item, index) => {
                const isLast = index === displayItems.length - 1;

                return (
                    <div key={`${item.label}-${index}`} className="flex items-center min-w-0">
                        {/* Ellipsis indicator */}
                        {item.isEllipsis ? (
                            <span className="text-gray-400 dark:text-gray-500 px-1">
                                {item.label}
                            </span>
                        ) : (
                            <BreadcrumbItem item={item} />
                        )}

                        {/* Separator */}
                        {!isLast && <BreadcrumbSeparator />}
                    </div>
                );
            })}
        </nav>
    );
};

/**
 * Compact breadcrumb for mobile devices
 */
const CompactBreadcrumb = ({ items = [], className = "" }) => {
    if (!items || items.length === 0) {
        return null;
    }

    // Show only the last item on mobile
    const lastItem = items[items.length - 1];

    return (
        <div className={cn("flex items-center", className)}>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {lastItem.label}
            </span>
        </div>
    );
};

/**
 * Responsive breadcrumb that shows full breadcrumb on desktop and compact on mobile
 */
const ResponsiveBreadcrumb = ({
    items = [],
    showHomeIcon = true,
    maxItems = 4,
    homeHref = "/dashboard",
    className = ""
}) => {
    return (
        <>
            {/* Desktop breadcrumb */}
            <div className="hidden lg:block">
                <Breadcrumb
                    items={items}
                    showHomeIcon={showHomeIcon}
                    maxItems={maxItems}
                    homeHref={homeHref}
                    className={className}
                />
            </div>

            {/* Mobile breadcrumb */}
            <div className="block lg:hidden">
                <CompactBreadcrumb
                    items={items}
                    className={className}
                />
            </div>
        </>
    );
};

export default Breadcrumb;
export { BreadcrumbItem, BreadcrumbSeparator, CompactBreadcrumb, ResponsiveBreadcrumb };
