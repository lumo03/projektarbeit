import { FC, useContext } from 'react'
import { GameContext } from '../../components/socket';

const TheGame: FC = () => {
    const { user } = useContext(GameContext);
  return (
    <>
          <h3>Willkommen beim Spiel</h3>
          <p>Du bist im Raum {user.roomId}</p>
          <p>Warte auf andere Spieler...</p>
    </>
  )
}

export default TheGame;