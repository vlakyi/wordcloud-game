// utils
import { normalizeQuestions, getWordClassName } from '../utils/utils';

// types
import {
  NormalizedQuestion,
  NormalizedQuestionWord,
  Question,
} from '../utils/types';

// constants
import { DEFAULT_WORD_CLASS_NAME } from '../utils/constsants';

// In future can be moved to the types.ts, however for now we are using it only in this component
interface NormalizedData {
  normalizedQuestion: string;
  normalizedWords: NormalizedQuestionWord[];
}

interface ReducerState extends NormalizedData {
  questions: NormalizedQuestion[];
}

type NormalizedQuestionDispatchAction =
  | {
      type: 'setQuestions';
      data: Question[];
    }
  | { type: 'setNormalizedQuestionAndWords'; data: NormalizedData }
  | {
      type: 'updateClassNameForSelectedWords';
      isPlaying: boolean;
    }
  | {
      type: 'toggleWordSelection';
      wordId: string;
      isPlaying: boolean;
    };

function updateClassNameForSelectedWords(
  allWords: NormalizedQuestionWord[],
  isPlaying: boolean
) {
  const normalizedWords = allWords.map((word) => {
    if (word.selected) {
      return {
        ...word,
        className: getWordClassName(DEFAULT_WORD_CLASS_NAME, word, isPlaying),
      };
    }

    return word;
  });

  return normalizedWords;
}

function toggleWordSelection(
  allWords: NormalizedQuestionWord[],
  action: { wordId: string; isPlaying: boolean }
) {
  const { wordId, isPlaying } = action;
  const normalizedWords = allWords.map((word) => {
    if (word.id === wordId) {
      const newWord = { ...word, selected: !word.selected };
      const newClassName = getWordClassName(
        DEFAULT_WORD_CLASS_NAME,
        newWord,
        isPlaying
      );

      return {
        ...newWord,
        className: newClassName,
      };
    }

    return word;
  });

  return normalizedWords;
}

export const initialState: ReducerState = {
  questions: [],
  normalizedQuestion: '',
  normalizedWords: [],
};

export function normalizedQuestionReducer(
  state: ReducerState,
  action: NormalizedQuestionDispatchAction
) {
  switch (action.type) {
    case 'setQuestions':
      return {
        ...state,
        questions: normalizeQuestions(action.data, DEFAULT_WORD_CLASS_NAME),
      };

    case 'setNormalizedQuestionAndWords':
      return {
        ...state,
        ...action.data,
      };

    case 'updateClassNameForSelectedWords':
      return {
        ...state,
        normalizedWords: updateClassNameForSelectedWords(
          state.normalizedWords,
          action.isPlaying
        ),
      };

    case 'toggleWordSelection':
      return {
        ...state,
        normalizedWords: toggleWordSelection(state.normalizedWords, action),
      };
    default:
      throw new Error();
  }
}
