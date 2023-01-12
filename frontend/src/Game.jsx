import { useState, useEffect } from 'react'
import client from '@urturn/client'
import styles from './Game.module.css';
import { MOVE_TYPES } from './constants';
import Card from './Card';
import { Grid } from '@mui/material';
import DiscardPile from './DiscardPile';
import PlayerHand from './PlayerHand';

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

  return (
    <div>
      <Grid
        container
        height="100vh"
        width="100vw"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        overflow="hidden"
      >
        <Grid item>
          <button onClick={() => client.makeMove({ type: MOVE_TYPES.START_GAME })}>START GAME</button>
        </Grid>
        <Grid item>
          <button onClick={() => client.makeMove({ type: MOVE_TYPES.DRAW_CARD })}>DRAW CARD</button>
        </Grid>
        <Grid item>
          <p className={styles.description}>Current Plr: {curPlr?.username}</p>
          <p className={styles.description}>Player to Move: {players && players[currentPlayerIndex] && players[currentPlayerIndex].id}</p>
        </Grid>
        <Grid item>
          <DiscardPile discardPile={discardPile} />
        </Grid>
        <Grid item width="100vw">
          <PlayerHand curPlr={curPlr} playerHandsById={playerHandsById}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Game;
