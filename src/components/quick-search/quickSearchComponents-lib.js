import styled from "styled-components";
import { colors } from "../../colors";
import { DropdownListDirections } from "./utils";

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 32px;
  grid-template-rows: 1fr;
`;

const SearchInput = styled.input`
  grid-area: 1 / 1 / 2 / 3;
  background-color: ${colors.grey200};
  padding: 12px 40px 12px 18px;
  border: 0;
  border-radius: 2px;
  font-family: inherit;
  &::placeholder {
    color: ${colors.grey400};
  }
`;

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
  SearchForm,
  SearchInput,
  DropdownListWrapper,
  DropdownList,
  DropdownItem,
  DropdownListDirections,
};
