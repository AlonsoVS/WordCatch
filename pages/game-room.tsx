import { useContext } from "react"
import { PlayGameContext } from "./_app"

const GameRoom = () => {
  const { connection } = useContext(PlayGameContext);
  console.log(connection);
  return (
    <div>
      Try to connect...
    </div>
  )
}

export default GameRoom
