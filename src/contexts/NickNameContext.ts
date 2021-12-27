import { createContext, Dispatch, SetStateAction } from 'react';

export interface NickNameContextData {
  globalNickName: string;
  setGlobalNickName: Dispatch<SetStateAction<string>>;
}

export const NickNameContext = createContext<NickNameContextData>({
  globalNickName: '',
  setGlobalNickName: (value) => {},
});
