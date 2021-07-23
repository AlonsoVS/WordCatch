import React, { FC, useState } from 'react'
import { useTheme } from 'styled-components'
import DictionaryItem from './DictionaryItem'
import WithSelect from './WithSelect'
import { DoneButton, SelectTitle, SelectViewContainer, 
          WordsContainer } from './gameRoomUtils/WordsSelectViewUtils'

type Props = {
  words:Array<any>,
  onSelectedDone:Function,
  shouldWordsSelect:number
}

const WordsSelectView:FC<Props> = ({ words, onSelectedDone, shouldWordsSelect }) => {
  const appTheme = useTheme();
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
      <SelectTitle theme={appTheme}>Select words</SelectTitle>
        <SelectViewContainer theme={appTheme}>
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
          <DoneButton onClick={handleDone}>
            Done
          </DoneButton>
        </SelectViewContainer>
    </>
  )
}

export default WordsSelectView
