import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { PersonOutlined } from "@material-ui/icons";
import { LoginOutlined, PasswordOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./Login.styles";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {},
  });
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
                <form>
                  <Grid container spacing={2} alignContent="center">
                    <Grid item xs={12}>
                      <PersonOutlined className={classes.username} />
                      <TextField
                        label="Username"
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
      </form>
    </div>
  );
}
