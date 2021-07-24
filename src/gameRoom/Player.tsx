import { FC, useContext, useEffect, useState } from 'react';
import Dictionary from './Dictionary';
import { GameContext } from './Game';
import GuessView from './GuessView';
import WordsSelectView from './WordsSelectView';
import { GuessEndModal, GuessEndModalCard, PointsCounter, ModalButton } from './gameRoomUtils/PlayerUtils';

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

export default Player;