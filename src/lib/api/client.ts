import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_DOMAIN;

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: baseUrl,
  }),
  options
);

export default client;
