import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useBreadcrumbContext } from './use-breadcrumb-context';

export const useClientBreadcrumb = (activeTab = null, clientData = null) => {
    const params = useParams();
    const { setActiveTab, setClientData } = useBreadcrumbContext();

    // Update active tab in breadcrumb context
    useEffect(() => {
        if (activeTab) {
            setActiveTab(activeTab);
        }
    }, [activeTab, setActiveTab]);

    // Update client data in breadcrumb context
    useEffect(() => {
        if (clientData && params.id) {
            const breadcrumbClientData = {
                id: params.id,
                name: clientData.name || clientData.family_name
                    ? `${clientData.name || ''}`.trim()
                    : `Client ${params.id}`,
                email: clientData.email
            };
            setClientData(breadcrumbClientData);
        }
    }, [clientData, params.id, setClientData]);

    // Clear breadcrumb data when component unmounts
    useEffect(() => {
        return () => {
            setActiveTab(null);
            if (!params.id) {
                setClientData(null);
            }
        };
    }, [params.id, setActiveTab, setClientData]);
};
