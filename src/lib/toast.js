import { toast } from "sonner";

// Toast utility functions for consistent usage across the app
export const showToast = {
    success: (message, options = {}) => {
        toast.success(message, {
            duration: 4000,
            className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800/30",
            ...options,
        });
    },

    error: (message, options = {}) => {
        toast.error(message, {
            duration: 5000,
            className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800/30",
            ...options,
        });
    },

    info: (message, options = {}) => {
        toast.info(message, {
            duration: 4000,
            className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800/30",
            ...options,
        });
    },

    warning: (message, options = {}) => {
        toast.warning(message, {
            duration: 4000,
            className: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800/30",
            ...options,
        });
    },

    loading: (message, options = {}) => {
        return toast.loading(message, {
            duration: Infinity,
            className: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800/30",
            ...options,
        });
    },

    promise: (promise, messages, options = {}) => {
        return toast.promise(promise, {
            loading: messages.loading || "Loading...",
            success: messages.success || "Success!",
            error: messages.error || "Something went wrong",
            duration: 4000,
            ...options,
        });
    },

    custom: (message, options = {}) => {
        return toast(message, {
            duration: 4000,
            ...options,
        });
    },

    // Variant-specific toasts with different opacity levels
    variants: {
        success: {
            light: (message, options = {}) => toast.success(message, {
                duration: 4000,
                className: "bg-green-50/60 text-green-600 border-green-200/60 dark:bg-green-950/10 dark:text-green-300 dark:border-green-800/20",
                ...options,
            }),
            medium: (message, options = {}) => toast.success(message, {
                duration: 4000,
                className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800/30",
                ...options,
            }),
            strong: (message, options = {}) => toast.success(message, {
                duration: 4000,
                className: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/30 dark:text-green-300 dark:border-green-700/40",
                ...options,
            }),
        },
        error: {
            light: (message, options = {}) => toast.error(message, {
                duration: 5000,
                className: "bg-red-50/60 text-red-600 border-red-200/60 dark:bg-red-950/10 dark:text-red-300 dark:border-red-800/20",
                ...options,
            }),
            medium: (message, options = {}) => toast.error(message, {
                duration: 5000,
                className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800/30",
                ...options,
            }),
            strong: (message, options = {}) => toast.error(message, {
                duration: 5000,
                className: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/30 dark:text-red-300 dark:border-red-700/40",
                ...options,
            }),
        },
        warning: {
            light: (message, options = {}) => toast.warning(message, {
                duration: 4000,
                className: "bg-yellow-50/60 text-yellow-600 border-yellow-200/60 dark:bg-yellow-950/10 dark:text-yellow-300 dark:border-yellow-800/20",
                ...options,
            }),
            medium: (message, options = {}) => toast.warning(message, {
                duration: 4000,
                className: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800/30",
                ...options,
            }),
            strong: (message, options = {}) => toast.warning(message, {
                duration: 4000,
                className: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-700/40",
                ...options,
            }),
        },
        info: {
            light: (message, options = {}) => toast.info(message, {
                duration: 4000,
                className: "bg-blue-50/60 text-blue-600 border-blue-200/60 dark:bg-blue-950/10 dark:text-blue-300 dark:border-blue-800/20",
                ...options,
            }),
            medium: (message, options = {}) => toast.info(message, {
                duration: 4000,
                className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800/30",
                ...options,
            }),
            strong: (message, options = {}) => toast.info(message, {
                duration: 4000,
                className: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-700/40",
                ...options,
            }),
        },
    },

    // Dismiss all toasts
    dismiss: () => {
        toast.dismiss();
    },

    // Dismiss specific toast by ID
    dismissById: (id) => {
        toast.dismiss(id);
    },
};

// Export individual toast methods for direct import if preferred
export const {
    success: toastSuccess,
    error: toastError,
    info: toastInfo,
    warning: toastWarning,
    loading: toastLoading,
    promise: toastPromise,
    custom: toastCustom,
    variants: toastVariants,
    dismiss: toastDismiss,
    dismissById: toastDismissById,
} = showToast;

export default showToast;
