import { NextRouter, useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { FC, useContext, useEffect, useState } from 'react';
import SocketConnection from '../src/gameRoom/gameRoomUtils/SocketConnection';
import UserRoomDataView, { PlayerData } from '../src/gameRoom/gameRoomUtils/UserRoomDataView';
import { PlayGameContext } from './_app';

const MultiplayerGame:FC = () => {
  const { addConnection, connection, creatorOfRoom } = useContext(PlayGameContext);
  const roomActions = ['create', 'connect'];
  const [actionRoom, setActionRoom] = useState<string>(roomActions[0]);
  const [playerData, setPlayerData] = useState<PlayerData>();
  const router:NextRouter = useRouter();

  const setAction = (action:string) => {
    setActionRoom(() => action);
  }

  const handleUserData = (data:PlayerData) => {
    setPlayerData(() => data);
  }

  useEffect(() => {
    if (playerData && !connection) {
      const connection:Function = SocketConnection(playerData.userId, actionRoom, playerData.roomId);
      if (addConnection) {
        connection({});
        addConnection(connection, actionRoom === 'create');
        router.push({
          pathname: '/game-room',
          query: playerData
        }, '/game-room');
      }
    }
  }, [actionRoom, addConnection, connection, creatorOfRoom, playerData, router]);

  const getView = () => {
    if (playerData) {
      return <h1>Connecting...</h1>
    }
    return (
      <> 
        <UserRoomDataView action={actionRoom} onDataSubmit={handleUserData}/>
        {roomActions.map(action => action !== actionRoom && 
          <button key={action} onClick={() => setAction(action)}>{action}</button>)}
      </>
    )
  } 

  return (
    <>
      <Head>
        <title>Play Game</title>
      </Head>
      {getView()}
    </>
  );
}

export default MultiplayerGame;