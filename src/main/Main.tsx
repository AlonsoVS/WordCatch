import { NextRouter, useRouter } from 'next/dist/client/router'
import React from 'react'

const Main: React.FC = () => {
  const router:NextRouter = useRouter();

  const playGame = ():void => {
    router.push(
      {
        pathname: '/playgame',
        query: { data: 'any' }
      },
      '/playgame',
      { shallow: true }
    );
  }

  return (
    <div>
      <button onClick={playGame}>
        Play Game
      </button>
    </div>
  )
}

export default Main
