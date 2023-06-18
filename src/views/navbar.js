import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { logout } from "./../auth";
import { Avatar } from "@mui/material";

import "../CSS/navbar.css";

const pages = ["About", "Vault", "Contact"];
const settings = ["Profile", "Logout"];

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [anchorNav, setAnchorNav] = useState(null);
  const [anchorSettings, setAnchorSettings] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };

  const handleOpenSettingsMenu = (event) => {
    setAnchorSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorSettings(null);
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 30, my: 3 }}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              ml: 2,
              mr: 7,
              display: { xs: "none", md: "flex" },
              fontFamily: "Bebas Neue",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"}>MEDIVAULT</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={"/" + page}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Bebas Neue",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"}>MEDIVAULT</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mr: 1.5,
                  color: "white",
                  display: "block",
                }}
              >
                <Link to={"/" + page}>{page}</Link>
              </Button>
            ))}
          </Box>
          {!isLoggedIn ? (
            <>
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: 30,
                    "&:hover": {
                      backgroundColor: "white",
                      color: "primary.dark",
                    },
                  }}
                >
                  <Link to={"/login"}>Login</Link>
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: "block", md: "none" } }}>
                <Button
                  variant="outlined"
                  href="/login"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: 30,
                    fontSize: "0.6rem",
                  }}
                >
                  <Link to={"/login"}>Login</Link>
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <IconButton
                  size="large"
                  onClick={handleOpenSettingsMenu}
                  color="inherit"
                  sx={{ float: "right" }}
                >
                  <Avatar>H</Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorSettings}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorSettings)}
                  onClose={handleCloseSettingsMenu}
                >
                  <MenuItem onClick={handleCloseSettingsMenu}>
                    <Link to={"/profile"}>
                      <Typography textAlign="center">Profile</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      logout(setIsLoggedIn);
                      handleCloseSettingsMenu();
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
