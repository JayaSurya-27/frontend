import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import "./CSS/App.css";
import NavBar from "./views/navbar.js";
import Home from "./views/home.js";
import Vault from "./views/vault.js";
import About from "./views/about.js";
import Contact from "./views/contact.js";
import Login from "./views/login.js";
import SignUp from "./views/signUp";
import VaultOrg from "./views/vaultOrg";
import { refreshAccessToken } from "./auth";

import("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

function App() {
  var theme = createTheme({
    palette: {
      primary: {
        main: "#305edb",
      },
      secondary: {
        main: "#030317",
      },
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  var userType = localStorage.getItem("userType");

  const refreshToken = async () => {
    try {
      const response = await refreshAccessToken();
      if (response.status === 200) {
        setIsLoggedIn(true);
        setTimeout(refreshToken, 1000 * 60 * 14);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // Handle the error or display an error message to the user
    }
  };

  refreshToken();

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <NavBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/vault"
            element={
              userType === "individual" ? (
                <Vault
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  userType={userType}
                />
              ) : (
                <VaultOrg
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  userType={userType}
                />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
