import { FC, useState } from 'react'
import DictionaryItem from './DictionaryItem'
import WithSelect from './WithSelect'

type Props = {
  words:Array<any>,
  onSelectedDone:Function
}

const WordSelectedView:FC<Props> = ({ words, onSelectedDone }) => {
  const [wordsSelected, setWordsSelected] = useState<Array<any>>([]);
  const handleWordSelect = (word:any, selected:boolean) => {
    if (selected) {
      setWordsSelected(() => new Array<any>(...wordsSelected, word));
    } else if (wordsSelected.length > 0) {
        if (wordsSelected.find(element => element.word === word.word)) {
          setWordsSelected(
            () => wordsSelected.filter(element => element.word !== word.word)
          );
        }
    }
  }

  const handleDone = () => {
    if (wordsSelected.length > 0) {
      onSelectedDone(wordsSelected);
    } else {
      alert("No words to send");
    }
  }

  return (
    <div>
      <h2>Select a word</h2>
      {words.map(word => 
         <WithSelect onSelect={handleWordSelect} >
           <DictionaryItem {...word}/>
         </WithSelect>
        )
      }
      <button onClick={handleDone}>
        Done
      </button>
    </div>
  )
}

export default WordSelectedView
