import axios from "axios";
import API_ENDPOINT from "./apiEndpoint";
import Swal from "sweetalert2";

// Function to set the JWT token in the Authorization header of Axios requests
const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// API endpoint URLs
const REFRESH_TOKEN_URL = `${API_ENDPOINT}api/individual/refreshToken/`;
const IS_AUTHENTICATED = `${API_ENDPOINT}api/individual/isAuthenticated/`;
const USER_URL = `${API_ENDPOINT}user/`; // not created

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    if (refreshToken) {
      const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken });
      const { accessToken } = response.data;
      console.log(accessToken);
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

// const isAuthenticated = () => {
//   const accessToken = localStorage.getItem("accessToken");

//   axios
//     .post(IS_AUTHENTICATED, { accessToken })
//     .then((response) => {
//       console.log(response);
//       if (response.status === 200) {
//         return true;
//       } else {
//         return false;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       return false;
//     });
// };

const isAuthenticated = async () => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(IS_AUTHENTICATED, { accessToken });
    console.log(response); // 200
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);  // 401
    return false;
  }
};



// Function to logout the user
const logout = (setIsLoggedIn) => {
  // Clear the tokens from local storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // Remove the access token from the Axios Authorization header
  setAuthHeader(null);
  setIsLoggedIn(false);

  // swal alert

  Swal.fire({
    icon: "success",
    font: "Poppins",
    title: "Logged Out Sucessfully!",
    timer: 1500,
    
  });
};

export {
  refreshAccessToken,
  getUserData,
  isAuthenticated,
  logout,
  setAuthHeader,
};
