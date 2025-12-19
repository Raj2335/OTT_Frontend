import axios from "axios";

const api = axios.create({
  baseURL: "https://ott-backend-rcu7.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if there was a token (meaning it was invalid/expired)
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      // Trigger a custom event to notify AuthContext
      window.dispatchEvent(new Event('auth-change'));
    }
    return Promise.reject(error);
  }
);

export default api;
