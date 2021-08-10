import { createContext, FC, useContext, useEffect, useState } from 'react'
import Player from './Player';
import { GameContainer } from './gameRoomUtils/GameUtils';
import { useTheme } from 'styled-components';
import PointsCounterView from './PointsCounterView';
import { useRouter } from 'next/dist/client/router';
import GameOptionsMenu from './GameOptionsMenu';
import { io, Socket } from 'socket.io-client';
import { PlayGameContext } from '../../pages/_app';
import { ConnectionProps } from './gameRoomUtils/SocketConnection';

type PlayTurn = {
  mode:string,
  words:Array<any>
}

export const GameContext = createContext<any>(null);

type Props = {
  socketConnection:Function
}

export type RoomConfig = {
  selectLimit:number
  maxAttempts:number
  catchTurn:number
}

const Game:FC = () => {
  const { creatorOfRoom, connection } = useContext(PlayGameContext);
  const router = useRouter();
  const appTheme = useTheme();
  const gameMode = 'not alone';
  const players = [1, 2];
  const defoultFirstPlayer = 1;

  const [wordsSelectLimit, setWordsSelectLimit] = useState<number>(6)
  const [maxAttempts, setMaxAttempts] = useState<number>(3);
  const [wordsToCatch, setWordsToCatch] = useState<number>(1);
  const [turnPlayed, setTurnPlayed] = useState<PlayTurn|null>(null);
  const [catchTurn, setCatchTurn] = useState<number>(defoultFirstPlayer);
  const [playingTurn, setPlayingTurn]  = useState<number>(catchTurn);
  const [intentsCount, setIntentsCount] = useState<Array<any>>([]);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [playerNumber, setPlayerNumber] = useState<number>(() => creatorOfRoom ? 1 : 2);

  const [showingGameOptionsMenu, showGameOptionsMenu] = useState<boolean|undefined>(creatorOfRoom);

  useEffect(() => {
    if (turnPlayed && turnPlayed.mode === 'select') {
      turnPlayed?.words.length > 0 && setIntentsCount(() => 
      turnPlayed.words.map(word => ({ wordId: word.id, intents: 0 , right: false })));
    } else {
      setIntentsCount(() => []);
    }
  }, [turnPlayed]);

  const handleConfig = (config:RoomConfig) => {
    setWordsSelectLimit(() => config.selectLimit);
    setMaxAttempts(() => config.maxAttempts);
    setCatchTurn(() => config.catchTurn);
  }
  useEffect(() => {
    connection && connection({ handleRoomConfig: handleConfig } as ConnectionProps);
  }, [connection]);

  useEffect(() => {
    setPlayingTurn(() => catchTurn);
  },[catchTurn]);

  const playTurn = (turned:PlayTurn, playerId:number) => {
    setTurnPlayed(() => turned);

    let playing:number|undefined = playerId;
    if (turned.mode !== 'guess') playing = players.find(id => id !== playerId);
    if (playing !== undefined) setPlayingTurn(() => playing);
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
      setPlayerPoints(() => playerPoints + 2);
    } else {
      setPlayerPoints(() => playerPoints + 1);
    }
  }

  const checkIntents = (words:Array<any>) => {
    words.forEach(intent => {
      const wordToGuess = turnPlayed?.words.find(word => word.id === intent.id);
      const rightAnswer = wordToGuess?.word === intent.word;

      const wordAttemptsCount = intentsCount.find(word => word.wordId === intent.id);
      const totalAttempsCount = intentsCount.filter(word => word.wordId !== intent.id);
      const attemptsUpdated = wordAttemptsCount.intents + 1;
      setIntentsCount(() => {
        return [ ...totalAttempsCount, 
                { wordId: intent.id, intents:  attemptsUpdated, right: rightAnswer } ];
      });

      if (rightAnswer) {
        addPlayerPoints(attemptsUpdated);
      }
    });
  }

  const guessTurnEnd = ():boolean => {
    if (intentsCount.length > 0){
      const withAttempts = intentsCount.filter(intent => (intent.intents < maxAttempts) && !intent.right);
      if (withAttempts.length === 0) return true;
    }
    return false;
  }

  const finishGame = () => {
    router.push(
      {
        pathname: '/'
      }, 
      undefined,
      { shallow: true }
    )
  }

  const setDifficult = (wordsToCatch:number, maxAttempts:number, wordsSelectLimit:number) => {
    setWordsToCatch(() => wordsToCatch);
    setMaxAttempts(() => maxAttempts);
    setWordsSelectLimit(() => wordsSelectLimit);
  }

  const setWhoCatch = (playerNumb:number) => {
    setCatchTurn(() => playerNumb);
    setPlayingTurn(() => playerNumb);
  }

  const setConfigRoom = () => {
    showGameOptionsMenu(() => false);
    connection && connection({get:true}).emit('room-config', {
        selectLimit: wordsSelectLimit,
        maxAttempts: maxAttempts,
        catchTurn: catchTurn
      } as RoomConfig
    );
  }

  return (
    <GameContainer theme={appTheme}>
      {showingGameOptionsMenu 
      && 
      <GameOptionsMenu 
        handleDifficult={setDifficult} 
        handleDone={setConfigRoom}
        handleChangeCatchTurn={setWhoCatch}
        catching={catchTurn}
        />
      ||
      <GameContext.Provider value={{ 
        finishGame,
        gameMode: gameMode,
        intentsCount: intentsCount, 
        maxAttempts,
        playerPoints,
        wordsSelectLimit,
        wordsToCatch
      }}>
        <PointsCounterView points={playerPoints} />
        <Player
              key={playerNumber} 
              onPlayTurn={playTurn}
              playingTurn={playerNumber === playingTurn}
              id={playerNumber}
              turn={createTurn(playerNumber)}
              intentsReceiver={checkIntents}
              guessEnd={guessTurnEnd()}
              />
      </GameContext.Provider>}
    </GameContainer>
  );
}

export default Game;