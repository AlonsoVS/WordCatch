import { NextRouter, useRouter } from "next/dist/client/router"
import React, { FC } from "react"
import { io } from "socket.io-client"
import { PlayerData } from "./UserRoomDataView"

export type CustomRouter = NextRouter & {
  userId:string
  roomId:string
}

export type ConnectionProps = (PlayerData) & {
  action:string
}

const SocketConnection = (userId:string) => {
  const socket = io('http://localhost:8080/game-room', { autoConnect: false });

  console.log('Connecting to server...');
  socket.auth = { playerID: userId };
  socket.connect();

  return (action:string, roomId:string) => {
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

    return socket;
  }
}

export default SocketConnection
