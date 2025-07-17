import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../utils/constants";
// import { notifications } from "@mantine/notifications"; // Removed Mantine notifications
import { apiAsyncHandler } from "../utils/helper";
import { useTimeout } from "@mantine/hooks";
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

  const { start, clear } = useTimeout(() => setNotificationUi(null), 4000);

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
            // Replace with custom toast notification or console.log
            console.error(`${notification?.title}: ${message}`);
          } else {
            if (autoHide) {
              clear();
              start();
            }
            setNotificationUi(
                // integrate shadcn sooner
              <div>
                <strong>{notification?.title}</strong>
                <p>{message}</p>
              </div>
            );
          }
        }

        return null;
      },
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  const hookData = [executeOperation, loading, notificationUi];
  hookData.executeOperation = executeOperation;
  hookData.loading = loading;
  return hookData;
};

export default useAsyncOperation;