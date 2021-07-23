import { createContext, FC, useEffect, useState } from 'react'
import Player from './Player';
import { GameContainer } from './gameRoomUtils/GameUtils';
import { useTheme } from 'styled-components';
import PointsCounterView from './PointsCounterView';

type PlayTurn = {
  mode:string,
  words:Array<any>
}

export const GameContext = createContext<any>(null);

const Game:FC = () => {
  const appTheme = useTheme();
  const gameMode = 'alone';
  const players = [1, 2];
  const defoultFirstPlayer = 1;

  const [turnPlayed, setTurnPlayed] = useState<PlayTurn|null>(null);
  const [catchTurn, setCatchTurn] = useState<number>(defoultFirstPlayer);
  const [playingTurn, setPlayingTurn]  = useState<number>(defoultFirstPlayer);
  const [intentsCount, setIntentsCount] = useState<Array<any>>([]);
  const [playerPoints, setPLayerPoints] = useState<number>(0);

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

  const addPlayerPoints = (attempts:number) => {
    if (attempts === 1) {
      setPLayerPoints(() => playerPoints + 2);
    } else {
      setPLayerPoints(() => playerPoints + 1);
    }
  }

  const checkIntents = (words:Array<any>) => {
    words.forEach(intent => {
      const wordToGuess = turnPlayed?.words.find(word => word.id === intent.id);
      const rightAnswer = wordToGuess?.word === intent.word;

      const wordAttempsCount = intentsCount.find(word => word.wordId === intent.id);
      const totalAttempsCount = intentsCount.filter(word => word.wordId !== intent.id);
      const attemptsUpdated = wordAttempsCount.intents + 1;
      setIntentsCount(() => {
        return [ ...totalAttempsCount, 
                { wordId: intent.id, intents:  attemptsUpdated, right: rightAnswer } ];
      });

      if (rightAnswer) {
        addPlayerPoints(attemptsUpdated);
      }
    });
  }

  useEffect(() => {
    let points:number = 0;
    intentsCount.forEach(intent => {
      if (intent.right) points += 1;
    });
    setPLayerPoints(() => points);
  }, [intentsCount]);

  return (
    <GameContainer theme={appTheme}>
      <GameContext.Provider value={{ 
        intentsCount: intentsCount, 
        gameMode: gameMode
      }}>
        <PointsCounterView points={playerPoints} />
        {players.map(player => 
            <Player
              key={player} 
              onPlayTurn={playTurn}
              playingTurn={player === playingTurn}
              id={player}
              turn={createTurn(player)}
              intentsReceiver={checkIntents} 
              />
          )
        }
      </GameContext.Provider>
    </GameContainer>
  );
}

export default Game;