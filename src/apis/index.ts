import HttpClient from './httpClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = new HttpClient({
  baseURL: API_URL,
});
