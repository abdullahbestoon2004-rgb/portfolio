import axios from 'axios';
import mockAxios from './mockAxios';

const normalizeBaseUrl = (value) => {
    if (!value) {
        return '';
    }

    return value.endsWith('/') ? value.slice(0, -1) : value;
};

const useMockApi =
    import.meta.env.VITE_USE_MOCK_API === 'true' ||
    (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API !== 'false');

const apiClient = useMockApi
    ? mockAxios
    : axios.create({
        baseURL: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
    });

export default apiClient;
