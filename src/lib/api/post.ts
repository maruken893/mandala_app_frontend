import Cookies from 'js-cookie';

import postClient from './client';
import { User } from '../../interfaces/util';

const getTokens = () => {
  const accessToken = Cookies.get('_access_token');
  const client = Cookies.get('_client');
  const uid = Cookies.get('_uid');
  return { accessToken, client, uid };
};

export const fetchPosts = async (user: User, page: number) => {
  return postClient.get(`users/${user.id}/posts?page=${page}`);
};

export const createPost = async (user: User, content: string) => {
  const { accessToken, client, uid } = getTokens();

  if (accessToken && client && uid) {
    return postClient.post(
      `users/${user.id}/posts`,
      {
        post: { content },
      },
      { headers: { 'access-token': accessToken, client, uid } }
    );
  }
};
