import { CARD_TYPES, BASIC_COLORS, MAX_NUMBER_CARD, MIN_NUMBER_CARD, WILD_COLOR, MIN_DUPLICATE_NUMBER_CARD, ACTIONS } from "./constants";
import { GetNextPlayerIdx } from "./players";

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

export const IsValidCard = (deck, card, colorOverride) => {
  const { color } = card;
  const lastCard = deck[deck.length - 1];

  if (color === WILD_COLOR) {
    return true;
  }

  return lastCard.color === card.color || card.color === colorOverride || lastCard.value === card.value;
}

export const DrawCards = (deck, drawNumber, hand) => {
  const newDeck = [...deck];
  const removedCards = newDeck.splice(0, drawNumber);

  // if draw over?
  return {
    updatedHand: hand.concat(removedCards),
    updatedDeck: newDeck
  };
};

export const PlayCard = (handOne, handTwo, cardToRemove) => {
  return {
    updatedHandOne: handOne.filter((card) => card.id != cardToRemove.id),
    updatedHandTwo: [...handTwo, cardToRemove]
  }
};
