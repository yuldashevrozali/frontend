import axios from 'axios';

declare global {
  interface Window { Telegram: any; }
}

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

API.interceptors.request.use((config) => {
  // Web App initData ni header ga qo'shamiz
  if (window.Telegram?.WebApp?.initData) {
    config.headers['x-tg-auth'] = window.Telegram.WebApp.initData;
  }
  return config;
});

export default API;