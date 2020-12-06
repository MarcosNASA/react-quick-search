import styled, { keyframes } from "styled-components";
import { colors } from "../colors";

const Header = styled.header`
  background-color: ${colors.grey100};
  padding: 10px;
  display: grid;
  justify-content: flex-end;
  align-items: center;
`;

const spinnerAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
`;
const circleAnimation = keyframes`
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`;
const SpinnerSVG = styled.svg`
  animation: 2s linear infinite ${spinnerAnimation};
  & circle {
    animation: 1.4s ease-in-out infinite both ${circleAnimation};
    display: block;
    fill: transparent;
    stroke: #000;
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 280;
    stroke-width: 2px;
    transform-origin: 50% 50%;
  }
`;
const Spinner = () => (
  <SpinnerSVG
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    width="20px"
  >
    <circle cx="25" cy="25" r="16" />
  </SpinnerSVG>
);
Spinner.defaultProps = {
  "aria-label": "loading",
};

const SearchSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height="20px"
    width="20px"
    strokeWidth="0"
  >
    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
  </svg>
);
SearchSVG.defaultProps = {
  "aria-label": "Search",
};
const ErrorSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58173 3.58172 0 8 0C12.4183 0 16 3.58173 16 8ZM8 9.60001L10.4 12L12 10.4L9.6 8L12 5.60001L10.4 4L8 6.39999L5.6 4L4 5.60001L6.4 8L4 10.4L5.6 12L8 9.60001Z"
      fill="#DC2626"
    />
  </svg>
);

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 32px;
  grid-template-rows: 1fr;
`;
const SearchInput = styled.input`
  grid-area: 1 / 1 / 2 / 3;
  background-color: ${colors.grey200};
  padding: 12px 18px;
  border: 0;
  border-radius: 2px;
  font-family: inherit;
  &:placeholder {
    color: ${colors.grey400};
  }
`;
const SearchInputIcon = styled.i`
  grid-area: 1 / 2 / 2 / 3;
  align-self: center;
  justify-self: center;
  height: 20px;
  width: 20px;
`;
const SpinnerIcon = styled(Spinner)``;
SpinnerIcon.displayName = "SpinnerIcon";
const SearchIcon = styled(SearchSVG)``;
SearchIcon.displayName = "SearchIcon";
const ErrorIcon = styled(ErrorSVG)``;
ErrorIcon.displayName = "ErrorIcon";

const DropdownListWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    content: "";
    position: absolute;
    height: 30px;
    width: 30px;
    top: 16px;
    background-color: ${colors.grey200};
    transform: rotate(45deg);
  }
`;

const DropdownListDirections = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
const DropdownList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-height: 320px;
  min-width: 400px;
  max-width: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${colors.grey200};
  top: 18px;
  left: ${({ direction }) =>
    direction === DropdownListDirections.RIGHT ? 0 : "auto"};
  right: ${({ direction }) =>
    direction === DropdownListDirections.LEFT ? 0 : "auto"};
  z-index: 1;
  @media (max-width: 600px) {
    max-width: 360px;
    min-width: 300px;
  }
`;

const DropdownItem = styled.li`
  width: 100%;
  list-style: none;
  white-space: nowrap;
  padding: 10px 10px 8px 10px;
  &:last-child {
    padding: 10px;
  }
`;

export {
  Header,
  SearchForm,
  SearchInput,
  SearchInputIcon,
  SpinnerIcon,
  SearchIcon,
  ErrorIcon,
  DropdownListWrapper,
  DropdownList,
  DropdownItem,
};
