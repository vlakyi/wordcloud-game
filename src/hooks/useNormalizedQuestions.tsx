import { useReducer, useEffect } from 'react';

// utils
import {
  generateRandomNumber,
  fetchData,
  normalizeQuestions,
  getWordClassName,
} from '../utils/utils';

// types
import {
  NormalizedQuestionArray,
  NormalizedQuestionWordArray,
  QuestionArray,
} from '../utils/types';

// constants
import { DEFAULT_WORD_CLASS_NAME } from '../utils/constsants';

interface Props {
  dataUrl: string;
}

// In future can be moved to the types.ts, however for now we are using it only in this component
interface NormalizedData {
  normalizedQuestion: string;
  normalizedWords: NormalizedQuestionWordArray;
}

interface ReducerState extends NormalizedData {
  questions: NormalizedQuestionArray;
}

type NormalizedQuestionDispatchAction =
  | {
      type: 'setQuestions';
      data: QuestionArray;
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

const initialState: ReducerState = {
  questions: [],
  normalizedQuestion: '',
  normalizedWords: [],
};

function updateClassNameForSelectedWords(
  allWords: NormalizedQuestionWordArray,
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
  allWords: NormalizedQuestionWordArray,
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

function normalizedQuestionReducer(
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

const useNormalizedQuestions = ({ dataUrl }: Props) => {
  const [state, dispatch] = useReducer(normalizedQuestionReducer, initialState);
  const { questions, normalizedQuestion, normalizedWords } = state;

  // fetch questions we can cache this data in the future with reactQuery for example.
  useEffect(() => {
    async function getQuestions() {
      const data = await fetchData(dataUrl);
      dispatch({ type: 'setQuestions', data });
    }

    getQuestions();
  }, [dataUrl]);

  // get random question
  useEffect(() => {
    const questionsNumber = questions.length;

    if (questionsNumber > 0) {
      const min = 0;
      const max = questionsNumber - 1;

      const { randomNumber, error } = generateRandomNumber(min, max);

      if (!error) {
        const { allWords, question } = questions[randomNumber];

        dispatch({
          type: 'setNormalizedQuestionAndWords',
          data: { normalizedQuestion: question, normalizedWords: allWords },
        });
      } else {
        console.error(error);
      }
    }
  }, [questions]);

  return { normalizedQuestion, normalizedWords, dispatch };
};

export { useNormalizedQuestions };
