import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { NickNameContext } from './contexts/NickNameContext';
import { routes } from './Routes';
import { ScoreContext } from './contexts/ScoreContext';
import './styles/main.scss';

function App() {
  let RouteElement = useRoutes(routes);
  // In our case we haven't very deep component's tree, so we probaly don't need to use context.
  // However I prefered to add it, because our RouteElement could change in the future
  // and we wouldn't need to use props drilling
  const [globalNickName, setGlobalNickName] = useState('');
  const [globalScore, setGlobalScore] = useState(NaN);

  return (
    <div className="view-layout view-layout--center">
      <NickNameContext.Provider value={{ globalNickName, setGlobalNickName }}>
        <ScoreContext.Provider value={{ globalScore, setGlobalScore }}>
          {RouteElement}
        </ScoreContext.Provider>
      </NickNameContext.Provider>
    </div>
  );
}

export default App;
