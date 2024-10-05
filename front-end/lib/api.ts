import axios from 'axios';

// Set default axios settings
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

// Helper function to get a cookie by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
});

// Request interceptor (attach access token to every request)
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

// Response interceptor (handle 401 errors and refresh token)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the response is 401 (Unauthorized) and it hasn't already been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Send a request to refresh the token using refresh_token from cookies
        const { data } = await axios.post('http://localhost:4000/auth/refresh', {
          grant_type: 'refresh_token',
        });

        const newAccessToken = data.access_token;

        // Update the access_token in cookies
        document.cookie = `access_token=${newAccessToken}; HttpOnly; SameSite=Strict; Secure`;

        // Update the Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure (e.g., redirect to login)
        console.error('Token refresh failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
