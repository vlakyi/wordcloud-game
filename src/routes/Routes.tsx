import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import RequireNickName from './RequireNickName';

// Add lazy loading
const Game = lazy(() => import('./Game/Game'));
const Home = lazy(() => import('./Home/Home'));
const Score = lazy(() => import('./Score/Score'));

export let routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: (
      <RequireNickName>
        <Game />
      </RequireNickName>
    ),
  },
  {
    path: '/score',
    element: (
      <RequireNickName>
        <Score />
      </RequireNickName>
    ),
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
];
