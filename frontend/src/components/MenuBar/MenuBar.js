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
  Badge,
  withStyles,
} from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./MenuBar.styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { openSnackBar } from "../../redux/snackBarRedux";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: "2px solid white",
    color: "white",
    padding: "0 4px",
  },
}))(Badge);

export function MenuBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const notLoggedInList = [
    { name: "Login", link: "/login" },
    { name: "Register", link: "/register" },
  ];
  const loggedInList = [
    { name: "My Account", link: "/myaccount" },
    { name: "Change Password", link: "/password" },
    { name: "My Orders", link: "/orders" },
    { name: "Logout", link: "/" },
  ];
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
  const handleCloseMenuAndLogout = () => {
    setAnchorEl(null);
    dispatch(openSnackBar(`Goodbye, ${user.currentUser.name}!`));
    dispatch(logout());
    navigate("/", { replace: true });
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
                <StyledBadge badgeContent={cartQuantity} showZero>
                  <ShoppingCartOutlined />
                </StyledBadge>
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
              {loggedIn
                ? loggedInList.map((item) => {
                    return item.name !== "Logout" ? (
                      <MenuItem onClick={handleCloseMenu} key={item.name}>
                        <Link to={item.link} style={{ textDecoration: "none" }}>
                          <Typography className={classes.text}>
                            {item.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={handleCloseMenuAndLogout}
                        key={item.name}
                      >
                        <Link to={item.link} style={{ textDecoration: "none" }}>
                          <Typography className={classes.text}>
                            {item.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    );
                  })
                : notLoggedInList.map((item) => {
                    return (
                      <MenuItem onClick={handleCloseMenu} key={item.name}>
                        <Link to={item.link} style={{ textDecoration: "none" }}>
                          <Typography className={classes.text}>
                            {item.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    );
                  })}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
