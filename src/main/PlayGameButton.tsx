import styled from "styled-components";
import Button from "../utils/Button";


export const PlayGameButton = styled(Button)`
  background: ${props => props.theme.primaryCard};
  border-color: ${props => props.theme.primary};
  border: solid 2px;
  color: ${props => props.theme.secondaryText};
  font-size: medium;
  font-weight: bold;
  height: fit-content;
  padding: 1rem;
  &:hover {
    color: ${props => props.theme.primaryText};
    background: ${props => props.theme.secondary};
    border-color: transparent
  };
  width: 100%;
`