import Cookies from 'js-cookie';

import mandalaClient from './client';

const getTokens = () => {
  const accessToken = Cookies.get('_access_token');
  const client = Cookies.get('_client');
  const uid = Cookies.get('_uid');
  return { accessToken, client, uid };
};

export const fetchMandala = async () => {
  const { accessToken, client, uid } = getTokens();

  if (accessToken && client && uid) {
    return mandalaClient.get('mandalas', {
      headers: { 'access-token': accessToken, client, uid },
    });
  }
};

// create mission
export const createMission = async (content: string) => {
  const { accessToken, client, uid } = getTokens();

  if (accessToken && client && uid) {
    return mandalaClient.post(
      'missions',
      { mission: { content } },
      {
        headers: { 'access-token': accessToken, client, uid },
      }
    );
  }
};
