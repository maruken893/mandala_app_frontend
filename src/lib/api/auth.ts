import Cookies from 'js-cookie';
import authClient from './client';

import { SignUpParams, SignInParams } from '../../interfaces/auth';

export const signUp = (params: SignUpParams) => {
  return authClient.post('auth', params);
};

export const signIn = (params: SignInParams) => {
  return authClient.post('auth/sign_in', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const signOut = () => {
  return authClient.delete('auth/sign_out', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const getCurrentUser = () => {
  const accessToken = Cookies.get('_access_token');
  const client = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  if (accessToken && client && uid) {
    return authClient.get('auth/sessions', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'access-token': accessToken,
        client,
        uid,
      },
    });
  }
};
