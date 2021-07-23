import styled from "styled-components";
import Button from "../../utils/Button";

export const DictionaryContainer = styled.div`
  align-items: center;
  background: ${props => props.theme.primaryCard};
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  height: 80%;
  max-width: 1080px;
  min-height: 224px;
  min-width: 240px;
  overflow: hidden;
  padding: calc(0.1rem + 2vh + 1vw);
  width: 90%;
`

export const WordsContainer = styled.div`
  border-radius: 22px;
  height: 80%;
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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20%;
  padding: calc(1px + 1.5vh) calc(3px + 0.5vw);
  overflow: hidden;
  width: 100%;
`

export const DicButton = styled(Button)`
  align-items: center;
  background: ${props => props.selected? props.theme.secondary : props.theme.primaryLight};
  color: ${props => props.theme.primaryText};
  display: flex;
  font-size: small;
  font-weight: bold;
  height: 27px;
  justify-content: center;
  margin: 0.1rem;
  padding: 0.6rem;
  width: 27px;
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
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  margin: 0 0.4rem 0 0.4rem;
  width: 30%;
`
export const LetterButtonsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  width: 70%;
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

export const LetterButtonsContainer = styled.div`
  align-items: center;
  display: grid;
  justify-content: center;
  justify-items: center;
  width: 100%;
  gap: 0.1rem;
  grid-auto-columns: 32px;
  grid-auto-rows: 32px;
  grid-template-columns: repeat(auto-fill,minmax(2rem, 1fr));
  padding: 0 0.1rem;
`

export const ShowingLetterTitle = styled.span`
  color: ${props => props.theme.primaryText};
  font-size: xx-large;
  font-weight: 500;
  margin: 1vh;
  text-transform: uppercase;
`

export const DictionaryItemContainer = styled.div`
  align-content: center;
  background: ${props => props.selected ? props.theme.secondary : props.theme.primaryCard};
  border: 1px solid;
  border-color: ${props => props.selected ? props.theme.secondary : props.theme.primary};
  border-radius: 22px;
  color: ${props => props.selected ? props.theme.primaryText : props.theme.secondaryText};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 0.5rem 1rem 0;
  padding: 1rem;
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
  font-size: calc(0.9rem + 0.2vw);
  font-weight: bold;
  margin: 0.5rem;
  padding: 0.2rem;
  text-transform: capitalize;
`

export const PartOSpeeshContainer = styled.span`
  align-self: center;
  background: ${props  => props.selected ? props.theme.primaryLight : props.theme.secondary};
  border-radius: 10px;
  color: white;
  font-size: 7px;
  letter-spacing: 0.02rem;
  margin: 0.5rem;
  padding: 0.4rem;
  text-transform: uppercase;
  width: fit-content;
  text-align: center;
`

export const DefinitionContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: calc(0.6rem + 0.4vw);
  margin: 0.3rem 0;
  width: 100%;
`

export const DefinitionMarker = styled.span`
  align-items: flex-start;
  color: ${props => props.theme.secondaryText};
  display: flex;
  font-size: calc(0.4rem + 0.4vw);;
  font-weight: bold;
  margin: 0 0.6rem 0 0;
`