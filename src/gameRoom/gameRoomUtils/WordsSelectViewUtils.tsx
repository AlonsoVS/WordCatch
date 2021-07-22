import styled from "styled-components";
import Button from "../../utils/Button";

export const SelectTitle = styled.a`
  color: ${props => props.theme.primaryText};
  font-size: xxx-large;
  font-weight: 500;
  margin: 1rem;
  text-transform: capitalize;
`

export const SelectViewContainer = styled.div`
  background: ${props => props.theme.primaryCard};
  border-radius: 22px;
  max-height: 630px;
  overflow: hidden;
  padding: 1.5rem;
  height: fit-content;
  width: 60%;
`

export const WordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 580px;
  overflow: auto;
  width: 100%;
  ::-webkit-scrollbar-track{
    background: ${props => props.theme.secondary};
    border-radius: 100px;
  };
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 100px;
    width: 8px;
    background-clip: content-box;
    border: 2px solid transparent;
  };
  ::-webkit-scrollbar {
    width: 8px;
  };
`

export const DoneButton = styled(Button)`
  background: ${props => props.theme.primaryLight};
  border-radius: 18px;
  color: ${props => props.theme.primaryText};
  display: flex;
  font-size: small;
  font-weight: bold;
  height: fit-content;
  justify-content: center;
  margin: 1rem;
  max-width: 60px;
  min-width: 50px;
  padding: 1rem;
  width: fit-content;
  &:hover {
    background: ${props => props.theme.secondary};
  };
`