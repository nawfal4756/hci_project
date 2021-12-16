import { React, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStyles } from "./MenuBar.styles";

export function MenuBar() {
  const classes = useStyles();
  const linksList = [
    { name: "Home", link: "/" },
    { name: "Store", link: "/store" },
    { name: "Contact Us", link: "/contact-us" },
  ];
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box className={classes.flex}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Karachi Dairy Farm
            </Typography>
            {linksList.map(({ name, link }) => {
              return (
                <div key={name}>
                  <Link to={link} style={{ textDecoration: "none" }}>
                    <Button color="inherit" className={classes.button}>
                      {name}
                    </Button>
                  </Link>
                </div>
              );
            })}
            <Link to="/cart">
              <IconButton>
                <ShoppingCartOutlined />
              </IconButton>
            </Link>
            <Tooltip title="User">
              <IconButton
                onClick={handleOpenMenu}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography className={classes.text}>Login</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography className={classes.text}>Register</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
