import axios from 'axios';

axios.defaults.withCredentials = true; 

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('access_token'); // Get from cookies
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Send a request to refresh the token using refresh_token from cookies
        const { data } = await axios.post('http://localhost:4000/auth/refresh', {
          grant_type: 'refresh_token',
        });

        const newAccessToken = data.access_token;


        document.cookie = `access_token=${newAccessToken}; HttpOnly; SameSite=Strict; Secure`;


        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;


        return apiClient(originalRequest);
      } catch (refreshError) {

        console.error('Token refresh failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
