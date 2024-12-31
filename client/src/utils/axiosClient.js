import axios from "axios";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: "http://localhost:3000/v1/", // Replace with your API's base URL
  withCredentials: true, // Include cookies for authentication
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response interceptor to handle errors globally
axiosClient.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    // Handle common errors globally
    if (error.response?.status === 401) {
      // Unauthorized: Redirect to login
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      // Forbidden: Show an alert
      alert("You do not have permission to perform this action.");
    } else {
      console.error("API Error:", error.response || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
