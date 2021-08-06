import { createContext, FC, useEffect, useState } from 'react'
import Player from './Player';
import { GameContainer } from './gameRoomUtils/GameUtils';
import { useTheme } from 'styled-components';
import PointsCounterView from './PointsCounterView';
import { useRouter } from 'next/dist/client/router';
import GameOptionsMenu from './GameOptionsMenu';
import { io } from 'socket.io-client';

type PlayTurn = {
  mode:string,
  words:Array<any>
}

export const GameContext = createContext<any>(null);

type Props = {
  showOptionsMenu:boolean
}

const Game:FC = () => {
  const router = useRouter();
  const appTheme = useTheme();
  const gameMode = 'alone';
  const players = [1, 2];
  const defoultFirstPlayer = 1;

  const socket = io('http://localhost:8080/game-room', { autoConnect: false });
  
  const [wordsSelectLimit, setWordsSelectLimit] = useState<number>(6)
  const [maxAttempts, setMaxAttempts] = useState<number>(3);
  const [wordsToCatch, setWordsToCatch] = useState<number>(1);
  const [turnPlayed, setTurnPlayed] = useState<PlayTurn|null>(null);
  const [catchTurn, setCatchTurn] = useState<number>(defoultFirstPlayer);
  const [playingTurn, setPlayingTurn]  = useState<number>(defoultFirstPlayer);
  const [intentsCount, setIntentsCount] = useState<Array<any>>([]);
  const [playerPoints, setPlayerPoints] = useState<number>(0);

  const [showingGameOptionsMenu, showGameOptionsMenu] = useState<boolean>(true);

  useEffect(() => {
    if (turnPlayed && turnPlayed.mode === 'select') {
      turnPlayed?.words.length > 0 && setIntentsCount(() => 
      turnPlayed.words.map(word => ({ wordId: word.id, intents: 0 , right: false })));
    } else {
      setIntentsCount(() => []);
    }
  }, [turnPlayed])

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
    showGameOptionsMenu(() => false);
  }

  return (
    <GameContainer theme={appTheme}>
      {showingGameOptionsMenu 
      && 
      <GameOptionsMenu handleDifficult={setDifficult} />
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
              key={1} 
              onPlayTurn={playTurn}
              playingTurn={1 === playingTurn}
              id={1}
              turn={createTurn(1)}
              intentsReceiver={checkIntents}
              guessEnd={guessTurnEnd()}
              />
      </GameContext.Provider>}
    </GameContainer>
  );
}

export default Game;