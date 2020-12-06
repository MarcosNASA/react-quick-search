import * as React from "react";
import styled from "styled-components";
import {
  QuickSearchInputBase,
  QuickSearchDropDownListBase,
  QuickSearchDropDownItemBase,
  DropdownListDirections,
  useQuickSearch,
} from "../quick-search/QuickSearchComponents";
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
import { identity } from "../../utils/utils";

const CustomQuickSearchDropdownItem = styled(QuickSearchDropDownItemBase)`
  display: grid;
  grid-template-columns: 96px auto;
  grid-template-rows: 1fr;
`;

function QuickSearch({ search, debounce, mappingFn = identity }) {
  const {
    data,
    query,
    isDropDownVisible,
    setData,
    setError,
    setQuery,
    setIsFocused,
    run,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
  } = useQuickSearch(debounce);

  React.useEffect(() => {
    const promise = run(search, query);

    if (!promise || !promise.then) {
      return;
    }

    promise
      .then((response) => {
        if (!response) {
          return;
        }

        return response.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }

        setData(mappingFn(data));
      })
      .catch((error) => {
        if (!error) {
          return;
        }

        const { message, code } = error;
        if (!code || code === 20) return;

        setError(message);
      });
  }, [query, run, search, setData, setError, mappingFn]);

  return (
    <>
      <QuickSearchInputBase setQuery={setQuery} setIsFocused={setIsFocused}>
        <SearchInputIcon>
          {(isIdle || isSuccess) && <SearchIcon />}
          {isLoading && <SpinnerIcon />}
          {isError && <ErrorIcon />}
        </SearchInputIcon>
      </QuickSearchInputBase>
      {isDropDownVisible && (
        <QuickSearchDropDownListBase direction={DropdownListDirections.LEFT}>
          {isSuccess &&
            (data.length > 0 ? (
              data.map(
                ({ isbn, title, author, subject, price, image }, index) => {
                  return (
                    <CustomQuickSearchDropdownItem
                      key={isbn}
                      data-position={index}
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
    </>
  );
}

export { QuickSearch };
