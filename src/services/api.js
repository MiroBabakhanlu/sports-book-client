import axios from 'axios';

// In local dev this stays '/api' and relies on the CRA dev-server proxy
// (client/package.json "proxy") to reach localhost:8080. That proxy does
// nothing in a production build, so deployed builds need REACT_APP_API_URL
// set at build time (e.g. https://sports-book-production.up.railway.app/api).
const API_BASE = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({ baseURL: API_BASE });

// GET /api/admin/api-token is the one unauthenticated route - it hands out the
// shared Bearer token every other /api/* route requires. Fetched once and cached
// in memory; refetched (once) on a 401 in case the admin panel rotated it.
let tokenPromise = null;

const fetchToken = () =>
    axios.get(`${API_BASE}/admin/api-token`).then((res) => res.data.data.token);

const getToken = () => {
    if (!tokenPromise) tokenPromise = fetchToken();
    return tokenPromise;
};

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retried) {
            original._retried = true;
            tokenPromise = null;
            const token = await getToken();
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
        }
        return Promise.reject(error);
    }
);

export default api;
