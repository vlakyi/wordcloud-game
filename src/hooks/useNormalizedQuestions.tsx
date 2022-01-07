import { useReducer, useEffect } from 'react';

// utils
import { generateRandomNumber, fetchData } from '../utils/utils';

// reducer
import {
  initialState,
  normalizedQuestionReducer,
} from './normalizedQuestionsReducer';

interface Props {
  dataUrl: string;
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
