import client from '@urturn/client'
import { MOVE_TYPES } from "./constants";

function Card({ card }) {
  const playCard = async () => {
    const { error } = await client.makeMove({ type: MOVE_TYPES.PLAY_CARD, card: card });

    if (error) console.log(error);
  }
  return <button onClick={playCard}>{card.type} {card.value} {card.color}</button>
}

export default Card;