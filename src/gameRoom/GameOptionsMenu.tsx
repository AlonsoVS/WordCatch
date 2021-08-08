import React, { FC } from 'react';
import styled from 'styled-components';
import { MainCard } from '../main/MainCard';
import { PlayGameButton } from '../main/PlayGameButton';
import { ShowingLetterTitle } from './gameRoomUtils/DictionaryUtils';

const MenuTitle = styled(ShowingLetterTitle)`
  margin: 0 0 2vh;
  text-align: center;
`

const MenuContainer = styled(MainCard)`
  min-height: 162px;
  padding: 1rem;
`

interface StyledProps {
  selected:boolean
}

const MenuButton = styled(PlayGameButton)<StyledProps>`
  background: ${props => props.selected ? props.theme.secondary : 'white'};
  margin: 0.2rem 0;
  padding: calc(0.2rem + 0.6vw + 0.6vh);
  font-size: medium;
`

type Props = {
  handleDifficult:Function
  handlePlayerNumb:Function
  numberOfPlayer:number
}

const GameOptionsMenu:FC<Props> = ({ handleDifficult, handlePlayerNumb, numberOfPlayer }) => {

  const setEasyDifficult = () => {
    handleDifficult(1, 6, 6);
  }

  const setMediumDifficult = () => {
    handleDifficult(2, 3, 10);
  }

  const setHardDifficult = () => {
    handleDifficult(4, 2, 14);
  }

  const setPlayerNumb = (numb:number) => {
    handlePlayerNumb(numb);
  }

  return (
    <>
      <MenuTitle>Select difficult</MenuTitle>
      <MenuContainer>
        <MenuButton onClick={setEasyDifficult}> Easy </MenuButton>
        <MenuButton onClick={setMediumDifficult}> Medium </MenuButton>
        <MenuButton onClick={setHardDifficult}> Hard </MenuButton>
        <MenuButton 
          onClick={() => setPlayerNumb(1)}
          selected={numberOfPlayer === 1}
          > 
          Player 1
        </MenuButton>
        <MenuButton 
          onClick={() => setPlayerNumb(2)} 
          selected={numberOfPlayer === 2}
          > 
          Player 2 
        </MenuButton>
      </MenuContainer>
    </>
  );
}

export default GameOptionsMenu;