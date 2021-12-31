// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

export const testQuestions = [
  {
    question: 'select animals',
    all_words: [
      'hole',
      'sofa',
      'pear',
      'tiger',
      'oatmeal',
      'square',
      'nut',
      'cub',
      'shirt',
      'tub',
      'passenger',
      'cow',
    ],
    good_words: ['tiger', 'cow'],
  },
  {
    question: 'select colors',
    all_words: [
      'jeans',
      'existence',
      'ink',
      'red',
      'blue',
      'yellow',
      'laugh',
      'behavior',
      'expansion',
      'white',
      'black',
      'cakes',
    ],
    good_words: ['red', 'blue', 'yellow', 'white', 'black'],
  },
];
