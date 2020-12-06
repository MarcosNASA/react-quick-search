import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes, selectSearchItems, search } from "./quickSearchSlice";
import { debounceFn } from "../../utils/utils";
import { useSafeDispatch } from "../../utils/hooks";

function useAbortedDebouncedAsync(debounce = 0) {
  const previousController = React.useRef();

  const { data = [], error, status } = useSelector(selectSearchItems);
  const dispatch = useDispatch();
  const debouncedDispatch = React.useMemo(() => {
    return debounceFn(dispatch, debounce);
  }, [dispatch, debounce]);
  const safeDebouncedDispatch = useSafeDispatch(debouncedDispatch);
  const safeInstantDispatch = useSafeDispatch(dispatch);
  const safeDispatch = debounce ? safeDebouncedDispatch : safeInstantDispatch;

  const setData = React.useCallback(
    (data) =>
      safeDispatch(
        search({
          type: actionTypes.SEARCH_RESOLVED,
          data,
        })
      ),
    [safeDispatch]
  );
  const setPending = React.useCallback(
    () =>
      safeInstantDispatch(
        search({
          type: actionTypes.SEARCH_PENDING,
        })
      ),
    [safeInstantDispatch]
  );
  const setError = React.useCallback(
    (error) =>
      safeInstantDispatch(
        search({
          type: actionTypes.SEARCH_REJECTED,
          error: error,
          data: [],
        })
      ),
    [safeInstantDispatch]
  );
  const reset = React.useCallback(
    () => safeInstantDispatch(search({ type: actionTypes.SEARCH_EMPTY })),
    [safeInstantDispatch]
  );

  const run = React.useCallback(
    (search, query) => {
      if (typeof search !== "function") {
        throw new Error(
          `The first argument passed to useQuickSearch() must be a function.`
        );
      }

      if (previousController.current) {
        previousController.current.abort();
      }

      if (!query) {
        reset();
        return;
      }

      setPending();
      const controller = new AbortController();
      const { signal } = controller;
      previousController.current = controller;
      return search(query, signal);
    },
    [setPending, reset]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
    data,
    status,
    error,
    setData,
    setError,
    run,
    reset,
  };
}

function useQuickSearch(debounce) {
  const {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    data,
    status,
    error,
    setData,
    setError,
    run,
    reset,
  } = useAbortedDebouncedAsync(debounce);
  const [query, setQuery] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const isDropDownVisible = Boolean(query) || (!isIdle && isFocused);

  return {
    data,
    error,
    query,
    isDropDownVisible,
    isInputFocused: isFocused,
    setData,
    setError,
    setQuery,
    setIsFocused,
    reset,
    run,
    status,
    isIdle,
    isLoading,
    isError,
    isSuccess,
  };
}

export { useQuickSearch };
