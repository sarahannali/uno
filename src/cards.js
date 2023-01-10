import { CARD_TYPES, BASIC_COLORS, MAX_NUMBER_CARD, MIN_NUMBER_CARD, WILD_COLOR, MIN_DUPLICATE_NUMBER_CARD, ACTIONS } from "./constants";

const CreateCard = (type, value, color, idx) => {
  return {
    type,
    value,
    color,
    id: type+value+color+idx
  }
};

const GetCardAmount = (type, value) => {
  switch (type) {
    case CARD_TYPES.NUMBER:
      if (value >= MIN_DUPLICATE_NUMBER_CARD) return 2;
      return 1;
    case CARD_TYPES.ACTION:
      return 2;
    case CARD_TYPES.WILD:
      return 4;
    default:
      1;
  }
}

export const CreateCards = () => {
  const cards = [];

  // Create color cards
  for (let number = MIN_NUMBER_CARD; number <= MAX_NUMBER_CARD; number++) {
    for (const color of BASIC_COLORS) {
      for (let i = 0; i < GetCardAmount(CARD_TYPES.NUMBER, number); i++) {
        cards.push(CreateCard(CARD_TYPES.NUMBER, number, color, i));
      }
    }
  }

  // Create color-based action cards
  const COLOR_ACTIONS = [
    ACTIONS.REVERSE,
    ACTIONS.SKIP,
    ACTIONS.DRAW_TWO,
  ];

  for (const action of COLOR_ACTIONS) {
    for (const color of BASIC_COLORS) {
      for (let i = 0; i < GetCardAmount(CARD_TYPES.ACTION, action); i++) {
        cards.push(CreateCard(CARD_TYPES.ACTION, action, color, i));
      }
    }
  }

  // Create wild cards
  const WILD_ACTIONS = [
    ACTIONS.WILD,
    ACTIONS.WILD_DRAW_FOUR
  ]
  for (const action of WILD_ACTIONS) {
    for (let i = 0; i < GetCardAmount(CARD_TYPES.ACTION, action); i++) {
      cards.push(CreateCard(CARD_TYPES.ACTION, action, WILD_COLOR, i));
    }
  }

  return cards;
}

export const IsValidCard = (deck, card) => {
  const { color } = card;
  const lastCard = deck[deck.length - 1];
  console.log("CARD: ", card)
  console.log("LAST CARD: ", lastCard);

  if (color === WILD_COLOR) {
    return true;
  }
  console.log("COLOR SAME: ", lastCard.color === card.color)
  console.log("VALUE SAME: ", lastCard.value === card.value)
  console.log("BOTH:", lastCard.color === card.color || lastCard.value === card.value)
  return lastCard.color === card.color || lastCard.value === card.value;
}

export const GetNextPlayerIdx = (players, currentPlayerIndex, indexOffset, isReverse) => {
  return (currentPlayerIndex + (indexOffset * (isReverse ? -1 : +1))) % players.length
}

export const PlayActionCard = (card, players, currentPlayerIndex, isReverse, playerHandsById, deck) => {
  const updatedState = {
    nextPlayer: GetNextPlayerIdx(players, currentPlayerIndex, +1, isReverse),
    updatedReverse: isReverse,
    updatedDeck: deck,
    updatedPlayerHands: playerHandsById
  }

  switch (card.value) {
    case ACTIONS.DRAW_TWO:
      const { removedCards, updatedDeck } = DrawCards(state.deck, 2);
      const nextPlayersHand = playerHandsById[nextPlayer.id];

      updatedState.updatedDeck = updatedDeck;
      updatedState.updatedPlayerHands[updatedState.nextPlayer.id] = [
        ...nextPlayersHand,
        removedCards
      ];
      break;
    case ACTIONS.REVERSE:
      const reverse = !isReverse;

      updatedState.isReverse = reverse;
      updatedState.nextPlayer = GetNextPlayerIdx(players, currentPlayerIndex, -1, reverse);
      break;
    case ACTIONS.SKIP:
      return {
        nextPlayerIndex: GetNextPlayerIdx(players, currentPlayerIndex, +2, isReverse)
      }
    case ACTIONS.WILD:
      break;
    case ACTIONS.WILD_DRAW_FOUR:
      break;
  }

  return updatedState;
}
