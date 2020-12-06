/* eslint-disable no-func-assign */
import * as React from "react";
import { useQuickSearch } from "./hooks";
import {
  SearchForm,
  SearchInput,
  DropdownListWrapper,
  DropdownList,
  DropdownItem,
  DropdownListDirections,
} from "./lib";

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

function QuickSearchInputBase({ setQuery, setIsFocused, children, ...props }) {
  return (
    <SearchForm>
      <SearchInput
        onChange={handleChange(setQuery)}
        onFocus={handleFocus(setIsFocused)}
        onBlur={handleBlur(setIsFocused)}
        {...getQuickSearchInputProps()}
        {...props}
      />
      {children}
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

function QuickSearchDropDownListBase({ children, ...props }) {
  return (
    <DropdownItem {...getDropdownItemProps()} {...props}>
      {children}
    </DropdownItem>
  );
}
function getDropdownItemProps() {}

function QuickSearchDropDownItemBase({ children, ...props }) {
  return (
    <DropdownListWrapper>
      <DropdownList {...getDropdownListProps()} {...props}>
        {children}
      </DropdownList>
    </DropdownListWrapper>
  );
}
function getDropdownListProps(props) {
  return {
    direction: DropdownListDirections.RIGHT,
    ...props,
  };
}

export {
  QuickSearchInputBase,
  QuickSearchDropDownListBase,
  QuickSearchDropDownItemBase,
  DropdownListDirections,
  useQuickSearch,
};
