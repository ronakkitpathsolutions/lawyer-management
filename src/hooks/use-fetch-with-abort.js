import { useCallback, useRef, useEffect } from "react";

// const [fetchData] = useApiWithAbort(apiFunction);

const useFetchWithAbort = (apiFunction) => {
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(
    (configs) => {
      // Abort the previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      const signal = controller.signal;

      apiFunction({ signal, ...configs });

      return () => {
        controller.abort();
      };
    },
    [apiFunction]
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return [fetchData];
};

export default useFetchWithAbort;
