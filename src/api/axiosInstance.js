import axios from 'axios';

const api = axios.create({
    baseURL: 'https://datta-infra.wpdevstudio.site/api',
    headers: {
        'Content-Type': 'application/json',
        'x-secret-key': 'MySuperSecret123',
    },
});

export default api;
