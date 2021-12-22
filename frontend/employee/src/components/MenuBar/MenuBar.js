import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ClickAwayListener,
} from "@material-ui/core";
import { ChevronLeft, ExpandMore } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./MenuBar.styles";
import { useDispatch, useSelector } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { logout } from "../../redux/userRedux";

export default function MenuBar() {
  const menuList = [
    { name: "My Account", link: "/myaccount" },
    { name: "Change Password", link: "/changepassword" },
    { name: "Logout", link: "/" },
  ];
  const cowOptions = [
    { name: "Display All Cows", link: "/cows" },
    { name: "Add Cow", link: "/cows/add" },
    // { name: "Modify Cow Details", link: "/cows/search" },
    { name: "Add Milk Produced", link: "/cows/milk/add" },
    { name: "Milk Produced Log", link: "/cows/milk" },
  ];
  const feedOptions = [
    { name: "Display All Feeds", link: "/feeds" },
    { name: "Add Feed Type", link: "/feeds/add" },
    // { name: "Modify Feed Type Details", link: "/feeds" },
    { name: "Feed Bought", link: "/feeds/add" },
    { name: "Feed Given to Cow", link: "/feeds/given" },
  ];
  const customerOptions = [
    { name: "Display All Customers", link: "/customers" },
    // { name: "View Customer Details", link: "/customers/search" },
  ];
  const employeeOptions = [
    { name: "Display All Employees", link: "/employees" },
    { name: "Add new Employee", link: "/employees/add" },
    // { name: "Modify Employee Details", link: "/employees/modify" },
  ];
  const expenseOptions = [
    { name: "Display All Expenses", link: "/expenses" },
    { name: "Add new Expense", link: "/expenses/add" },
    // { name: "Modify Expense Details", link: "/expenses/modify" },
  ];
  const orderOptions = [
    { name: "Display All Orders", link: "/orders" },
    { name: "Search Order", link: "/orders/search" },
  ];
  const productOptions = [
    { name: "Display All Products", link: "/products" },
    { name: "Add new product", link: "/products/add" },
    // { name: "Modify Product Details", link: "/products/search" },
  ];

  const [drawerState, setDrawerState] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCloseMenuAndLogout = () => {
    setAnchorEl(null);
    dispatch(
      openSnackBar({
        message: `Goodbye, ${user.name}!`,
        severity: "success",
      })
    );
    dispatch(logout());
    navigate("/", { replace: true });
  };
  return (
    <ClickAwayListener
      onClickAway={() => {
        setDrawerState(false);
      }}
    >
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    setDrawerState(true);
                  }}
                  className={classes.menuAdjustment}
                >
                  <MenuIcon className={classes.menuButton} />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5" className={classes.heading}>
                  Employee Panel Karachi Dairy Farm
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                container
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Tooltip title="Account Settings">
                  <IconButton
                    onClick={handleOpenMenu}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    className={classes.avatar}
                  >
                    <Avatar />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {menuList.map((item) => {
                return item.name !== "Logout" ? (
                  <MenuItem onClick={handleCloseMenu} key={item.name}>
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      <Typography className={classes.text}>
                        {item.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseMenuAndLogout} key={item.name}>
                    <Typography className={classes.text}>
                      {item.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerState}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={() => {
                setDrawerState(false);
              }}
            >
              <ChevronLeft className={classes.icon} />
            </IconButton>
          </div>
          <Divider />
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <List>
              <ListItem
                button
                onClick={() => {
                  setDrawerState(false);
                }}
                className={classes.dashboardItem}
              >
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </Link>
          <Divider />
          {user.isAdmin || user.cowAccess ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className={classes.accordianTitle}
              >
                <Typography variant="h5">Cow</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {cowOptions.map((option) => {
                    return (
                      <Link
                        to={option.link}
                        key={option.name}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            setDrawerState(false);
                          }}
                          className={classes.listItem}
                        >
                          <ListItemText
                            primary={option.name}
                            className={classes.text}
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {user.isAdmin || user.cowAccess || user.expenseAccess ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className={classes.accordianTitle}
              >
                <Typography variant="h5">Feed</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {feedOptions.map((option) => {
                    return (
                      <Link
                        to={option.link}
                        key={option.name}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            setDrawerState(false);
                          }}
                          className={classes.listItem}
                        >
                          <ListItemText
                            primary={option.name}
                            className={classes.text}
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {user.isAdmin || user.customerAccess ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className={classes.accordianTitle}
              >
                <Typography variant="h5">Customer</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {customerOptions.map((option) => {
                    return (
                      <Link
                        to={option.link}
                        key={option.name}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            setDrawerState(false);
                          }}
                          className={classes.listItem}
                        >
                          <ListItemText
                            primary={option.name}
                            className={classes.text}
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {user.isAdmin || user.employeeAccess ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className={classes.accordianTitle}
              >
                <Typography variant="h5">Employee</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {employeeOptions.map((option) => {
                    return (
                      <Link
                        to={option.link}
                        key={option.name}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            setDrawerState(false);
                          }}
                          className={classes.listItem}
                        >
                          <ListItemText
                            primary={option.name}
                            className={classes.text}
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {user.isAdmin || user.expenseAccess ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className={classes.accordianTitle}
              >
                <Typography variant="h5">Expense</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {expenseOptions.map((option) => {
                    return (
                      <Link
                        to={option.link}
                        key={option.name}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            setDrawerState(false);
                          }}
                          className={classes.listItem}
                        >
                          <ListItemText
                            primary={option.name}
                            className={classes.text}
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {user.isAdmin || user.orderAccess ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className={classes.accordianTitle}
              >
                <Typography variant="h5">Order</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {orderOptions.map((option) => {
                    return (
                      <Link
                        to={option.link}
                        key={option.name}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            setDrawerState(false);
                          }}
                          className={classes.listItem}
                        >
                          <ListItemText
                            primary={option.name}
                            className={classes.text}
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {user.isAdmin || user.productAccess ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className={classes.accordianTitle}
              >
                <Typography variant="h5">Product</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {productOptions.map((option) => {
                    return (
                      <Link
                        to={option.link}
                        key={option.name}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            setDrawerState(false);
                          }}
                          className={classes.listItem}
                        >
                          <ListItemText
                            primary={option.name}
                            className={classes.text}
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : null}
        </Drawer>
      </div>
    </ClickAwayListener>
  );
}
