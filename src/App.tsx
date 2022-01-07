import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes/Routes';

import GameContextProvider from './contexts/GameContextProvider';

import './styles/main.scss';

function App() {
  let RouteElement = useRoutes(routes);

  return (
    <div className="view-layout view-layout--center">
      <GameContextProvider>
        <Suspense fallback={<div>Loading...</div>}>{RouteElement}</Suspense>
      </GameContextProvider>
    </div>
  );
}

export default App;
