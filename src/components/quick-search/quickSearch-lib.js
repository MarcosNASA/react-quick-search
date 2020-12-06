import * as React from "react";

import styled, { keyframes } from "styled-components";
import { colors } from "../../colors";
import placeholder from "../../assets/images/placeholder.png";

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

const spinnerAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
`;
const SpinnerSVG = styled.svg`
  animation: 2s linear infinite ${spinnerAnimation};
`;
const Spinner = () => (
  <SpinnerSVG
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
    ></path>
  </SpinnerSVG>
);
Spinner.defaultProps = {
  "aria-label": "loading",
};

const SearchSVG = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
    ></path>
  </svg>
);
SearchSVG.defaultProps = {
  "aria-label": "Search",
};
const ErrorSVG = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 352 512"
  >
    <path
      fill="currentColor"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
    ></path>
  </svg>
);

const SearchInputIcon = styled.i`
  grid-area: 1 / 2 / 2 / 3;
  align-self: center;
  justify-self: center;
  display: grid;
  place-items: center;
  height: 16px;
  width: 16px;
`;
const SpinnerIcon = styled(Spinner)``;
SpinnerIcon.displayName = "SpinnerIcon";
const SearchIcon = styled(SearchSVG)``;
SearchIcon.displayName = "SearchIcon";
const ErrorIcon = styled(ErrorSVG)``;
ErrorIcon.displayName = "ErrorIcon";

export {
  SearchInputIcon,
  SpinnerIcon,
  SearchIcon,
  ErrorIcon,
  ImageWithFallback,
  BookImage,
  BookTitle,
  BookData,
  BuyInfo,
  ItemInfo,
  PlaceholderImage,
  PlaceholderBookTitle,
  PlaceholderBookData,
  PlaceholderItemInfo,
  NoItems,
  ErrorMessage,
};
