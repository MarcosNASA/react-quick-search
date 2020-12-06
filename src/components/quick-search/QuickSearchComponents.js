/* eslint-disable no-func-assign */
import * as React from "react";
import { useQuickSearch } from "./hooks";
import {
  SearchForm,
  SearchInput,
  DropdownListWrapper,
  DropdownList,
  DropdownItem,
} from "./quickSearchComponents-lib";
import { DropdownListDirections } from "./utils";

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

const QuickSearchInputBase = React.memo(
  React.forwardRef(function QuickSearchInputBase(
    { setQuery, setIsFocused, children, ...props },
    ref
  ) {
    const handleSubmit = (e) => {
      e.preventDefault();
    };

    return (
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          ref={ref}
          onChange={handleChange(setQuery)}
          onFocus={handleFocus(setIsFocused)}
          onBlur={handleBlur(setIsFocused)}
          {...getQuickSearchInputProps()}
          {...props}
        />
        {children}
      </SearchForm>
    );
  })
);
function getQuickSearchInputProps(props) {
  return {
    type: "text",
    placeholder: "Quick search...",
    "aria-label": "Quick Search",
    tabIndex: "0",
    ...props,
  };
}

const QuickSearchDropDownItemBase = React.memo(
  React.forwardRef(function QuickSearchDropDownItemBase(
    { children, ...props },
    ref
  ) {
    return (
      <DropdownItem ref={ref} {...getDropdownItemProps()} {...props}>
        {children}
      </DropdownItem>
    );
  }),
  (prevProps, nextProps) => {
    const {
      children: { props: prevChildrenProps },
    } = prevProps;
    const {
      children: { props: nextChildrenProps },
    } = nextProps;

    for (const key in prevChildrenProps) {
      if (prevChildrenProps[key] !== nextChildrenProps[key]) {
        return false;
      }
    }

    return true;
  }
);
function getDropdownItemProps() {
  return {
    tabIndex: 0,
  };
}

function QuickSearchDropDownListBase({ children, ...props }) {
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
QuickSearchDropDownListBase = React.memo(QuickSearchDropDownListBase);

export {
  QuickSearchInputBase,
  QuickSearchDropDownListBase,
  QuickSearchDropDownItemBase,
  DropdownListDirections,
  useQuickSearch,
};
