import * as React from "react";
import styled from "styled-components";
import {
  QuickSearch,
  QuickSearchInputBase,
  QuickSearchDropDownListBase,
  QuickSearchDropDownItemBase,
  DropdownListDirections,
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
import { identity } from "../../utils/utils";
import { KEY_CODES } from "./utils";

const CustomQuickSearchDropdownItem = styled(QuickSearchDropDownItemBase)`
  display: grid;
  grid-template-columns: 96px auto;
  grid-template-rows: 1fr;
`;

function Search({ search, debounce, mappingFn = identity }) {
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

  const quickSearchRef = React.useRef();
  const inputRef = React.useRef();
  const firstLiRef = React.useRef();
  const lastLiRef = React.useRef();

  const handleKeyPress = (e) => {
    if (
      ![KEY_CODES.ESC, KEY_CODES.UP_ARROW, KEY_CODES.DOWN_ARROW].includes(
        e.keyCode
      )
    ) {
      return;
    }

    e.preventDefault();
    switch (e.keyCode) {
      case KEY_CODES.UP_ARROW:
        if (document.activeElement === inputRef.current) {
          lastLiRef.current?.focus();
        } else if (document.activeElement === firstLiRef.current) {
          inputRef.current?.focus();
        } else {
          if (document.activeElement.tagName === "LI") {
            document.activeElement.previousSibling?.focus();
          }
        }
        break;
      case KEY_CODES.DOWN_ARROW:
        if (document.activeElement === inputRef.current) {
          firstLiRef.current?.focus();
        } else if (document.activeElement === lastLiRef.current) {
          inputRef.current?.focus();
        } else {
          if (document.activeElement.tagName === "LI") {
            document.activeElement.nextSibling?.focus();
          }
        }
        break;
      case KEY_CODES.ESC:
        document.activeElement.blur();
        break;
      default:
        break;
    }
  };

  return (
    <QuickSearch
      ref={quickSearchRef}
      setIsFocused={setIsFocused}
      handleKeyPress={handleKeyPress}
    >
      <QuickSearchInputBase ref={inputRef} setQuery={setQuery}>
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

export { Search };
