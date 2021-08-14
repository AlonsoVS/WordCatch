import styled from "styled-components";
import { DefinitionContainer as WordDefinitionContainer, PartOSpeeshContainer,
        DefinitionMarker as WordDefinitionMarker, DictionaryItemContainer,
        DictionaryContainer, WordsContainer as DicWordsContainer,
        ShowingLetterTitle } from "./DictionaryUtils";

export const AttempMessage = styled.span`
  margin: 0 0 0.6rem 0;
  text-align: center;
`

export const GuessTitle = styled(ShowingLetterTitle)`
  text-transform: capitalize;
`

export const GuessViewContainer = styled(DictionaryContainer)`
  height: fit-content;
  max-height: 80%;
  min-height: 204px;
`

export const WordsContainer = styled(DicWordsContainer)`
  height: 100%;
`

export const WordContainer = styled(DictionaryItemContainer)``

export const PartOfSpeech = styled(PartOSpeeshContainer)``

export const DefinitionContainer = styled(WordDefinitionContainer)``

export const DefinitionMarker = styled(WordDefinitionMarker)``

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
  align-items: center;
  background: ${props => props.theme.primaryLight};
  border: none !important;
  color: ${props => props.theme.primaryText};
  cursor: pointer;
  display: flex;
  font-size: small;
  font-weight: bold;
  height: 27px;
  justify-content: center;
  margin: 0.1rem;
  min-width: 50px;
  max-width: 60px;
  padding: 0.4rem 1rem;
  text-transform: capitalize;
  width: min-content !important;
  &:focus, &:hover {
    background: ${props => props.theme.secondary};
  }
`