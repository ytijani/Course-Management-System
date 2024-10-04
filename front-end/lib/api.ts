import axios from 'axios';

// Store access token in memory
let accessToken = '';

export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your API base URL
  withCredentials: true, // Include credentials (for cookies like refresh_token)
});

// Add request interceptor to include access token
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized error - when the token has expired
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          'http://localhost:4000/auth/refresh',
          {},
          {
            withCredentials: true, // Send the refresh token (stored in httpOnly cookie)
          }
        );

        // Save new access token in memory
        setAccessToken(data.access_token);

        // Update the authorization header for the original request
        originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
