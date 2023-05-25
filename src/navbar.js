import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const smallScreens = useMediaQuery("(max-width:600px)");

  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleMenuClose = () => {
    setMenu(false);
  };

  const CustomLink = ({ to, text }) => {
    const path = window.location.pathname;
    return (
      <li className={path === to ? "menu_item_active menu_item" : "menu_item"}>
        <Link to={to} onClick={smallScreens ? handleMenuClose : ""}>
          {text}
        </Link>
      </li>
    );
  };

  useEffect(() => {
    if (smallScreens) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }, [smallScreens]);

  return (
    <nav className="navbar">
      <Link to="/" className="site_title">
        <h1>MEDI VAULT</h1>
      </Link>
      <div className="menu-icon" onClick={handleMenu}>
        <MenuIcon className={!menu ? "open" : "close"} />
        <CloseIcon className={menu ? "open" : "close"} />
      </div>
      <ul className={menu ? "nav_menu" : "close"}>
        <CustomLink to="/about" text="About" />
        <CustomLink to="/contactus" text="Contact Us" />
        <CustomLink to="/vault" text="Vault" />
        <CustomLink to="/login" text="Login" />
      </ul>
    </nav>
  );
};

export default Nav;
