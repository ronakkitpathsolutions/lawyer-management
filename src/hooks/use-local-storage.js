import { useState } from "react";
import { errorHandler } from "../utils/helper";

// const [state, setState, removeState] = useLocalStorage("keyName", initialValue);

const useLocalStorage = (dataKey, initialValue) => {
  const key = dataKey;
  const [storedValue, setStoredValue] = useState(() => {
    return errorHandler(
      () => {
        const item = window?.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      },
      () => {
        return initialValue;
      }
    );
  });

  const setValue = (value) => {
    errorHandler(() => {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window?.localStorage.setItem(key, JSON.stringify(valueToStore));
    });
  };

  const removeValue = () => {
    errorHandler(() => {
      window?.localStorage.removeItem(key);
      setStoredValue(undefined);
    });
  };

  const hookData = [storedValue, setValue, removeValue];
  hookData.storedValue = storedValue;
  hookData.setValue = setValue;
  hookData.removeValue = removeValue;
  return hookData;
};

export default useLocalStorage;
