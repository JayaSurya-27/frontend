import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./CSS/App.css";
import NavBar from "./navbar.js";
import Home from "./home.js";
import Vault from "./vault.js";
import About from "./about.js";
import Contact from "./contact.js";
import Login from "./login.js";
import SignUp from "./signUp";

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

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
