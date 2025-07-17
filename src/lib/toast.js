import { toast } from "sonner";

// Toast utility functions for consistent usage across the app
export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      duration: 4000,
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      duration: 5000,
      ...options,
    });
  },

  info: (message, options = {}) => {
    toast.info(message, {
      duration: 4000,
      ...options,
    });
  },

  warning: (message, options = {}) => {
    toast.warning(message, {
      duration: 4000,
      ...options,
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      duration: Infinity,
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
  dismiss: toastDismiss,
  dismissById: toastDismissById,
} = showToast;

export default showToast;
