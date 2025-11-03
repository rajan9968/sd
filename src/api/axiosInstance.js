import axios from 'axios';

const api = axios.create({
    baseURL: 'https://datta-infra.wpdevstudio.site/api', // backend URL
    headers: { 'Content-Type': 'application/json' },
});

export default api;
