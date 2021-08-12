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

  const playAlone = ():void => {
    router.push('/single-player');
  }

  const multiplayerGame = ():void => {
    router.push('/multiplayer');
  }

  return (
    <MainContainer theme={appTheme}>
      <MainTitle theme={appTheme}>Word Catch</MainTitle>
      <MainCard theme={appTheme}>
        <PlayGameButton theme={appTheme} onClick={playAlone}>
          Single Player
        </PlayGameButton>
        <PlayGameButton theme={appTheme} onClick={multiplayerGame}>
          Multiplayer
        </PlayGameButton>
      </MainCard>
    </MainContainer>
  );
}

export default Main;