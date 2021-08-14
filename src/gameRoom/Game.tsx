import { createContext, FC, useContext, useEffect, useState } from 'react'
import Player from './Player';
import { GameContainer } from './gameRoomUtils/GameUtils';
import { useTheme } from 'styled-components';
import PointsCounterView from './PointsCounterView';
import { useRouter } from 'next/dist/client/router';
import GameOptionsMenu from './GameOptionsMenu';
import { PlayGameContext } from '../../pages/_app';
import { ConnectionProps } from './gameRoomUtils/SocketConnection';


export type WordPoints = {
  attemptsCount:number
  points:number
  wordId:string
}

export type AttemptCount = {
  count:number
  successful:boolean
  wordId:string
}

export type AttemptResponse = {
  allAttempts:Array<AttemptCount>
  attemptPoints:number
  points:{ 
    [player:string]:number 
  }
  pointsPerWord:Array<WordPoints>
}

type PlayTurn = {
  mode:string,
  words:Array<any>
}

export const GameContext = createContext<any>(null);

type Props = {
  userId:string
  roomId:string
  multiplayer?:boolean
}

export type Definition = {
  antonyms:Array<any>
  definition:string
  synonyms: Array<any>
}

export type Word = {
  definitions:Array<Definition>
	id: string
  partOfSpeech:string
  word?:string
}

export type RoomConfig = {
  selectLimit:number
  maxAttempts:number
  catchTurn:number
  wordsToCatch:number
}

const Game:FC<Props> = ({ userId, roomId, multiplayer }) => {
  const { creatorOfRoom, connection } = useContext(PlayGameContext);
  const playerName = userId;
  const gameMode = multiplayer? 'not alone':'alone';
  const router = useRouter();
  const appTheme = useTheme();
  const players = [1, 2];
  const defoultFirstPlayer = 1;

  const [wordsSelectLimit, setWordsSelectLimit] = useState<number>(6)
  const [maxAttempts, setMaxAttempts] = useState<number>(3);
  const [wordsToCatch, setWordsToCatch] = useState<number>(1);
  const [turnPlayed, setTurnPlayed] = useState<PlayTurn|null>(null);
  const [catchTurn, setCatchTurn] = useState<number>(defoultFirstPlayer);
  const [playingTurn, setPlayingTurn]  = useState<number>(catchTurn);
  const [attemptsCount, setAttemptsCount] = useState<Array<AttemptCount>>([]);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [playerNumber, setPlayerNumber] = useState<number>(() => (creatorOfRoom || !multiplayer)? 1 : 2);

  const [showingGameOptionsMenu, showGameOptionsMenu] = useState<boolean|undefined>(playerNumber === 1);

  useEffect(() => {
    if (turnPlayed && turnPlayed.mode === 'select') {
      turnPlayed?.words.length > 0 && setAttemptsCount(() => 
      turnPlayed.words.map(word => ({ wordId: word.id, count: 0, successful: false })));
    } else {
      setAttemptsCount(() => []);
    }
  }, [turnPlayed]);

  const handleRoomConfig = (config:RoomConfig) => {
    setWordsSelectLimit(() => config.selectLimit);
    setMaxAttempts(() => config.maxAttempts);
    setCatchTurn(() => config.catchTurn);
    setWordsToCatch(() => config.wordsToCatch);
  }

  const handleRangeSelected = (words:Array<Word>) => {
    setTurnPlayed(() => ({ mode: 'catch', words } as PlayTurn));
    setPlayingTurn(() => playerNumber);
  }

  const handleWordsSelected = (words:Array<Word>) => {
    setTurnPlayed(() => ({ mode: 'select', words } as PlayTurn));
    setPlayingTurn(() => playerNumber);
  }
  
  const handleAttemptChecked = (attemptResult:AttemptResponse) => {
    setAttemptsCount(() => attemptResult.allAttempts);
    setPlayerPoints(() => attemptResult.points[playerName]);
  }

  useEffect(() => {
    if (connection) {
      connection({ 
        handleRoomConfig, 
        handleRangeSelected, 
        handleWordsSelected,
        handleAttemptChecked
      } as ConnectionProps);
    }
  }, [connection]);

  useEffect(() => {
    setPlayingTurn(() => catchTurn);
  },[catchTurn]);

  const playTurn = (turned:PlayTurn, playerId:number) => {
    setTurnPlayed(() => turned);

    if (connection) {
      if (turned.mode === 'catch') {
        connection({get:true}).emit('word-range-selected', turned.words);
      } else if (turned.mode === 'select') {
        connection({get:true}).emit('words-selected', turned.words);
      }
    }

    let playing:number|undefined = playerId;
    if (turned.mode !== 'guess') playing = players.find(id => id !== playerId);
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
      words = turnPlayed.words;
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

  const checkAttempts = (words:Array<Word>) => {
    if (multiplayer) connection && connection({get:true}).emit('send-attempt', words);
    else {
      words.forEach(attempt => {
        const wordToGuess = turnPlayed?.words.find(word => word.id === attempt.id);
        const successful = wordToGuess?.word === attempt.word;
  
        const wordAttemptsCount = attemptsCount.find(word => word.wordId === attempt.id);
        const totalAttemptsCount = attemptsCount.filter(word => word.wordId !== attempt.id);
        const attemptsUpdated = ((wordAttemptsCount && wordAttemptsCount.count) || 0) + 1;
        setAttemptsCount(() => {
          return [ ...totalAttemptsCount, 
                  { wordId: attempt.id, count: attemptsUpdated, successful: successful } as AttemptCount ];
        });
  
        if (successful) {
          addPlayerPoints(attemptsUpdated);
        }
      });
    }
  }

  const guessTurnEnd = ():boolean => {
    if (attemptsCount.length > 0){
      const withAttempts = attemptsCount
        .filter(attempt => (attempt.count < maxAttempts) && !attempt.successful);
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
    if (multiplayer) {
      connection && connection({get:true}).emit('room-config', {
          selectLimit: wordsSelectLimit,
          maxAttempts: maxAttempts,
          catchTurn: catchTurn,
          wordsToCatch: wordsToCatch
        } as RoomConfig
      );
    }
  }

  return (
    <GameContainer theme={appTheme}>
      {showingGameOptionsMenu 
      && 
      <GameOptionsMenu 
        catching={catchTurn}
        handleDifficult={setDifficult} 
        handleDone={setConfigRoom}
        handleChangeCatchTurn={setWhoCatch}
        multiplayer={multiplayer as boolean}
        />
      ||
      <GameContext.Provider value={{ 
        finishGame,
        gameMode: gameMode,
        intentsCount: attemptsCount, 
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
          intentsReceiver={checkAttempts}
          guessEnd={guessTurnEnd()}
          />
        {!multiplayer 
        && 
        <Player
          key={2} 
          onPlayTurn={playTurn}
          playingTurn={2 === playingTurn}
          id={2}
          turn={createTurn(2)}
          intentsReceiver={checkAttempts}
          guessEnd={guessTurnEnd()}
          />}
      </GameContext.Provider>}
    </GameContainer>
  );
}

export default Game;