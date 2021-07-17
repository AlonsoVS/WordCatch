import { FC, useState } from 'react'
import Dictionary from './Dictionary';
import GuessView from './GuessView';
import WordsSelectedView from './WordsSelectedView';

type PlayTurn = {
  mode:string,
  words:Array<any>
}

type Props = {
  onPlayTurn:Function,
  playingTurn?:Object,
  id:number,
  turn:PlayTurn,
  intentsReceiver:Function
}

const Player:FC<Props> = ({ onPlayTurn, playingTurn, id, turn, intentsReceiver }) => {
  
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
          return <WordsSelectedView words={turn.words} onSelectedDone={playWords} />;
        case 'guess':
          return <GuessView onSendIntents={handleIntent} words={turn.words} />
      }
    }
    return <h2>Waiting turn...</h2>;
  }

  return (
    <>
      {getView()}
    </>
  )
}

export default Player
