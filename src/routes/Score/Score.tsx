import { useContext } from 'react';
import { NickNameContext } from '../../contexts/NickNameContext';
import { ScoreContext } from '../../contexts/ScoreContext';

import './Score.scss';

const Score = (): JSX.Element => {
  const { globalNickName } = useContext(NickNameContext);
  const { globalScore } = useContext(ScoreContext);
  return (
    <section className="score-page">
      <h1 className="score-page__header">
        Congratulations, {globalNickName}!
        <br />
        Your score:
      </h1>

      <h2 className="score-page__points">{globalScore} points</h2>
    </section>
  );
};

export default Score;
