import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

// Add lazy loading
const Game = lazy(() => import('./routes/Game/Game'));
const Home = lazy(() => import('./routes/Home/Home'));

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
];
