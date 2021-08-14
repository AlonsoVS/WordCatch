import { NextRouter, useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import SocketConnection from '../src/gameRoom/gameRoomUtils/SocketConnection';
import UserRoomDataView, { PlayerData } from '../src/gameRoom/gameRoomUtils/UserRoomDataView';
import { PlayGameButton } from '.././src/main/PlayGameButton';
import { PlayGameContext } from './_app';
import { MultiplayerMainView } from '../src/utils/MultiplayerMainView';
import { ActionButton } from '../src/gameRoom/gameRoomUtils/DictionaryUtils';
import styled from 'styled-components';

const DoneButton = styled(ActionButton)`
  padding: 1.4rem 1rem
`

const MultiplayerGame:FC = () => {
  const { addConnection, connection, creatorOfRoom, setCreatorOfRoom } = useContext(PlayGameContext);
  const roomActions = ['create', 'connect'];
  const [actionRoom, setActionRoom] = useState<string>();
  const [playerData, setPlayerData] = useState<PlayerData>({ userId: '', roomId: '' });
  const [socketConnected, setSocketConnected] = useState<Socket>();
  const [rooms, setRooms] = useState<Array<string>>([]);
  const router:NextRouter = useRouter();

  const setAction = (action:string) => {
    setActionRoom(() => action);
  }

  const handleUserData = (data:PlayerData) => {
    setPlayerData(() => ({ ...playerData, ...data}));
  }

  const handleConnected = (playerId:string, connection:Socket) => {
    setSocketConnected(() => connection);
  }

  const handleGetRooms = (rooms:Array<string>) => {
    setRooms(() => rooms);
  }

  useEffect(() => {
    if (playerData.userId && !connection) {
      const connection:Function = SocketConnection(playerData.userId);
      connection({handleConnected, handleGetRooms});
      if (addConnection) {
        addConnection(connection);
      }
    }
  }, [actionRoom, addConnection, connection, playerData]);

  useEffect(() => {
    if (socketConnected) {
      socketConnected.emit('get-rooms');
      if (actionRoom && playerData.userId && playerData.roomId) {
        if (connection) {
          if(actionRoom === 'create') {
            console.log(`Trying to create room with ID=${playerData.roomId}`);
            socketConnected.emit('create-room', playerData.roomId);
          } else if (actionRoom === 'connect') {
            console.log(`Trying to connect to room with ID=${playerData.roomId}`);
            socketConnected.emit('join-to-room', playerData.roomId);
          }
          setCreatorOfRoom && setCreatorOfRoom(actionRoom === 'create');
          router.push({
            pathname: '/game-room',
            query: playerData
          }, '/game-room');
        }
      }
    }
  }, [actionRoom, connection, playerData, router, socketConnected]);
  
  const connectToRoom = (room:string) => {
    handleUserData({...playerData, roomId: room});
    setAction('connect');
  }

  return (
    <>
      <Head>
        <title>Play Game</title>
      </Head>
      <MultiplayerMainView>
        {(playerData.userId 
          && 
          (
            (
              actionRoom
              && <UserRoomDataView action={actionRoom} dataType='roomId' onDataSubmit={handleUserData}/>
            )
            ||
            <>
              {rooms.map((room, idx) => 
                <PlayGameButton key={idx} onClick={() => connectToRoom(room)}>
                  Connect to {room}
                </PlayGameButton>)}
              <DoneButton key={'create'} onClick={() => setAction('create')}>Create Room</DoneButton>
            </>
          ) 
        )
        ||
        <UserRoomDataView action={'done'} dataType='userId' onDataSubmit={handleUserData}/>
        }
      </MultiplayerMainView>
    </>
  );
}

export default MultiplayerGame;