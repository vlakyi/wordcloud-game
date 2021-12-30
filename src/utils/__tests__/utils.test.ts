import {
  generateRandomNumber,
  fetchData,
} from '../utils';

import { server, INVALID_URL, QUESTIONS_URL } from '../../mocks/server';

import { testQuestions } from '../../setupTests';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('getRandomNumber', () => {
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
    it(`should generate integer number when min <= max. Min:${min} Max:${max}`, () => {
      let { randomNumber, error } = generateRandomNumber(min, max);

      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
      expect(Number.isInteger(randomNumber)).toBe(true);
      expect(error).toBe('');
    });
  });

  incorrectRangesArray.forEach(({ min, max }) => {
    it(`should return error when min > max. Min:${min} Max:${max}`, () => {
      // generate in correct range
      let min = 40;
      let max = 1;
      let { randomNumber, error } = generateRandomNumber(min, max);

      expect(randomNumber).toBe(Infinity);
      expect(error.length).toBeGreaterThan(0);
    });
  });
});

describe('fetchData', () => {
  it('should return questions data', async () => {
    const data = await fetchData(QUESTIONS_URL);

    // expect data to be non empty array
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should fail request and return an error', async () => {
    const error = await fetchData(INVALID_URL);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Failed to load data: 404');
  });
});
