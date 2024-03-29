import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { PersonOutlined } from "@material-ui/icons";
import { LoginOutlined, PasswordOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useStyles } from "./Login.styles";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userRedux";
import { publicRequest } from "../../requestMethods";
import { openSnackBar } from "../../redux/snackBarRedux";

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        setLoading(true);
        const res = await publicRequest.post("/authEmployees/login", values);
        dispatch(loginSuccess(res.data));
        dispatch(
          openSnackBar({
            message: `Welcome, ${res.data.name}!`,
            severity: "success",
          })
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (typeof err.response.data === "string") {
          dispatch(
            openSnackBar({ message: err.response.data, severity: "error" })
          );
        } else {
          dispatch(
            openSnackBar({
              message: "Server Error. Try Again Later",
              severity: "error",
            })
          );
        }
        dispatch(loginFailure());
      }
    },
  });
  const classes = useStyles();

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
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
                    <Grid item xs={2}>
                      <PersonOutlined className={classes.username} />
                    </Grid>
                    <Grid item xs={10}>
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
                    <Grid item xs={2}>
                      <PasswordOutlined className={classes.username} />
                    </Grid>
                    <Grid item xs={10}>
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
                    <Grid item xs={12}>
                      <Button variant="outlined" fullWidth type="submit">
                        <LoginOutlined />
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
