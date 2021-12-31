import { createContext, Dispatch, SetStateAction } from 'react';

export interface ScoreContextData {
  globalScore: number;
  setGlobalScore: Dispatch<SetStateAction<number>>;
}

export const ScoreContext = createContext<ScoreContextData>({
  globalScore: NaN,
  setGlobalScore: (value) => {},
});
