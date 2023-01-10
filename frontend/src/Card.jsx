import client from '@urturn/client'
import { useState } from 'react';
import { MOVE_TYPES, WILD_COLOR, BASIC_COLORS } from "./constants";

function Card({ card }) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const playCard = async (colorChoice = null) => {
    if (card.color === WILD_COLOR && colorChoice === null) {
      setShowColorPicker(true);
    } else {
      const { error } = await client.makeMove({ 
        type: MOVE_TYPES.PLAY_CARD,
        card: card,
        colorChoice
      });
  
      if (error) console.log(error);
      setShowColorPicker(false);
    }
  }
  return <div>
   <button onClick={() => playCard()}>{card.type} {card.value} {card.color}</button>
   {showColorPicker && <div>
      {BASIC_COLORS.map((color) => <button onClick={() => {playCard(color)}}>{color}</button>)}
    </div>}
   </div>
}

export default Card;