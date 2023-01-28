import React, { useReducer, createContext, useContext } from 'react';
import { User } from '../interfaces/auth';

interface State {
  isSignedIn: boolean;
  currentUser: User;
  avatarUrl: string;
  mission: string;
  confirmed: boolean;
}

interface Payload {
  user: User;
  avatarUrl: string;
  mission: string;
  confirmed: boolean;
}

interface UserAuthAction {
  type: 'test' | 'signin' | 'signout' | 'setUser';
  payload?: Payload;
}

const INIT_AUTH: State = {
  isSignedIn: false,
  currentUser: { id: NaN, uid: '', email: '', provider: '', name: '' },
  avatarUrl: '',
  mission: '',
  confirmed: false,
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
      if (payload !== undefined) {
        return {
          ...state,
          currentUser: payload.user,
          avatarUrl: payload.avatarUrl,
          mission: payload.mission,
          confirmed: payload.confirmed,
        };
      }
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
