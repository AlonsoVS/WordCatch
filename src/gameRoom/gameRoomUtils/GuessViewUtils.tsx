import styled from "styled-components";

export const AttempMessage = styled.span`
  margin: 0 0 0.6rem 0;
  text-align: center;
`

export const GuessTitle = styled.a`
  color: ${props => props.theme.primaryText};
  font-size: xxx-large;
  font-weight: 500;
  margin: 1rem;
  text-transform: capitalize;
`

export const GuessViewContainer = styled.div`
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
    background: ${props => props.theme.primary};
    border-radius: 100px;
  };
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.secondary};
    border-radius: 100px;
    width: 8px;
    background-clip: content-box;
    border: 2px solid transparent;
  };
  ::-webkit-scrollbar {
    width: 8px;
  };
`

export const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin: 0.8rem 0;
  padding: 0 1rem;
  width: 100%;
`

export const PartOfSpeech = styled.span`
  align-self: center;
  background: ${props => props.theme.secondary};
  border-radius: 10px;
  height: fit-content;
  color: white;
  font-size: xx-small;
  letter-spacing: 0.02rem;
  margin: 0.5rem;
  padding: 0.4rem;
  text-transform: uppercase;
  width: fit-content;
`

export const DefinitionContainer = styled.div`
margin: 0.5rem 0;
display: flex;
flex-direction: row;
`

export const DefinitionMarker = styled.span`
  align-items: flex-start;
  color: ${props => props.theme.secondaryText};
  display: flex;
  font-size: x-small;
  font-weight: bold;
  margin: 0.3rem 0.8rem;
`

export const WordForm = styled.form`
  display: flex;
  flex-direction: row;
  height: fit-content;
  margin: 0.5rem;
  input {
    border: 1px solid;
    border-radius: 10px;
    height: 40px;
    margin: 0.4rem 0.4rem 0;
    padding: 0.5rem;
    width: 100%;
    &:focus, &:hover {
      border: 1px solid ${props => props.theme.secondary};
      border-radius: 10px;
      outline: none;
    };
  };
`

export const ButtonInput = styled.input`
  background: ${props => props.theme.primaryLight};
  border: none !important;
  color: ${props => props.theme.primaryText};
  cursor: pointer;
  width: 10% !important;
  &:focus, &:hover {
    background: ${props => props.theme.secondary};
  }
`