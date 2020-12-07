import styled from "styled-components";
import { colors } from "../colors";

const Header = styled.header`
  background-color: ${colors.grey100};
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export { Header };
