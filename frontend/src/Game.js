import { useState, useEffect } from 'react'
import client from '@urturn/client'
import styles from './Game.module.css';
import { MOVE_TYPES } from './constants';

const EMPTY_CARD = {
  type: '',
  value: '',
  color: ''
}

function Game() {
  const [roomState, setRoomState] = useState(client.getRoomState() || {});
  console.log("roomState:", roomState)

  // setup event listener for updating roomState when client fires
  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setRoomState(newBoardGame);
    };
    client.events.on('stateChanged', onStateChanged);
    return () => {
      client.events.off('stateChanged', onStateChanged);
    };
  }, []);

  const [curPlr, setCurPlr] = useState();
  console.log("curPlr:", curPlr)

  const {
    state: {
      playerHandsById,
      discardPile = []
    } = {}
  } = roomState;
  // console.log(playerHands[curPlr.id])

  // load current player, which is initially null
  useEffect(() => {
    const setupCurPlr = async () => {
      const newCurPlr = await client.getLocalPlayer();
      setCurPlr(newCurPlr);
    };
    setupCurPlr();
  }, []);

  console.log("DISCARD PILE: ", discardPile)
  const topCard = discardPile.length > 0 ? discardPile[discardPile.length - 1] : EMPTY_CARD;
  console.log("TOP CARD: ", topCard)

  return (
    <div>
      <h1 className={styles['game-title']}>TODO: Implement your game UI here!</h1>
      <p className={styles.description}>Current Plr: {curPlr?.username}</p>
      <div style={{ color: 'white'}}>TOP CARD: {topCard.value + ' ' + topCard.color}</div>
      <button onClick={() => client.makeMove({ type: MOVE_TYPES.START_GAME })}>START GAME</button>
      <p></p>
      <button onClick={() => client.makeMove({ type: MOVE_TYPES.DRAW_CARD })}>DRAW CARD</button>
      <p></p>
      {
        (curPlr && playerHandsById && playerHandsById[curPlr.id]) && playerHandsById[curPlr.id].map((card) => 
          <button onClick={() => client.makeMove({ type: MOVE_TYPES.PLAY_CARD, card: card })}>{card.type} {card.value} {card.color}</button>
        )
      }
    </div>
  );
}

export default Game;
