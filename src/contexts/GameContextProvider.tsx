import { useState } from 'react';
import { NickNameContext } from './NickNameContext';
import { ScoreContext } from './ScoreContext';

interface Props {
  children: JSX.Element;
}

// Could be a single Game Context.

// In our case we haven't very deep component's tree, so we probaly don't need to use context.
// However I prefered to add it, because our RouteElement could change in the future
// and we wouldn't need to use props drilling

const GameContextProvider = ({ children }: Props): JSX.Element => {
  const [globalNickName, setGlobalNickName] = useState('');
  const [globalScore, setGlobalScore] = useState(NaN);

  return (
    <NickNameContext.Provider value={{ globalNickName, setGlobalNickName }}>
      <ScoreContext.Provider value={{ globalScore, setGlobalScore }}>
        {children}
      </ScoreContext.Provider>
    </NickNameContext.Provider>
  );
};

export default GameContextProvider;
