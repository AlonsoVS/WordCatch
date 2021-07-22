import styled from "styled-components";
import Button from "../utils/Button";


export const PlayGameButton = styled(Button)`
  background: ${props => props.theme.primaryCard};
  border: solid 2px;
  border-color: ${props => props.theme.primary};
  color: ${props => props.theme.secondaryText};
  width: 200px;
  font-size: medium;
  font-weight: bold;
  &:hover {
    color: ${props => props.theme.primaryText};
    background: ${props => props.theme.secondary};
    border: none
  }
`