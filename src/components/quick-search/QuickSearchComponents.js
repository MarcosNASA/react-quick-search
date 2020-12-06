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
import { KEY_CODES } from "./utils";

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

const QuickSearch = React.forwardRef(function QuickSearch(
  { setIsFocused, children, inputRef, firstLiRef, lastLiRef, ...props },
  ref
) {
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
    <div
      ref={ref}
      onKeyDown={handleKeyPress}
      onFocus={handleFocus(setIsFocused)}
      onBlur={handleBlur(setIsFocused, ref)}
      {...getQuickSearchProps({ ...props })}
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
          {...getQuickSearchInputProps({ ...props })}
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

function QuickSearchDropDownListBase({ children, ...props }) {
  return (
    <DropdownListWrapper>
      <DropdownList {...getDropdownListProps({ ...props })}>
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

const QuickSearchDropDownItemBase = React.memo(
  React.forwardRef(function QuickSearchDropDownItemBase(
    { children, ...props },
    ref
  ) {
    return (
      <DropdownItem ref={ref} {...getDropdownItemProps({ ...props })}>
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
function getDropdownItemProps(props) {
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
