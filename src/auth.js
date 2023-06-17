import axios from "axios";

// Function to set the JWT token in the Authorization header of Axios requests
const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// API endpoint URLs
const API_URL = "http://your-backend-api-url.com";
const LOGIN_URL = `${API_URL}/login/`;
const REFRESH_TOKEN_URL = `${API_URL}/refresh-token/`;
const USER_URL = `${API_URL}/user/`;

// Function to perform user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    const { accessToken, refreshToken } = response.data;

    // Store the tokens in local storage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Set the access token in the Axios Authorization header
    setAuthHeader(accessToken);

    // Return the response data
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to refresh the access token
export const refreshAccessToken = async () => {
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
export const getUserData = async () => {
  try {
    const response = await axios.get(USER_URL);

    // Return the user data
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken; // Return true if the access token exists, false otherwise
};

// Function to logout the user
export const logout = () => {
  // Clear the tokens from local storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Remove the access token from the Axios Authorization header
  setAuthHeader(null);
};
