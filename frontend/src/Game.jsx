import { useState, useEffect } from 'react'
import client from '@urturn/client'
import styles from './Game.module.css';
import { MOVE_TYPES } from './constants';
import Card from './Card';

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
      playerHandsById = [],
      discardPile = [],
      currentPlayerIndex = 0
    } = {},
    players = []
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

  const topCard = discardPile.length > 0 ? discardPile[discardPile.length - 1] : EMPTY_CARD;

  return (
    <div>
      <h1 className={styles['game-title']}>TODO: Implement your game UI here!</h1>
      <p className={styles.description}>Current Plr: {curPlr?.username}</p>
      <p className={styles.description}>Player to Move: {players && players[currentPlayerIndex] && players[currentPlayerIndex].id}</p>
      <div style={{ color: 'white'}}>TOP CARD: {topCard.value + ' ' + topCard.color}</div>
      <button onClick={() => client.makeMove({ type: MOVE_TYPES.START_GAME })}>START GAME</button>
      <p></p>
      <button onClick={() => client.makeMove({ type: MOVE_TYPES.DRAW_CARD })}>DRAW CARD</button>
      <p></p>
      {
        (curPlr && playerHandsById && playerHandsById[curPlr.id]) && playerHandsById[curPlr.id].map((card) => 
          <Card card={card} />
        )
      }
    </div>
  );
}

export default Game;
