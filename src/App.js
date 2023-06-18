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

import("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

function App() {
  var theme = createTheme({
    palette: {
      primary: {
        main: "#305edb",
      },
      secondary: {
        main: "#00b8d4",
      },
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <NavBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/vault"
            element={
              <Vault setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
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
