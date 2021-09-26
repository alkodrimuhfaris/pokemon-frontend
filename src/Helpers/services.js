import axios from 'axios';

export default () =>
  axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
  });

export const backendService = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
