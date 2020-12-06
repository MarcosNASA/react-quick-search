/* eslint-disable no-func-assign */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes, selectSearchItems, search } from "./quickSearchSlice";
import {
  SearchForm,
  SearchInput,
  SearchInputIcon,
  SearchIcon,
  SpinnerIcon,
  ErrorIcon,
  DropdownListWrapper,
  DropdownList,
  DropdownItem,
} from "../lib";
import { mapItems } from "../../utils/api";
import { debounceFn } from "../../utils/utils";

const handleChange = (setQuery) => (event) => {
  const newQuery = event.target.value;
  setQuery(newQuery);
};
const handleFocus = (setIsFocused) => () => {
  setIsFocused(true);
};
const handleBlur = (setIsFocused) => () => {
  setTimeout(() => {
    setIsFocused(false);
  }, 300);
};

function QuickSearchInput({
  isIdle,
  isPending,
  isSuccess,
  isError,
  error,
  ...props
}) {
  return (
    <SearchForm>
      <SearchInput {...props} />
      <SearchInputIcon>
        {(isIdle || isSuccess) && <SearchIcon />}
        {isPending && <SpinnerIcon />}
        {isError && <ErrorIcon title={error} />}
      </SearchInputIcon>
    </SearchForm>
  );
}
function getQuickSearchInputProps(props) {
  return {
    placeholder: "Quick search...",
    tabIndex: "0",
    ...props,
  };
}

function QuickSearchDropDownItem({ children, ...props }) {
  return <DropdownItem {...props}>{children}</DropdownItem>;
}
function getDropdownItemProps() {}
QuickSearchDropDownItem = React.memo(QuickSearchDropDownItem);

const DropdownListDirections = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
function QuickSearchDropDownList({ children, ...props }) {
  return (
    <DropdownListWrapper>
      <DropdownList {...props}>{children}</DropdownList>
    </DropdownListWrapper>
  );
}
function getDropdownListProps(props) {
  return {
    direction: DropdownListDirections.RIGHT,
    ...props,
  };
}
QuickSearchDropDownList = React.memo(QuickSearchDropDownList);

function useQuickSearch({ searchItems, options }) {
  const previousController = React.useRef();
  const [query, setQuery] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const { value: items = [], error, status } = useSelector(selectSearchItems);
  const dispatch = useDispatch();
  const { debounce } = options;
  const debouncedDispatch = React.useMemo(() => {
    return debounceFn(dispatch, debounce ?? 0);
  }, [dispatch, debounce]);
  const dispatchItems = debounce ? debouncedDispatch : dispatch;

  const isIdle = status === "idle";
  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isError = status === "failure";
  const isDropDownVisible = query || (!isIdle && isFocused);

  React.useEffect(() => {
    if (previousController.current) {
      previousController.current.abort();
    }

    if (!query) {
      dispatch(search({ type: actionTypes.SEARCH_EMPTY }));
      return;
    }

    dispatch(
      search({
        type: actionTypes.SEARCH_PENDING,
      })
    );
    const controller = new AbortController();
    const { signal } = controller;
    previousController.current = controller;
    searchItems(query, signal)
      .then((response) => response.json())
      .then(
        (data) => {
          const queriedSearchItems = mapItems(data);

          dispatchItems(
            search({
              type: actionTypes.SEARCH_SUCCESS,
              value: queriedSearchItems,
            })
          );
        },
        ({ message, code }) => {
          if (code === 20) return;

          dispatch(
            search({
              type: actionTypes.SEARCH_FAILURE,
              error: message,
              value: [],
            })
          );
        }
      );
  }, [query, searchItems, dispatch, dispatchItems]);

  return {
    items,
    isDropDownVisible,
    query,
    setQuery,
    dispatchItems,
    setIsFocused,
    handleChange,
    handleFocus,
    handleBlur,
    getQuickSearchInputProps,
    getDropdownListProps,
    getDropdownItemProps,
    error,
    isIdle,
    isPending,
    isSuccess,
    isError,
  };
}

export {
  useQuickSearch,
  QuickSearchInput,
  QuickSearchDropDownList,
  QuickSearchDropDownItem,
  DropdownListDirections,
};
