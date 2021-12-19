import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { PersonOutlined } from "@material-ui/icons";
import { LoginOutlined, PasswordOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./Login.styles";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userRedux";
import { publicRequest } from "../../requestMethods";
import { openSnackBar } from "../../redux/snackBarRedux";

export default function Login() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        const res = await publicRequest.post("/authCustomers/login", values);
        dispatch(loginSuccess(res.data));
        dispatch(openSnackBar(`Welcome, ${res.data.name}!`));
      } catch (err) {
        if (typeof typeof err.response.data === "string") {
          dispatch(openSnackBar(err.response.data));
        } else {
          dispatch(openSnackBar("Server Error. Try Again Later"));
        }
        dispatch(loginFailure());
      }
    },
  });
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            className={classes.typography}
          >
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={5} variant="outlined" className={classes.paper}>
            <div className={classes.paperInside}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item xs={12}>
                    <PersonOutlined className={classes.username} />
                    <TextField
                      label="Username"
                      id="username"
                      placeholder="Username"
                      variant="outlined"
                      required
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordOutlined className={classes.username} />
                    <TextField
                      label="Password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      variant="outlined"
                      required
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Button variant="outlined" fullWidth type="submit">
                      <LoginOutlined />
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center">
                      New User? <Link to="/register">Register Here!</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
