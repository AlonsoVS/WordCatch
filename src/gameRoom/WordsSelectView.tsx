import { FC, useState } from 'react'
import styled from 'styled-components'
import Button from '../utils/Button'
import DictionaryItem from './DictionaryItem'
import WithSelect from './WithSelect'

type Props = {
  words:Array<any>,
  onSelectedDone:Function,
  shouldWordsSelect:number
}

const SelectTitle = styled.a`
  color: white;
  font-size: xxx-large;
  font-weight: 500;
  margin: 1rem;
  text-transform: capitalize;
`

const SelectViewContainer = styled.div`
  background: white;
  border-radius: 22px;
  max-height: 630px;
  overflow: hidden;
  padding: 1.5rem;
  height: fit-content;
  width: 60%;
`

const WordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 580px;
  overflow: auto;
  width: 100%;
  ::-webkit-scrollbar-track{
    background: #f6a03c;
    border-radius: 100px;
  };
  ::-webkit-scrollbar-thumb {
    background: #003459;
    border-radius: 100px;
    width: 8px;
    background-clip: content-box;
    border: 2px solid transparent;
  };
  ::-webkit-scrollbar {
    width: 8px;
  };
`

const DoneButton = styled(Button)`
  background: #007ea7;
  border-radius: 18px;
  color: white;
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
  &:focus {
    none
  };
  &:hover {
    background: #ffa13d;
  };
`

const WordsSelectView:FC<Props> = ({ words, onSelectedDone, shouldWordsSelect }) => {
  const [wordsSelected, setWordsSelected] = useState<Array<any>>([]);
  const handleWordSelect = (word:any, selected:boolean) => {
    if (selected) {
      if (wordsSelected.length < shouldWordsSelect) {
        setWordsSelected(() => new Array<any>(...wordsSelected, word));
      } else {
        alert(`You must select only ${shouldWordsSelect} words!`);
      }
    } else if (wordsSelected.length > 0) {
        if (wordsSelected.find(element => element.word === word.word)) {
          setWordsSelected(
            () => wordsSelected.filter(element => element.word !== word.word)
          );
        }
    }
  }

  const handleDone = () => {
    if (wordsSelected.length < shouldWordsSelect) {
      alert(`You must select ${shouldWordsSelect} words`);
    } else if (wordsSelected.length > 0) {
      onSelectedDone(wordsSelected);
    } else {
      alert("No words to send");
    }
  }

  const isWordSelected = (word:any) => {
    return wordsSelected.some(item => item.id === word.id);
  }

  return (
    <>
      <SelectTitle>Select words</SelectTitle>
        <SelectViewContainer>
          <WordsContainer>
            {words.map(word => {
            return (
                  <WithSelect key={word.id} onSelect={handleWordSelect} >
                    <DictionaryItem { ...{ ...word, selected: isWordSelected(word) } } />
                  </WithSelect>
                  )
                }
              )
            }
          </WordsContainer>
        </SelectViewContainer>
      <DoneButton onClick={handleDone}>
        Done
      </DoneButton>
    </>
  )
}

export default WordsSelectView
