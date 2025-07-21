import React, { createContext, useState } from 'react';

// Create the context
const BreadcrumbContext = createContext();

// Provider component
export const BreadcrumbProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [customBreadcrumbs, setCustomBreadcrumbs] = useState([]);

    const updateBreadcrumbContext = (data) => {
        if (data.activeTab !== undefined) setActiveTab(data.activeTab);
        if (data.clientData !== undefined) setClientData(data.clientData);
        if (data.customBreadcrumbs !== undefined) setCustomBreadcrumbs(data.customBreadcrumbs);
    };

    const clearBreadcrumbContext = () => {
        setActiveTab(null);
        setClientData(null);
        setCustomBreadcrumbs([]);
    };

    return (
        <BreadcrumbContext.Provider
            value={{
                activeTab,
                clientData,
                customBreadcrumbs,
                setActiveTab,
                setClientData,
                setCustomBreadcrumbs,
                updateBreadcrumbContext,
                clearBreadcrumbContext,
            }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
};

// Export the context for use in hooks
export { BreadcrumbContext };
