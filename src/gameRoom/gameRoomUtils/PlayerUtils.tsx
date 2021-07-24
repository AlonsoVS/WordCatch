import styled from "styled-components"
import { MainCard } from "../../main/MainCard"
import { PlayGameButton } from '../../main/PlayGameButton'

export const GuessEndModal = styled.div`
  align-items: center;
  background: #191919de;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`

export const GuessEndModalCard = styled(MainCard)`
  max-width: 280px;
  min-height: 186px;
  padding: 1rem;
`

export const ModalButton = styled(PlayGameButton)`
  background: ${props => props.theme.primaryLight};
  color: ${props => props.theme.primaryText};
  margin: 0.2rem;
  padding: 0.4rem;
`

export const PointsCounter = styled.a`
  color: ${props => props.theme.secondary};
  height: fit-content;
  font-size: xx-large;
  margin: 1rem 0;
  text-align: center;
  width: 100%;
  @media (min-height: 328px) {
    font-size: xx-large;
    max-width: 800px;
  }
`