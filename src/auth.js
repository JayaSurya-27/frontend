import axios from "axios";
import API_ENDPOINT from "./apiEndpoint";

// Function to set the JWT token in the Authorization header of Axios requests
const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// API endpoint URLs
const REFRESH_TOKEN_URL = `${API_ENDPOINT}/refresh-token/`;
const USER_URL = `${API_ENDPOINT}/user/`;

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken });
      const { accessToken } = response.data;

      // Update the access token in local storage
      localStorage.setItem("accessToken", accessToken);

      // Set the new access token in the Axios Authorization header
      setAuthHeader(accessToken);

      // Return the response data
      return response.data;
    } else {
      // No refresh token found, user needs to login again
      throw { message: "Refresh token not found. Please login again." };
    }
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get user data
const getUserData = async () => {
  try {
    const response = await axios.get(USER_URL);

    // Return the user data
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken; // Return true if the access token exists, false otherwise
};

// Function to logout the user
const logout = () => {
  // Clear the tokens from local storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Remove the access token from the Axios Authorization header
  setAuthHeader(null);
};

export {
  refreshAccessToken,
  getUserData,
  isAuthenticated,
  logout,
  setAuthHeader,
};
