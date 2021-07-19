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

  const isFirsAttemp = (word:any) => {
    const wordCount = intentsCount.find((count:any) => count.wordId === word.id);
    return wordCount.intents === 0;
  }

  const allAttemptsUsed = (word:any, maxAttemps:number):boolean => {
    const wordCount = intentsCount.find((count:any) => count.wordId === word.id);
    return wordCount.intents === maxAttemps;
  }

  const isGuessedWord = (word:any):boolean => {
    const wordCount = intentsCount.find((count:any) => count.wordId === word.id);
    return wordCount.right;
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
      {words.map(word => {
            const isGuessed = isGuessedWord(word);
            const hasUsedAllAttempts = allAttemptsUsed(word, 3);
            return (
              <>
                <GuessWordItem 
                  key={word.id} 
                  defWord={word} 
                  sendWord={sendIntent} 
                  disabled={isGuessed || hasUsedAllAttempts} 
                />
                { isGuessed && <span key={`${word.id}-guessed-message`} > Word Guessed! 🥳 </span>
                  || hasUsedAllAttempts &&<span>Game Over. Maybe this is not for you 🤪 </span>
                  || !isFirsAttemp(word) && <span>Not this time. Please try again! 😓 </span> }
              </>
            )
          }
        )
      }
    </div>
  )
}

export default GuessView
