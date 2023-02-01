import Cookies from 'js-cookie';

import userClient from './client';

interface PasswordForgetParams {
  email: string;
  redirectUrl: string;
}

interface ChangePasswordParams {
  password: string;
  passwordConfirmation: string;
  accessToken: string;
  uid: string;
  client: string;
}

const getTokens = () => {
  const accessToken = Cookies.get('_access_token');
  const client = Cookies.get('_client');
  const uid = Cookies.get('_uid');
  return { accessToken, client, uid };
};

export const updateAvatar = (avatar: File) => {
  console.log(avatar);
  const { accessToken, client, uid } = getTokens();

  if (accessToken && client && uid) {
    return userClient.patch(
      `auth`,
      {
        avatar,
      },
      {
        headers: {
          'access-token': accessToken,
          client,
          uid,
          'content-type': 'multipart/form-data',
        },
      }
    );
  }
};

export const forgetPassword = (params: PasswordForgetParams) => {
  console.log(params);
  return userClient.post('auth/password', params);
};

export const changePassword = (params: ChangePasswordParams) => {
  return userClient.put('auth/password', params, {
    headers: {
      'access-token': params.accessToken,
      client: params.client,
      uid: params.uid,
    },
  });
};
