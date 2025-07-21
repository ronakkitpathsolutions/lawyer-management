import React from "react";
import { Link, useLocation, useParams } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Route-based breadcrumb configuration
 */
const ROUTE_BREADCRUMB_CONFIG = {
    "/dashboard": [
        { label: "Dashboard", href: "/dashboard", isActive: true }
    ],
    "/clients": [
        { label: "Dashboard", href: "/dashboard", isActive: false },
        { label: "Clients", href: "/clients", isActive: true }
    ],
    "/clients/:id": [
        { label: "Dashboard", href: "/dashboard", isActive: false },
        { label: "Clients", href: "/clients", isActive: false },
        { label: "Client Details", href: null, isActive: true, isDynamic: true }
    ],
    "/clients/edit/:id": [
        { label: "Dashboard", href: "/dashboard", isActive: false },
        { label: "Clients", href: "/clients", isActive: false },
        { label: "Client Details", href: "/clients/:id", isActive: false, isDynamic: true },
        { label: "Edit Client", href: null, isActive: true, isDynamic: true }
    ],
    "/profile": [
        { label: "Dashboard", href: "/dashboard", isActive: false },
        { label: "Profile", href: "/profile", isActive: true }
    ]
};

/**
 * Tab-specific breadcrumb labels for client information
 */
const CLIENT_TAB_LABELS = {
    personal: "Personal Information",
    property: "Property Information",
    visa: "Visa Information"
};

/**
 * Generate breadcrumbs based on current route
 */
const generateRouteBreadcrumbs = (pathname, params = {}, clientData = null, activeTab = null) => {
    // Find matching route pattern
    let matchedConfig = null;

    // Try exact match first
    if (ROUTE_BREADCRUMB_CONFIG[pathname]) {
        matchedConfig = ROUTE_BREADCRUMB_CONFIG[pathname];
    } else {
        // Try pattern matching for dynamic routes
        for (const [pattern, config] of Object.entries(ROUTE_BREADCRUMB_CONFIG)) {
            if (pattern.includes(':')) {
                const patternRegex = pattern.replace(/:[\w]+/g, '[^/]+');
                const regex = new RegExp(`^${patternRegex}$`);
                if (regex.test(pathname)) {
                    matchedConfig = config;
                    break;
                }
            }
        }
    }

    if (!matchedConfig) {
        return [{ label: "Dashboard", href: "/dashboard", isActive: true }];
    }

    // Process the matched configuration
    const breadcrumbs = matchedConfig.map((item, index) => {
        let processedItem = { ...item };

        // Handle dynamic items
        if (item.isDynamic && params.id) {
            if (item.label === "Client Details") {
                processedItem.label = clientData?.name || `Client ${params.id}`;
                if (item.href) {
                    processedItem.href = item.href.replace(':id', params.id);
                }
            } else if (item.label === "Edit Client") {
                processedItem.label = `Edit ${clientData?.name || `Client ${params.id}`}`;
            }
        }

        // Update active states - only the last item should be active initially
        processedItem.isActive = index === matchedConfig.length - 1;

        return processedItem;
    });

    // Add tab breadcrumb for client information pages
    if (activeTab && pathname.includes('/clients/') && CLIENT_TAB_LABELS[activeTab]) {
        // Make the previous last item non-active
        if (breadcrumbs.length > 0) {
            breadcrumbs[breadcrumbs.length - 1].isActive = false;
        }

        breadcrumbs.push({
            label: CLIENT_TAB_LABELS[activeTab],
            href: null,
            isActive: true
        });
    }

    return breadcrumbs;
};

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
    showHomeIcon = true,
    maxItems = 4,
    className = "",
    homeHref = "/dashboard",
    clientData = null,
    activeTab = null
}) => {
    const location = useLocation();
    const params = useParams();

    // Generate breadcrumbs based on current route
    const items = generateRouteBreadcrumbs(location.pathname, params, clientData, activeTab);

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
const CompactBreadcrumb = ({ clientData = null, activeTab = null, className = "" }) => {
    const location = useLocation();
    const params = useParams();

    // Generate breadcrumbs and show only the last item
    const items = generateRouteBreadcrumbs(location.pathname, params, clientData, activeTab);

    if (!items || items.length === 0) {
        return null;
    }

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
    showHomeIcon = true,
    maxItems = 4,
    homeHref = "/dashboard",
    className = "",
    clientData = null,
    activeTab = null
}) => {
    return (
        <>
            {/* Desktop breadcrumb */}
            <div className="hidden lg:block">
                <Breadcrumb
                    showHomeIcon={showHomeIcon}
                    maxItems={maxItems}
                    homeHref={homeHref}
                    className={className}
                    clientData={clientData}
                    activeTab={activeTab}
                />
            </div>

            {/* Mobile breadcrumb */}
            <div className="block lg:hidden">
                <CompactBreadcrumb
                    className={className}
                    clientData={clientData}
                    activeTab={activeTab}
                />
            </div>
        </>
    );
};

export default ResponsiveBreadcrumb;
export { Breadcrumb, CompactBreadcrumb, BreadcrumbItem, BreadcrumbSeparator };
