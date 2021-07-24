import { FC, useContext, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components';
import { MainCard } from '../main/MainCard';
import { PlayGameButton } from '../main/PlayGameButton';
import Dictionary from './Dictionary';
import { GameContext } from './Game';
import GuessView from './GuessView';
import PointsCounterView from './PointsCounterView';
import WordsSelectView from './WordsSelectView';

type PlayTurn = {
  mode:string,
  words:Array<any>
}

type Props = {
  onPlayTurn:Function,
  playingTurn?:Object,
  id:number,
  turn:PlayTurn,
  intentsReceiver:Function,
  guessEnd:boolean
}

const GuessEndModal = styled.div`
  align-items: center;
  background: #191919de;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`

const GuessEndModalCard = styled(MainCard)`
  max-width: 280px;
  min-height: 186px;
  padding: 1rem;
`

const ModalButton = styled(PlayGameButton)`
  background: ${props => props.theme.primaryLight};
  color: ${props => props.theme.primaryText};
  margin: 0.2rem;
  padding: 0.4rem;
`

const PointsCounter = styled.a`
  color: ${props => props.theme.secondary};
  height: fit-content;
  font-size: xx-large;
  margin: 1rem 0;
  text-align: center;
  width: 100%;
  @media (min-height: 328px) {
    font-size: xx-large;
    max-width: 800px;
  }
`

const Player:FC<Props> = ({ onPlayTurn, playingTurn, id, turn, intentsReceiver, guessEnd }) => {
  const { gameMode, playerPoints, finishGame } = useContext(GameContext);
  const wordsToBeSelected = 1;
  const [showGuessEndModal, setShowGuessEnd] = useState<boolean>(false);

  useEffect(() => {
    if (guessEnd && playingTurn) {
      setShowGuessEnd(() => true);
    } else {
      setShowGuessEnd(() => false);
    }
  }, [guessEnd]);

  const playWords = (words:Array<any>) => {
    onPlayTurn({ ...turn, words }, id);
  }

  const handleIntent = (words:Array<any>) => {
    intentsReceiver(words);
  }

  const getView = () => {
    if (playingTurn){
      switch (turn.mode) {
        case 'catch':
          return <Dictionary onSelectedDone={playWords} />;
        case 'select':
          return <WordsSelectView 
                    words={turn.words} 
                    onSelectedDone={playWords} 
                    shouldWordsSelect={wordsToBeSelected} />;
        case 'guess':
          return <GuessView onSendIntents={handleIntent} words={turn.words} />
      }
    }
    /* return <h2>Waiting turn...</h2>; */
  }

  const getRandomInt = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const selectWords = (words:any) => {
    let index:Array<number> = [];
    while (index.length < wordsToBeSelected) {
      const idx:number = getRandomInt(0, words.length);
      if (index.indexOf(idx) === -1) {
        index.push(idx);
      }
    }
    return index.map(i => words[i]);
  }

  const autoSelect = () => {
    playingTurn && playWords(selectWords(turn.words));
  }

  const handleEndTurn = () => {
   playWords(turn.words);
  }

  const handleFinishGame = () => {
    finishGame();
  }

  const getGuessEndModal = () => {
    return (
      <GuessEndModal>
        <GuessEndModalCard>
          <PointsCounter>
            Pts {playerPoints}
          </PointsCounter>
          <ModalButton onClick={handleEndTurn}>Continue</ModalButton>
          <ModalButton onClick={handleFinishGame}>Finish Game</ModalButton>
        </GuessEndModalCard>
      </GuessEndModal>
    );
  }

  return (
    <>
      {(gameMode !== 'alone' || id !== 2) 
        && <>
            {turn.mode === 'guess' && showGuessEndModal && getGuessEndModal()}
            {getView()}
          </> 
          || autoSelect()}
    </>
  )
}

export default Player
