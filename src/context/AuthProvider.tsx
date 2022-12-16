import React, { useReducer, createContext, useContext } from 'react';
import { User } from '../interfaces/auth';

interface State {
  isSignedIn: boolean;
  currentUser: User | null;
  mission: string;
}

// FIXME: payloaがany型
interface UserAuthAction {
  type: 'test' | 'signin' | 'signout' | 'setUser';
  payload?: any;
}

const INIT_AUTH: State = {
  isSignedIn: false,
  currentUser: null,
  mission: '',
};

const reducer = (
  state: State,
  { type, payload }: UserAuthAction
): State | never => {
  switch (type) {
    case 'test':
      return { ...state };
    case 'signin':
      return { ...state, isSignedIn: true };
    case 'signout':
      return { ...state, isSignedIn: false };
    case 'setUser':
      return { ...state, currentUser: payload.user, mission: payload.mission };
    default:
      throw new Error('不明なアクションです');
  }
};

const AuthContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<UserAuthAction>;
  }
);

// FIXME: React.FCとchildrenのany型を直したい
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, INIT_AUTH);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
