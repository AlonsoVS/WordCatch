import React, { cloneElement, createContext, useEffect, useState } from 'react'
import Player from './Player';

type PlayTurn = {
  mode:string,
  words:Array<any>
}

export const GameContext = createContext<any>(null);

const Game = () => {
  const players = [1, 2];

  const [turnPlayed, setTurnPlayed] = useState<PlayTurn|null>(null);
  const [catchTurn, setCatchTurn] = useState<number>(1);
  const [playingTurn, setPlayingTurn]  = useState<number>(1);
  const [intentsCount, setIntentsCount] = useState<Array<any>>([]);

  useEffect(() => {
    turnPlayed && turnPlayed?.words.length > 0 && setIntentsCount(() => 
    turnPlayed.words.map(word => ({ wordId: word.id, intents: 0 , right: false })));
  }, [turnPlayed])

  const playTurn = (turned:PlayTurn, playerId:number) => {
    setTurnPlayed(() => turned);

    const playing = players.find(id => id !== playerId);
    if (playing) setPlayingTurn(() => playing);
  }

  const createTurn = (playerId:number):PlayTurn => {
    let turnMode = '';
    if (catchTurn === playerId) {
      if (turnPlayed?.mode === 'select') turnMode = 'guess';
      else turnMode = 'catch';
    } else {
      turnMode = 'select';
    };

    let words:Array<any> = [];
    if (turnPlayed) {
      if (turnMode === 'guess') {
        words = turnPlayed.words.map(element => { 
          const { word, ...withoutWord } = element;
          return withoutWord;
        })
      } else {
        words = turnPlayed.words;
      }
    };

    return {
      mode: turnMode,
      words: words
    }
  }

  const checkIntents = (words:Array<any>) => {
    words.forEach(intent => {
      const wordToGuess = turnPlayed?.words.find(word => word.id === intent.id);
      const rightAnswer = wordToGuess?.word === intent.word;

      setIntentsCount(() => {
        const wordIntentsCount = intentsCount.find(word => word.wordId === intent.id);
        const newCount = intentsCount.filter(word => word.wordId !== intent.id);
        return [ ...newCount, 
                { wordId: intent.id, intents:  wordIntentsCount.intents + 1, right: rightAnswer } ];
      });
    });
  }

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <GameContext.Provider value={{ intentsCount: intentsCount }}>
        {players.map(player => 
            <Player 
              onPlayTurn={playTurn}
              playingTurn={player === playingTurn}
              id={player}
              turn={createTurn(player)}
              intentsReceiver={checkIntents} 
              />
          )
        }
      </GameContext.Provider>
    </div>
  );
}

export default Game