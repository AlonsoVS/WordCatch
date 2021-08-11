import { useRouter } from "next/dist/client/router";
import { useContext } from "react"
import Game from "../src/gameRoom/Game";
import { PlayGameContext } from "./_app"

const GameRoom = () => {
  const { connection } = useContext(PlayGameContext);
  const playerData = useRouter().query;
  if (connection) {
    return (
      <Game { ...playerData }/>
    )
  }
  return <h1>Error: not connected</h1>
}

export default GameRoom
