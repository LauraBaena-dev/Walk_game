import { describe, it, expect } from 'vitest';
import { usePlayer } from '../../composables/gameView/usePlayer';

describe('usePlayer', () => {
  describe('transformRowsToLetters', () => {
    it('Should transform numbers to letters', () => {
      const { transformRowsToLetters } = usePlayer();
      const input = [
        { row: 0, column: 1 },
        { row: 1, column: 2 },
        { row: 2, column: 3 },
      ];
      const result = transformRowsToLetters(input);
      expect(result).toEqual([
        { row: 'a', column: 1 },
        { row: 'b', column: 2 },
        { row: 'c', column: 3 },
      ]);
    });

    it('Should return an empty array if the input is empty', () => {
      const { transformRowsToLetters } = usePlayer();
      const input = [];
      const result = transformRowsToLetters(input);
      expect(result).toEqual([]);
    });
  });
});
