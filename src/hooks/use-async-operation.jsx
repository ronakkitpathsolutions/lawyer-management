import { useState } from "react";
import { ERROR_MESSAGES } from "../utils/constants";
import { apiAsyncHandler, toastError } from "../utils/helper";
import { ICONS } from "../assets/icons";

// const [submitFunction, loading] = useAsyncOperation(apiFunction,handleError,{options});

const useAsyncOperation = (
  operation,
  handleError,
  options = {
    notification: { title: "", message: "" },
    notificationType: "toast", // toast | default
    autoHide: false,
  }
) => {
  const [loading, setLoading] = useState(false);
  const [notificationUi, setNotificationUi] = useState(null);

  const executeOperation = async (params) => {
    setLoading(true);
    return await apiAsyncHandler(
      async () => {
        const result = await operation(params);
        return result;
      },
      (error) => {
        const {
          notificationType = "toast",
          notification,
          autoHide,
        } = options || {};

        let isHandled = false;
        const message = error?.message || ERROR_MESSAGES.common;

        if (handleError && typeof handleError === "function") {
          isHandled = handleError(error);
        }

        if (!isHandled) {
          if (notificationType === "toast") {
            // Use Sonner toast for error notifications
            const title = notification?.title || "Error";
            toastError(`${title}: ${message}`);
          } else {
            // For non-toast notifications, create a simple error display
            setNotificationUi(
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ICONS.IconAlertSquare className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {notification?.title || "Error"}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{message}</p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <button
                          type="button"
                          className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                          onClick={() => {
                            setNotificationUi(null);
                          }}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
            
            // Auto-hide after 4 seconds if autoHide is enabled
            if (autoHide) {
              setTimeout(() => {
                setNotificationUi(null);
              }, 4000);
            }
          }
        }

        return null;
      },
      () => {
        setLoading(false);
      }
    );
  };

  const hookData = [executeOperation, loading, notificationUi];
  hookData.executeOperation = executeOperation;
  hookData.loading = loading;
  return hookData;
};

export default useAsyncOperation;