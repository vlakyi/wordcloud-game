import { NormalizedQuestionWord, NormalizedQuestionWordArray } from '../types';
import {
  generateRandomNumber,
  normalizeQuestions,
  capitalizeFirstCharacter,
  getWordClassName,
  fetchData,
  calculateScore,
} from '../utils';

import { server, INVALID_URL, QUESTIONS_URL } from '../../mocks/server';

import { testQuestions } from '../../setupTests';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

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

describe('normalizeQuestions', () => {
  const defaultWordClassName = 'test';

  const normalizedQuestions = normalizeQuestions(
    testQuestions,
    defaultWordClassName
  );

  it('should return normalized data', () => {
    normalizedQuestions.forEach(({ allWords, question }, index) => {
      const relatedQuestion = testQuestions[index];

      expect(question).toBe(capitalizeFirstCharacter(relatedQuestion.question));

      let wordsIdArray: Array<string> = [];

      allWords.forEach(({ id, value, selected, correct, className }) => {
        // id should locally unique
        expect(wordsIdArray.includes(id)).toBe(false);
        wordsIdArray.push(id);

        // value should be in all_words
        expect(relatedQuestion.all_words.includes(value)).toBe(true);

        // selected is false by default
        expect(selected).toBe(false);

        // word is correct if it was in good_words
        expect(relatedQuestion.good_words.includes(value)).toBe(correct);

        expect(className).toBe(defaultWordClassName);
      });
    });
  });
});

describe('getWordClassName', () => {
  describe('Game in progress', () => {
    const isPlaying = true;

    it('should return baseStyle and baseStyle--selected for the selected word', () => {
      const baseStyle = 'style';
      const expectedClassName = `${baseStyle} ${baseStyle}--selected`;

      const word: NormalizedQuestionWord = {
        value: 'test',
        id: 'id',
        selected: true,
        correct: false,
        className: '',
      };

      const className = getWordClassName(baseStyle, word, isPlaying);

      expect(className).toBe(expectedClassName);
    });

    it('should return baseStyle for not selected word', () => {
      const baseStyle = 'style';
      const expectedClassName = `${baseStyle}`;

      const word: NormalizedQuestionWord = {
        value: 'test',
        id: 'id',
        selected: false,
        correct: false,
        className: '',
      };

      const className = getWordClassName(baseStyle, word, isPlaying);

      expect(className).toBe(expectedClassName);
    });
  });

  describe('Game finished', () => {
    const isPlaying = false;

    it('should return baseStyle for not selected word', () => {
      const baseStyle = 'style';
      const expectedClassName = `${baseStyle}`;

      const word: NormalizedQuestionWord = {
        value: 'test',
        id: 'id',
        selected: false,
        correct: false,
        className: '',
      };

      const className = getWordClassName(baseStyle, word, isPlaying);

      expect(className).toBe(expectedClassName);
    });

    it('should return baseStyle + baseStyle--incorrect for the incorrect word', () => {
      const baseStyle = 'style';
      const expectedClassName = `${baseStyle} ${baseStyle}--incorrect`;

      const word: NormalizedQuestionWord = {
        value: 'test',
        id: 'id',
        selected: true,
        correct: false,
        className: '',
      };

      const className = getWordClassName(baseStyle, word, isPlaying);

      expect(className).toBe(expectedClassName);
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

describe('calculateScore', () => {
  it('should return correct score', () => {
    const testWords: NormalizedQuestionWordArray = [
      {
        correct: true,
        selected: true,
        id: 'test',
        className: 'test',
        value: 'word',
      },
      {
        correct: true,
        selected: true,
        id: 'test',
        className: 'test',
        value: 'word',
      },
      {
        correct: false,
        selected: true,
        id: 'test',
        className: 'test',
        value: 'word',
      },
    ];

    expect(calculateScore(testWords)).toBe(3);

    testWords[0].selected = false;

    expect(calculateScore(testWords)).toBe(0);

    testWords[1].selected = false;

    expect(calculateScore(testWords)).toBe(-3);
  });
});
