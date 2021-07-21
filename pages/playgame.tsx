import Head from 'next/head';
import { FC } from 'react';
import Game from '../src/gameRoom/Game';

const playgame:FC = () => {
  return (
    <>
      <Head>
        <title>Game Room</title>
      </Head>
      <Game/>
    </>
  );
}

export default playgame;