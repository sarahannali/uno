// tip: docs @ https://docs.urturn.app/docs/API/backend#functions
import { IsValidCard, PlayCard, DrawCards } from './cards';
import { GetNextPlayerIdx } from './players';
import { ACTIONS, CARD_TYPES, MOVE_TYPES } from './constants';
import { ShuffleDeck, CreateDeck } from './deck';


function onRoomStart(roomState) {
  return {
    state: {
      deck: ShuffleDeck(CreateDeck()),
      discardPile: [],
      playerHandsById: {},
      currentPlayerIndex: null,
      isReverse: false,
      colorOverride: null
    }
  }
}

function onPlayerJoin(player, roomState) {
  const { state } = roomState;

  const { updatedHand, updatedDeck } = DrawCards(state.deck, 7, []);
  state.playerHandsById[player.id] = updatedHand;
  state.deck = updatedDeck;

  // max players?
  return { state }
}

function onPlayerQuit(player, roomState) {
  const { logger } = roomState
  logger.info('Quit called with:', { player, roomState })
  logger.warn('TODO: implement how to change the roomState when a player quits the room')
  return {}
}

function onPlayerMove(player, move, roomState) {
  const { players, state } = roomState;
  const { deck, discardPile, isReverse, playerHandsById, currentPlayerIndex, colorOverride } = state;
  const { type, card, colorChoice } = move;

  switch (type) {
    case MOVE_TYPES.START_GAME: {
      const { updatedHand, updatedDeck } = DrawCards(deck, 1, discardPile);

      state.discardPile = updatedHand;
      state.deck = updatedDeck;
      state.currentPlayerIndex = 0;

      return { state }
    }
    case MOVE_TYPES.DRAW_CARD: {
      const playerHand = playerHandsById[player.id];
      const { updatedHand, updatedDeck } = DrawCards(deck, 1, playerHand);

      state.playerHandsById[player.id] = updatedHand;
      state.deck = updatedDeck;

      return { state }
    }
    case MOVE_TYPES.PLAY_CARD:
      if (player.id !== players[currentPlayerIndex].id) {
        throw new Error("It's not your turn!");
      }
      
      const playerHand = playerHandsById[player.id];
      if (IsValidCard(discardPile, card, colorOverride)) {
        const { 
          updatedHandOne: updatedPlayerHand,
          updatedHandTwo: updatedDiscardPile
        } = PlayCard(playerHand, discardPile, card);

        state.discardPile = updatedDiscardPile;
        state.playerHandsById[player.id] = updatedPlayerHand;
        state.colorOverride = null;
        
        if (card.type === CARD_TYPES.NUMBER) {
          state.currentPlayerIndex = GetNextPlayerIdx(players, currentPlayerIndex, +1, isReverse);
        } else if (card.type === CARD_TYPES.ACTION || card.type === CARD_TYPES.WILD) {
          switch (card.value) {
            case ACTIONS.DRAW_TWO: {
              const nextPlayer = players[GetNextPlayerIdx(players, currentPlayerIndex, +1, isReverse)];
              
              const { updatedHand, updatedDeck } = DrawCards(deck, 2, playerHandsById[nextPlayer.id]);
        
              state.deck = updatedDeck;
              state.playerHandsById[nextPlayer.id] = updatedHand;
              state.currentPlayerIndex = GetNextPlayerIdx(players, currentPlayerIndex, +1, isReverse);
              break;
            }
            case ACTIONS.REVERSE: {
              const newReverse = !isReverse;

              state.isReverse = newReverse;
              state.currentPlayerIndex = GetNextPlayerIdx(players, currentPlayerIndex, +1, newReverse);

              break;
            }
            case ACTIONS.SKIP: {
              state.currentPlayerIndex = GetNextPlayerIdx(players, currentPlayerIndex, +2, isReverse);

              break;
            }
            case ACTIONS.WILD:
              state.colorOverride = colorChoice;
              state.currentPlayerIndex = GetNextPlayerIdx(players, currentPlayerIndex, +1, isReverse);
              
              break;
            case ACTIONS.WILD_DRAW_FOUR: {
              const nextPlayer = players[GetNextPlayerIdx(players, currentPlayerIndex, +1, isReverse)];
              
              const { updatedHand, updatedDeck } = DrawCards(deck, 4, playerHandsById[nextPlayer.id]);
        
              state.colorOverride = colorChoice;
              state.deck = updatedDeck;
              state.playerHandsById[nextPlayer.id] = updatedHand;
              state.currentPlayerIndex = GetNextPlayerIdx(players, currentPlayerIndex, +1, isReverse);
              break;
            }
          }
        }

        return { state };
      } else throw new Error("Invalid card!");
    case MOVE_TYPES.UNO:
      break;
  }

  return { state }
}

// Export these functions so UrTurn runner can run these functions whenever the associated event
// is triggered. Follow an example flow of events: https://docs.urturn.app/docs/Introduction/Flow-Of-Simple-Game
export default {
  onRoomStart,
  onPlayerJoin,
  onPlayerQuit,
  onPlayerMove,
};
