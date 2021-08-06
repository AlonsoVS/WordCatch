import { NextRouter, useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { FC, useState } from 'react';
import Game from '../src/gameRoom/Game';
import GameRoom from '../src/gameRoom/gameRoomUtils/GameRoom';
import UserRoomDataView, { PlayerData } from '../src/gameRoom/gameRoomUtils/UserRoomDataView';

const PlayGame:FC = () => {
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
  return (
    <>
      <Head>
        <title>Game Room</title>
      </Head>
      {/* <Game/> */}
      {(playerData && 
        <GameRoom {...playerData } action={actionRoom} />)
        || 
        <> 
          <UserRoomDataView action={actionRoom} onDataSubmit={handleUserData}/>
          {roomActions.map(action => action !== actionRoom && 
            <button key={action} onClick={() => setAction(action)}>{action}</button>)}
        </>}
    </>
  );
}

export default PlayGame;