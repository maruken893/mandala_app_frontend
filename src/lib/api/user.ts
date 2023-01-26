import Cookies from 'js-cookie';

import userClient from './client';

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
