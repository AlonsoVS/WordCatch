import React, { FC, useContext, useEffect, useState } from 'react'
import { useTheme } from 'styled-components';
import { AttemptCount, GameContext, Word } from './Game';
import { AttempMessage, GuessTitle, 
        GuessViewContainer, WordsContainer } from './gameRoomUtils/GuessViewUtils';
import GuessWordItem from './GuessWordItem';

type Props = {
  onSendIntents:Function
  words:Array<any>
}

const GuessView:FC<Props> = ({ onSendIntents, words }) => {

  const { intentsCount, maxAttempts }:any = useContext(GameContext);
  const appTheme = useTheme();

  const [wordsIntents, setWordsIntents] = useState<Array<any>>([]);
  
  const sendIntent = (word:Word) => {
    setWordsIntents(() => [...wordsIntents, word]);
  }

  const isFirstAttempt = (word:Word) => {
    console.log("Attempts => ", intentsCount);
    if (intentsCount.length > 0) {
      const wordCount = intentsCount.find((count:AttemptCount) => count.wordId === word.id);
      if (wordCount) return wordCount.count === 0;
    }
    return false;
  }

  const allAttemptsUsed = (word:Word, maxAttempts:number):boolean => {
    const wordCount = intentsCount.find((count:AttemptCount) => count.wordId === word.id);
    if (wordCount){
      return wordCount.count === maxAttempts;
    }
    return false;
  }

  const isGuessedWord = (word:Word):boolean => {
    const wordCount = intentsCount.find((count:AttemptCount) => count.wordId === word.id);
    if (wordCount) {
      return wordCount.successful;
    }
    return false;
  }

  useEffect(() => {
    if (wordsIntents.length > 0) {
      onSendIntents(wordsIntents);
      setWordsIntents(() => []);
    }
  }, [wordsIntents]);

  return (
    <>
      <GuessTitle key='guess-view-title' theme={appTheme}>Guess the word!</GuessTitle>
      <GuessViewContainer key='guess-view-container' theme={appTheme}>
        <WordsContainer key='guess-words-container' theme={appTheme}>
          {words.map((word, index:number) => {
                const isGuessed = isGuessedWord(word);
                const hasUsedAllAttempts = allAttemptsUsed(word, maxAttempts);
                return (
                  <>
                    <GuessWordItem 
                      key={word.id} 
                      wordIndex={index}
                      defWord={word} 
                      sendWord={sendIntent} 
                      disabled={isGuessed || hasUsedAllAttempts} 
                    />
                    { isGuessed 
                      && <AttempMessage key={`${word.id}-guessed-message`} > Word Guessed! ???? </AttempMessage>
                      || hasUsedAllAttempts 
                      && <AttempMessage key={`${word.id}-guessed-message`}>Game Over. Maybe this is not for you ???? </AttempMessage>
                      || !isFirstAttempt(word) 
                      && <AttempMessage key={`${word.id}-guessed-message`}>Not this time. Please try again! ???? </AttempMessage> }
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
