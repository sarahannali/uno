export const GetNextPlayerIdx = (players, currentPlayerIndex, indexOffset, isReverse) => {
  return (((currentPlayerIndex + (indexOffset * (isReverse ? -1 : +1))) % players.length) + players.length) % players.length;
}