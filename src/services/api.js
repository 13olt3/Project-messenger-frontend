import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// The Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Check if the error is actually coming from the server
    const status = error.response ? error.response.status : null;

    console.log("Interceptor status check:", status);

    if (status === 401) {
      console.log("Logged out due to 401");
      localStorage.clear();
      window.location.href = "/error";
    }

    // 2. Handle the "Network Error" (Server is down or CORS failed)
    else if (!error.response) {
      console.error("Network error - cannot reach the server.");
    }

    return Promise.reject(error);
  },
);

export default api;
