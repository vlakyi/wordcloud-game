import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNormalizedQuestions } from '../../hooks/useNormalizedQuestions';

// components
import Button from '../../components/Button/Button';

// constants
import { QUESTIONS_URL } from '../../utils/constsants';

import './Game.scss';

const Game = (): JSX.Element => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);

  // custom hook for better testability and readability
  const { normalizedQuestion, normalizedWords, dispatch } =
    useNormalizedQuestions({ dataUrl: QUESTIONS_URL });

  useEffect(() => {
    if (!isPlaying) {
      dispatch({ type: 'updateClassNameForSelectedWords', isPlaying });
    }
  }, [isPlaying, dispatch]);

  function toggleWordSelection(wordId: string) {
    if (isPlaying) {
      dispatch({ type: 'toggleWordSelection', wordId, isPlaying });
    }
  }

  function checkAnswears() {
    setIsPlaying(false);
  }

  function saveResultAndChangeRoute() {
    navigate('../');
  }

  return (
    <section className="game-page">
      <h2 className="game-page__header">{normalizedQuestion}</h2>

      <ul className="game-page__words-list">
        {normalizedWords?.map(function renderWords(word) {
          const { id, value, className } = word;
          return (
            <li
              className={className}
              key={id}
              onClick={() => toggleWordSelection(id)}
            >
              {value}
            </li>
          );
        })}
      </ul>

      {isPlaying ? (
        <Button onClick={checkAnswears}>check answears</Button>
      ) : (
        <Button onClick={saveResultAndChangeRoute}>finish game</Button>
      )}
    </section>
  );
};

export default Game;
