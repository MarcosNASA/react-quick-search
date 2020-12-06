import * as React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../colors";
import {
  useQuickSearch,
  QuickSearchInput,
  QuickSearchDropDownList,
  QuickSearchDropDownItem,
  DropdownListDirections,
} from "../quick-search/QuickSearch";
import { searchItems } from "../../utils/api";
import placeholder from "../../assets/images/placeholder.png";

const CustomQuickSearchDropdownItem = styled(QuickSearchDropDownItem)`
  display: grid;
  grid-template-columns: 96px auto;
  grid-template-rows: 1fr;
`;

function ImageWithFallback({ src, alt, ...props }) {
  const [imageSrc, setImageSrc] = React.useState(src);
  const altFallback = imageSrc !== placeholder ? src : "Placeholder";

  const handleError = () => {
    setImageSrc(placeholder);
  };

  return (
    <img src={imageSrc} alt={altFallback} {...props} onError={handleError} />
  );
}
const BookImage = styled(ImageWithFallback)`
  object-fit: cover;
`;
const BookInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, minmax(9px, auto));
`;
const BookTitle = styled.p`
  margin: 0px 8px 8px 16px;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.grey800};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const BookData = styled.p`
  margin: 4px 8px 0px 16px;
  font-size: 14px;
  align-self: flex-end;
  color: ${colors.grey600};
  overflow: hidden;
  text-overflow: ellipsis;
`;
const BuyInfo = styled(BookData)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  overflow: visible;
  text-overflow: ellipsis;
`;

function ItemInfo({ isbn, title, author, subject, price, image }) {
  return (
    <>
      <BookImage
        src={image}
        alt={`${title}'s cover`}
        height="96px"
        width="96px"
      ></BookImage>
      <BookInfo>
        <BookTitle>{title}</BookTitle>
        <BookData>{author}</BookData>
        <BookData>{subject}</BookData>
        <BuyInfo>
          {price}$
          <a
            href={`https://www.amazon.com/s?k=${isbn}`}
            target="_blank"
            rel="noreferrer"
          >
            Search on Amazon
          </a>
        </BuyInfo>
      </BookInfo>
    </>
  );
}

const NoItems = styled.p`
  font-size: 12px;
  padding: 10px;
`;

const placeholderAnimation = keyframes`
  0% {
    opacity: .5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .5;
  }
`;
const PlaceholderImage = styled(BookImage)`
  animation: ${placeholderAnimation} 2s ease-in-out infinite;
`;
const PlaceholderBookTitle = styled(BookTitle)`
  height: 19px;
  background-color: ${colors.grey300};
  animation: ${placeholderAnimation} 2s ease-in-out infinite;
`;
const PlaceholderBookData = styled(BookData)`
  margin-top: 8px;
  height: 15px;
  background-color: ${colors.grey300};
  animation: ${placeholderAnimation} 2s ease-in-out infinite;
`;
function PlaceholderItemInfo() {
  return (
    <>
      <PlaceholderImage
        src={placeholder}
        alt="Placeholder"
        height="96px"
        width="96px"
      ></PlaceholderImage>
      <BookInfo>
        <PlaceholderBookTitle />
        <PlaceholderBookData />
        <PlaceholderBookData />
        <PlaceholderBookData />
      </BookInfo>
    </>
  );
}

const ErrorMessage = styled.p`
  color: ${colors.danger};
`;
ErrorMessage.defaultProps = {
  role: "alert",
};

function Search() {
  const {
    items,
    isDropDownVisible,
    query,
    setQuery,
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
  } = useQuickSearch({ searchItems, options: { debounce: 300 } });

  return (
    <>
      <QuickSearchInput
        {...getQuickSearchInputProps({
          value: query,
          onChange: handleChange(setQuery),
          onFocus: handleFocus(setIsFocused),
          onBlur: handleBlur(setIsFocused),
          isIdle,
          isPending,
          isSuccess,
          isError,
          error,
        })}
      />
      {isDropDownVisible && (
        <QuickSearchDropDownList
          {...getDropdownListProps({ direction: DropdownListDirections.LEFT })}
        >
          {isSuccess &&
            (items.length > 0 ? (
              items.map(({ isbn, title, author, subject, price, image }) => {
                return (
                  <CustomQuickSearchDropdownItem
                    key={isbn}
                    {...getDropdownItemProps()}
                  >
                    {isSuccess && (
                      <ItemInfo
                        {...{ isbn, title, author, subject, price, image }}
                      />
                    )}
                  </CustomQuickSearchDropdownItem>
                );
              })
            ) : (
              <CustomQuickSearchDropdownItem {...getDropdownItemProps()}>
                <NoItems>
                  No items. Please, try a different search term.
                </NoItems>
              </CustomQuickSearchDropdownItem>
            ))}
          {isPending &&
            Array(3)
              .fill(0)
              .map((item, index) => {
                return (
                  <CustomQuickSearchDropdownItem
                    key={index}
                    {...getDropdownItemProps()}
                  >
                    <PlaceholderItemInfo />
                  </CustomQuickSearchDropdownItem>
                );
              })}
          {isError && (
            <CustomQuickSearchDropdownItem {...getDropdownItemProps()}>
              <ErrorMessage>{error}</ErrorMessage>
            </CustomQuickSearchDropdownItem>
          )}
        </QuickSearchDropDownList>
      )}
    </>
  );
}

export { Search };
