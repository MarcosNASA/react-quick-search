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
const handleBlur = (setIsFocused, quickSearchElement) => (e) => {
  if (quickSearchElement.current.contains(e.relatedTarget)) {
    e.preventDefault();
    return;
  }
  setIsFocused(false);
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
    tabIndex: 0,
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

const QuickSearch = React.forwardRef(function QuickSearch(
  { handleKeyPress, setIsFocused, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      onKeyDown={handleKeyPress}
      onFocus={handleFocus(setIsFocused)}
      onBlur={handleBlur(setIsFocused, ref)}
      {...getQuickSearchProps()}
      {...props}
    >
      {children}
    </div>
  );
});
function getQuickSearchProps(props) {
  return {
    tabIndex: 0,
    ...props,
  };
}

export {
  QuickSearch,
  QuickSearchInputBase,
  QuickSearchDropDownListBase,
  QuickSearchDropDownItemBase,
  DropdownListDirections,
  useQuickSearch,
};
