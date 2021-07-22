import styled from "styled-components";
import Button from "../../utils/Button";

export const DictionaryContainer = styled.div`
  height: 70%;
  width: 60%;
  background: ${props => props.theme.primaryCard};
  border-radius: 22px;
  padding: 1.5rem;
  overflow: hidden
`

export const WordsContainer = styled.div`
  overflow: auto;
  height: 85%;
  border-radius: 22px;
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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 15%;
  padding: 0.4rem;
  overflow: hidden;
`

export const DicButton = styled(Button)`
  background: ${props => props.selected? props.theme.secondary : props.theme.primaryLight};
  color: ${props => props.theme.primaryText};
  font-size: small;
  font-weight: bold;
  margin: 0.1rem;
  padding: 0.6rem;
  width: 32px;
  height: fit-content;
  &:hover {
    background: ${props => props.theme.secondaryLight};
    color: ${props => props.theme.secondaryText};
  }
`

export const ActionButton = styled(DicButton)`
  display: flex;
  justify-content: center;
  padding: 0.4rem 1rem;
  min-width: 50px;
  max-width: 60px;
  width: min-content;
  &:focus {
    none
  }
`

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%
`

export const LetterButtonsContainer = styled.div`
  display: block;
  overflow: auto
`

export const ShowingLetterTitle = styled.span`
  color: ${props => props.theme.primaryText};
  font-size: xxx-large;
  margin: 1rem;
  text-transform: uppercase;
`

export const DictionaryItemContainer = styled.div`
  border: 1px solid;
  border-color: ${props => props.selected ? props.theme.secondary : props.theme.primary};
  border-radius: 22px;
  background: ${props => props.selected ? props.theme.secondary : props.theme.primaryCard};
  color: ${props => props.selected ? props.theme.primaryText : props.theme.secondaryText};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: large;
  margin: 1rem;
  padding: 2rem;
  &:hover {
    background: ${props => props.theme.secondaryLight};
    border-color: transparent;
    color: ${props => props.theme.secondaryText}
  }
`

export const WordContainer = styled.span`
  align-items: center;
  background: ${props => props.theme.primary};
  border-radius: 12px;
  color: ${props => props.theme.primaryText};
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin: 1rem;
  padding: 0.2rem;
  text-transform: capitalize;
`

export const PartOSpeeshContainer = styled.span`
  align-self: center;
  background: ${props  => props.selected ? props.theme.primaryLight : props.theme.secondary};
  border-radius: 10px;
  color: white;
  font-size: xx-small;
  letter-spacing: 0.02rem;
  margin: 0.5rem;
  padding: 0.4rem;
  text-transform: uppercase;
  width: fit-content;
`

export const DefinitionContainer = styled.a`
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