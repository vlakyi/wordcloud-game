import { useState, useEffect, KeyboardEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNormalizedQuestions } from '../../hooks/useNormalizedQuestions';

// components
import Button from '../../components/Button/Button';

// utils
import { calculateScore } from '../../utils/utils';

// constants
import { QUESTIONS_URL } from '../../utils/constsants';

// context
import { ScoreContext } from '../../contexts/ScoreContext';

import './Game.scss';
import useBrowserName from '../../hooks/useBrowserName';

const Game = (): JSX.Element => {
  const navigate = useNavigate();
  const browserName = useBrowserName();

  const [isPlaying, setIsPlaying] = useState(true);

  // custom hook for better testability and readability
  const { normalizedQuestion, normalizedWords, dispatch } =
    useNormalizedQuestions({ dataUrl: QUESTIONS_URL });

  const { setGlobalScore } = useContext(ScoreContext);

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

  function onWordPressWithEnter(
    event: KeyboardEvent<HTMLLIElement>,
    wordId: string
  ) {
    if (event.key === 'Enter') {
      toggleWordSelection(wordId);
    }
  }

  function checkAnswears() {
    const selectedWord = normalizedWords.find((word) => word.selected);

    if (selectedWord) {
      setIsPlaying(false);
    }
  }

  function saveResultAndChangeRoute() {
    const score = calculateScore(normalizedWords);
    setGlobalScore(score);
    navigate('/score');
  }

  return (
    <section className="game-page">
      <h2 className="game-page__header">{normalizedQuestion}</h2>

      <ul
        tabIndex={browserName !== 'Apple Safari' ? 1 : NaN}
        className="game-page__words-list"
      >
        {normalizedWords?.map(function renderWords(word, index) {
          const { id, value, className } = word;
          return (
            <li
              tabIndex={browserName !== 'Apple Safari' ? index + 2 : NaN}
              className={className}
              key={id}
              onClick={() => toggleWordSelection(id)}
              onKeyPress={(e) => onWordPressWithEnter(e, id)}
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
