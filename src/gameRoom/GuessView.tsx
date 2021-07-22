import React, { FC, useContext, useEffect, useState } from 'react'
import { useTheme } from 'styled-components';
import { GameContext } from './Game';
import { AttempMessage, GuessTitle, 
        GuessViewContainer, WordsContainer } from './gameRoomUtils/GuessViewUtils';
import GuessWordItem from './GuessWordItem';

type Props = {
  onSendIntents:Function
  words:Array<any>
}

const GuessView:FC<Props> = ({ onSendIntents, words }) => {

  const { intentsCount }:any = useContext(GameContext);
  const appTheme = useTheme();

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
    <>
      <GuessTitle theme={appTheme}>Guess the word!</GuessTitle>
      <GuessViewContainer theme={appTheme}>
        <WordsContainer theme={appTheme}>
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
                    { isGuessed 
                      && <AttempMessage key={`${word.id}-guessed-message`} > Word Guessed! 🥳 </AttempMessage>
                      || hasUsedAllAttempts 
                      && <AttempMessage>Game Over. Maybe this is not for you 🤪 </AttempMessage>
                      || !isFirsAttemp(word) 
                      && <AttempMessage>Not this time. Please try again! 😓 </AttempMessage> }
                  </>
                )
              }
            )
          }
        </WordsContainer> 
      </GuessViewContainer>
    </>
  )
}

export default GuessView
