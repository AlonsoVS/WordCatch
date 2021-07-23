import styled from "styled-components";
import { DictionaryContainer, WordsContainer as DicWordsContainer,
        ShowingLetterTitle, 
        ActionButton} from "./DictionaryUtils";

export const SelectTitle = styled(ShowingLetterTitle)``

export const SelectViewContainer = styled(DictionaryContainer)``

export const WordsContainer = styled(DicWordsContainer)`
  height: 96%
`

export const DoneButton = styled(ActionButton)`
  align-content: center;
  margin: 0.6rem 0 0 0;
`