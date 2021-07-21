import { FC, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { GameContext } from './Game';
import GuessWordItem from './GuessWordItem';

type Props = {
  onSendIntents:Function
  words:Array<any>
}

const GuessTitle = styled.a`
  color: white;
  font-size: xxx-large;
  font-weight: 500;
  margin: 1rem;
  text-transform: capitalize;
`

const GuessViewContainer = styled.div`
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
  max-height: 630px;
  overflow: auto;
  width: 100%;
`

const AttempMessage = styled.span`
  margin: 0 0 0.6rem 0;
  text-align: center;
`

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
    <>
      <GuessTitle>Guess the word!</GuessTitle>
      <GuessViewContainer>
        <WordsContainer>
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
