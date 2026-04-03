import axios from 'axios';
// Backend URL — local development uchun localhost, production uchun .env dan olinadi
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API = axios.create({ baseURL: API_URL });
API.interceptors.request.use((config) => {
    // Web App initData ni header ga qo'shamiz
    const initData = window.Telegram?.WebApp?.initData;
    if (initData) {
        config.headers['x-tg-auth'] = initData;
    }
    else {
        console.warn('⚠️ Telegram initData topilmadi!');
    }
    return config;
});
export default API;
//# sourceMappingURL=client.js.map