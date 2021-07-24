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

const MenuButton = styled(PlayGameButton)`
  margin: 0.2rem 0;
  padding: calc(0.2rem + 0.6vw + 0.6vh);
  font-size: medium;
`

type Props = {
  handleDifficult:Function
}

const GameOptionsMenu:FC<Props> = ({ handleDifficult }) => {

  const setEasyDifficult = () => {
    handleDifficult(1, 6, 6);
  }

  const setMediumDifficult = () => {
    handleDifficult(2, 3, 10);
  }

  const setHardDifficult = () => {
    handleDifficult(4, 2, 14);
  }

  return (
    <>
      <MenuTitle>Select difficult</MenuTitle>
      <MenuContainer>
        <MenuButton onClick={setEasyDifficult}> Easy </MenuButton>
        <MenuButton onClick={setMediumDifficult}> Medium </MenuButton>
        <MenuButton onClick={setHardDifficult}> Hard </MenuButton>
      </MenuContainer>
    </>
  );
}

export default GameOptionsMenu;