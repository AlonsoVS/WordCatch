import { FC } from "react"
import Game from "../src/gameRoom/Game"

const SinglePlayer:FC = () => {
  return (
    <Game { ...{userId: 'player', roomId: ''} } />
  )
}

export default SinglePlayer
