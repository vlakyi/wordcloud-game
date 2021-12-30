import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

// Add lazy loading
const Game = lazy(() => import('./Game/Game'));
const Home = lazy(() => import('./Home/Home'));
const Score = lazy(() => import('./Score/Score'));

export let routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/game',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Game />
      </Suspense>
    ),
  },
  {
    path: '/score',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Score />
      </Suspense>
    ),
  },
];
