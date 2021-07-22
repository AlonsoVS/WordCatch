import { NextRouter, useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { useTheme } from 'styled-components';
import { MainContainer } from './MainContainer';
import { PlayGameButton } from './PlayGameButton';
import { MainCard } from './MainCard';
import { MainTitle } from './MainTitle';

const Main: React.FC = () => {
  const router:NextRouter = useRouter();
  const appTheme = useTheme();

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
    <MainContainer theme={appTheme}>
      <MainTitle theme={appTheme}>Word Catch</MainTitle>
      <MainCard theme={appTheme}>
        <PlayGameButton theme={appTheme} onClick={playGame}>
          Play Game
        </PlayGameButton>
      </MainCard>
    </MainContainer>
  );
}

export default Main;