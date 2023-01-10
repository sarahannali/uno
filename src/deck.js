import { CreateCards } from './cards'

export const CreateDeck = () => {
  const deck = [];

  deck.push(...CreateCards());

  return deck;
};

export const ShuffleDeck = (deck) => {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
};

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
