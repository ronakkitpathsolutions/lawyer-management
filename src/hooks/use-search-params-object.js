import { useSearchParams } from "react-router";

const useSearchParamsObject = () => {
  const [searchParams] = useSearchParams();
  return Object.fromEntries(searchParams.entries());
};

export default useSearchParamsObject;
