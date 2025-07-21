import { useBreadcrumbContext } from './use-breadcrumb-context';

export const useBreadcrumbData = () => {
    let clientData = null;
    let activeTab = null;

    try {
        const context = useBreadcrumbContext();
        clientData = context.clientData;
        activeTab = context.activeTab;
    } catch {
        // Context not available, return null values
    }

    return {
        clientData,
        activeTab
    };
};
