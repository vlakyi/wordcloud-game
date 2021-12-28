import { generateRandomNumber } from '../utils';

describe('Utils Funcitons', () => {
  const correctRangesArray = [
    { min: 1, max: 2 },
    { min: 10, max: 100 },
    { min: 20, max: 30 },
    { min: 1, max: 1 },
  ];

  const incorrectRangesArray = [
    { min: 2, max: 1 },
    { min: 100, max: 10 },
    { min: 30, max: 20 },
  ];

  correctRangesArray.forEach(({ min, max }) => {
    it(`getRandomNumber generates integer number when min <= max. Min:${min} Max:${max}`, () => {
      let { randomNumber, error } = generateRandomNumber(min, max);

      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
      expect(Number.isInteger(randomNumber)).toBe(true);
      expect(error).toBe('');
    });
  });

  incorrectRangesArray.forEach(({ min, max }) => {
    it(`getRandomNumber returns error when min > max. Min:${min} Max:${max}`, () => {
      // generate in correct range
      let min = 40;
      let max = 1;
      let { randomNumber, error } = generateRandomNumber(min, max);

      expect(randomNumber).toBe(Infinity);
      expect(error.length).toBeGreaterThan(0);
    });
  });
});
