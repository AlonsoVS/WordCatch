import { useContext } from "react"
import Game from "../src/gameRoom/Game";
import { PlayGameContext } from "./_app"

const GameRoom = () => {
  const { connection } = useContext(PlayGameContext);
  if (connection) {
    return (
      <Game/>
    )
  }
  return <h1>Error: not connected</h1>
}

export default GameRoom
