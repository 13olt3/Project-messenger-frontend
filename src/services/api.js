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
// axios.interceptors.response.use(
//   (response) => response, // If the request succeeds, just return the response
//   (error) => {
//     // Check if the error is a 401 (Expired/Invalid Token)
//     console.log("1. Interceptor caught an error");
//     if (error.response && error.response.status === 401) {
//       console.error("Token expired or unauthorized. Logging out...");

//       // 1. Clear the storage
//       localStorage.removeItem("jwtToken");
//       localStorage.removeItem("username");

//       // 2. Redirect to login
//       // Note: Since we are outside a React component, we use window.location
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   },
// );
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
