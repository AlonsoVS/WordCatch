import { FC, useContext, useEffect, useState } from 'react'
import { GameContext } from './Game';
import GuessWordItem from './GuessWordItem';

type Props = {
  onSendIntents:Function
  words:Array<any>
}

const GuessView:FC<Props> = ({ onSendIntents, words }) => {

  const { intentsCount }:any = useContext(GameContext);

  const [wordsIntents, setWordsIntents] = useState<Array<any>>([]);
  
  const sendIntent = (word:any) => {
    setWordsIntents(() => [...wordsIntents, word]);
  }

  const unableItemForm = (word:any) => {
    const wordCount = intentsCount.find((count:any) => count.wordId === word.id);
    return wordCount.intents === 3 || wordCount.right;
  }

  useEffect(() => {
    if (wordsIntents.length > 0) {
      onSendIntents(wordsIntents);
      setWordsIntents(() => []);
    }
  }, [wordsIntents]);

  return (
    <div>
      <h2>Guess the word!</h2>
      {words.map(word => (
            <GuessWordItem defWord={word} sendWord={sendIntent} disabled={unableItemForm(word)} />
          )
        )
      }
    </div>
  )
}

export default GuessView
