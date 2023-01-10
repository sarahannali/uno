// card counts
export const MIN_NUMBER_CARD = 0;
export const MIN_DUPLICATE_NUMBER_CARD = 1;
export const MAX_NUMBER_CARD = 9;

// card info
export const CARD_TYPES = Object.freeze({
  NUMBER: 'number',
  ACTION: 'action',
});

export const BASIC_COLORS = Object.freeze(['RED', 'GREEN', 'YELLOW', 'BLUE']);
export const WILD_COLOR = 'WILD';

export const ACTIONS = Object.freeze({
  REVERSE: 'reverse',
  SKIP: 'skip',
  DRAW_TWO: 'draw_two',
  WILD: 'wild',
  WILD_DRAW_FOUR: 'wild_draw_four'
})

// move info
export const MOVE_TYPES = Object.freeze({
  START_GAME: 'start_game',
  PLAY_CARD: 'play_card',
  DRAW_CARD: 'draw_card',
  UNO: 'uno'
})
