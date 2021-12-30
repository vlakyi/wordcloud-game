import { v4 as uuid } from 'uuid';
import { QuestionArray, NormalizedQuestionWord } from './types';

export function generateRandomNumber(min: number, max: number) {
  let result = {
    randomNumber: Infinity,
    error: '',
  };

  if (min <= max) {
    result.randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    result.error = `max should be greater or equal than min`;
  }

  return result;
}

export function capitalizeFirstCharacter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function normalizeWords(
  allWords: Array<string>,
  goodWords: Array<string>,
  className: string
) {
  // Theoretically we can use word itself as an identifier, because in our case we have only unique words, however there would be an issue
  // if the data wouldn't be unique, so I decided to add uuid library.
  return allWords.map((word) => ({
    id: uuid(),
    value: word,
    selected: false,
    correct: goodWords.includes(word),
    className: className,
  }));
}

export function normalizeQuestions(
  questions: QuestionArray,
  defaultWordClassName: string
) {
  const normalized = questions?.map(function addMetadata(questionObj) {
    const { question, all_words, good_words } = questionObj;

    return {
      question: capitalizeFirstCharacter(question),
      allWords: normalizeWords(all_words, good_words, defaultWordClassName),
    };
  });

  return normalized;
}

export async function fetchData(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to load data: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export function getWordClassName(
  baseStyle: string,
  word: NormalizedQuestionWord,
  isPlaying: boolean
) {
  const { selected, correct } = word;

  const selectedStyle = baseStyle + '--selected';
  const correctStyle = baseStyle + '--correct';
  const incorrectStyle = baseStyle + '--incorrect';

  // we should add additional classes only for selected items
  if (selected) {
    if (isPlaying) {
      return `${baseStyle} ${selectedStyle}`;
    } else {
      return `${baseStyle} ${correct ? correctStyle : incorrectStyle}`;
    }
  }

  return baseStyle;
}
