// card counts
export const MIN_NUMBER_CARD = 0;
export const MIN_DUPLICATE_NUMBER_CARD = 1;
export const MAX_NUMBER_CARD = 9;

export const NUMBER_ACTION_CARDS = 2;
export const NUMBER_WILD_TYPE_CARDS = 4;

// card info
export const CARD_TYPES = Object.freeze({
  NUMBER: 'number',
  ACTION: 'action',
  WILD: 'wild',
});

export const BASIC_COLORS = Object.freeze(['RED', 'GREEN', 'YELLOW', 'BLUE']);
export const WILD_COLOR = 'WILD';

export const COLOR_ACTIONS = Object.freeze(['REVERSE', 'DRAW_TWO', 'SKIP']);

export const WILD_ACTIONS = Object.freeze(['WILD', 'WILD_DRAW_FOUR']);

// move info
export const MOVE_TYPES = Object.freeze({
  START_GAME: 'start_game',
  PLAY_CARD: 'play_card',
  DRAW_CARD: 'draw_card',
  UNO: 'uno'
})
