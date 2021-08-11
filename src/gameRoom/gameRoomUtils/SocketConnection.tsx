import { NextRouter } from "next/dist/client/router"
import { io } from "socket.io-client"
import { AttemptResponse, RoomConfig, Word } from "../Game"

export type CustomRouter = NextRouter & {
  userId:string
  roomId:string
}

export type ConnectionProps = {
  handleRoomConfig?:Function
  handleRangeSelected?:Function
  handleWordsSelected?:Function
  handleAttemptChecked?:Function
  get?:boolean
}


const SocketConnection = (userId:string, action:string, roomId:string) => {
  const socket = io('http://localhost:8080/game-room', { autoConnect: false });

  console.log('Connecting to server...');
  socket.auth = { playerID: userId };
  socket.connect();

  return ({ 
    handleRoomConfig, 
    handleRangeSelected, 
    handleWordsSelected, 
    handleAttemptChecked, 
    get 
  }:ConnectionProps) => {
    socket.on('connected', (playerId:string) => {
      console.log(`Connected with ID=${playerId}`);
      if(action === 'create') {
        console.log(`Trying to create room with ID=${roomId}`);
        socket.emit('create-room', roomId);
      } else if (action === 'connect') {
        console.log(`Trying to connect to room with ID=${roomId}`);
        socket.emit('join-to-room', roomId);
      }
    });

    socket.on('created-room', (room:string) => {
      console.log(`Room with ID=${room} was created`);
    });

    socket.on('user-joined', (joinResponse:any) => {
      console.log(`Player connected to room with ID=${roomId}`);
      console.log(joinResponse);
    });

    socket.on('room-config', (roomConfig:RoomConfig) => {
      if (handleRoomConfig) {
        handleRoomConfig(roomConfig);
      }
    });

    socket.on('word-range-selected', (words:Array<Word>) => {
      if (handleRangeSelected) {
        console.log('receiving range ...');
        handleRangeSelected(words);
      }
    });

    socket.on('words-selected', (words:Array<Word>) => {
      if (handleWordsSelected) {
        console.log('receiving words ...');
        handleWordsSelected(words);
      }
    });

    socket.on('attempt-checked', (attemptResult:AttemptResponse) => {
      if (handleAttemptChecked) {
        handleAttemptChecked(attemptResult);
      }
    });

    if (get) return socket;
    return;
  }
}

export default SocketConnection
