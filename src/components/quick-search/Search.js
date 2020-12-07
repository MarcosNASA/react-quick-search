/* eslint-disable no-func-assign */
import * as React from "react";
import styled from "styled-components";
import {
  QuickSearch,
  QuickSearchInputBase,
  QuickSearchDropDownListBase,
  QuickSearchDropDownItemBase,
  useQuickSearch,
} from "./QuickSearchComponents";
import {
  SearchInputIcon,
  SearchIcon,
  SpinnerIcon,
  ErrorIcon,
  ItemInfo,
  PlaceholderItemInfo,
  NoItems,
  ErrorMessage,
} from "./quickSearch-lib";
import createStore from "./quickSearch-store";
import { Provider } from "react-redux";
import { identity } from "../../utils/utils";

const CustomQuickSearchDropdownItem = styled(QuickSearchDropDownItemBase)`
  display: grid;
  grid-template-columns: 96px auto;
  grid-template-rows: 1fr;
`;

function Search({ search, debounce, mappingFn = identity, direction }) {
  const {
    data,
    isDropDownVisible,
    setQuery,
    setIsFocused,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
  } = useQuickSearch(search, mappingFn, debounce);

  const quickSearchRef = React.useRef();
  const inputRef = React.useRef();
  const firstLiRef = React.useRef();
  const lastLiRef = React.useRef();

  return (
    <QuickSearch
      ref={quickSearchRef}
      setIsFocused={setIsFocused}
      inputRef={inputRef}
      firstLiRef={firstLiRef}
      lastLiRef={lastLiRef}
    >
      <QuickSearchInputBase ref={inputRef} setQuery={setQuery}>
        <SearchInputIcon>
          {(isIdle || isSuccess) && <SearchIcon />}
          {isLoading && <SpinnerIcon />}
          {isError && <ErrorIcon />}
        </SearchInputIcon>
      </QuickSearchInputBase>
      {isDropDownVisible && (
        <QuickSearchDropDownListBase direction={direction}>
          {isSuccess &&
            (data.length > 0 ? (
              data.map(
                ({ isbn, title, author, subject, price, image }, index) => {
                  const itemRef =
                    index === 0
                      ? firstLiRef
                      : index === data.length - 1
                      ? lastLiRef
                      : null;

                  return (
                    <CustomQuickSearchDropdownItem
                      key={isbn}
                      data-position={index}
                      ref={itemRef}
                    >
                      {isSuccess && (
                        <ItemInfo
                          {...{ isbn, title, author, subject, price, image }}
                        />
                      )}
                    </CustomQuickSearchDropdownItem>
                  );
                }
              )
            ) : (
              <CustomQuickSearchDropdownItem>
                <NoItems>
                  No items. Please, try a different search term.
                </NoItems>
              </CustomQuickSearchDropdownItem>
            ))}
          {isLoading &&
            Array(3)
              .fill(0)
              .map((_, index) => {
                return (
                  <CustomQuickSearchDropdownItem key={index}>
                    <PlaceholderItemInfo />
                  </CustomQuickSearchDropdownItem>
                );
              })}
          {isError && (
            <CustomQuickSearchDropdownItem>
              <ErrorMessage>{error}</ErrorMessage>
            </CustomQuickSearchDropdownItem>
          )}
        </QuickSearchDropDownListBase>
      )}
    </QuickSearch>
  );
}
Search = React.memo(Search);

function SearchWithProviders({ children, ...props }) {
  return (
    <Provider store={createStore()}>
      <Search {...props} />
    </Provider>
  );
}
SearchWithProviders = React.memo(SearchWithProviders);

export { SearchWithProviders as Search };
