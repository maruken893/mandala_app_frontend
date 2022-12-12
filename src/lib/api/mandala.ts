import Cookies from 'js-cookie';

import httpClient from './client';

export const fetchMandala = async () => {
  const accessToken = Cookies.get('_access_token');
  const client = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  if (accessToken && client && uid) {
    return httpClient.get('mandalas', {
      headers: { 'access-token': accessToken, client, uid },
    });
  }
};
