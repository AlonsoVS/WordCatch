import { NextRouter, useRouter } from 'next/dist/client/router'
import React from 'react'
import styled from 'styled-components';
import Button from '../utils/Button';

const PlayGameButton = styled(Button)`
    background: white;
    border: solid 2px;
    border-color: #363636;
    color: #363636;
    width: 200px;
    font-size: medium;
    font-weight: bold;
    &:hover {
      color: white;
      background: #ffa13d;
      border: none
    }
`

const MainContainer = styled.div`
    background: #003459;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%
`

const MainCard = styled.div`
    background: white;
    border: solid 1px;
    border-color: #363636;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    height: fit-content;
    width: fit-content;
`

const MainTitle = styled.a`
    color: white;
    font-size: xx-large;
    font-weight: bold;
    margin: 0rem 0rem 1rem;
`

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
    <MainContainer>
      <MainTitle>Word Catch</MainTitle>
      <MainCard>
        <PlayGameButton onClick={playGame}>
          Play Game
        </PlayGameButton>
      </MainCard>
    </MainContainer>
  )
}

export default Main