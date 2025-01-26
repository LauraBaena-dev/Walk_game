export function usePlayer() {
  const transformRowsToLetters = (arr) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return arr.map((item) => ({
      row: alphabet[item.row],
      column: item.column,
    }));
  };
  return {
    transformRowsToLetters,
  };
}
