import { useContext } from 'react';
import { BreadcrumbContext } from '@/contexts/breadcrumb-context';

// Hook to use the breadcrumb context
export const useBreadcrumbContext = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumbContext must be used within a BreadcrumbProvider');
    }
    return context;
};
