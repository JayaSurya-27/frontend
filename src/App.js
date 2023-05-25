import "./CSS/App.css";
import { Routes, Route } from "react-router-dom";
// import Register from "./register.js";
import Login from "./login";
import Nav from "./navbar";
import Home from "./home.js";
import Contact from "./contact.js";
import About from "./about.js";
import Vault from "./vault.js";
import "./CSS/App.css"


function App() {
  return (
    <div className="app">
      <Nav />
      <div className="conatainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
