import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./PasswordChange.styles";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import { openSnackBar } from "../../redux/snackBarRedux";
import { userRequest } from "../../requestMethods";
YupPassword(yup);

const validationSchema = yup.object({
  oldPassword: yup
    .string("Enter old password")
    .required("Old Password is required"),
  newPassword: yup
    .string("Enter your new password")
    .min(8, "Password should be of minimum 8 characters")
    .minUppercase(1, "Password should contain at least one upper case letter")
    .minSymbols(1, "Password should contain at least one special character")
    .required("New password is required"),
  reNewPassword: yup
    .string("Re Enter New Password")
    .required("Re-Enter Password is required")
    .oneOf([yup.ref("newPassword"), null], "Password does not match"),
});

export default function PasswordChange() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await userRequest.put(
          `/customers/changePassword/${user._id}`,
          values
        );
        dispatch(
          openSnackBar({
            message: `Password Updated Successfully, ${res.data.name}!`,
            severity: "success",
          })
        );
      } catch (err) {
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
      }
    },
  });

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Change Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Paper elevation={5} className={classes.paper}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-evenly"
                  alignContent="center"
                  direction="column"
                >
                  <Grid item xs={12}>
                    <TextField
                      label="Old Password"
                      id="oldPassword"
                      type="password"
                      variant="outlined"
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.oldPassword &&
                        Boolean(formik.errors.oldPassword)
                      }
                      helperText={
                        formik.touched.oldPassword && formik.errors.oldPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="New Password"
                      id="newPassword"
                      type="password"
                      variant="outlined"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.newPassword &&
                        Boolean(formik.errors.newPassword)
                      }
                      helperText={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Re-Enter New Password"
                      id="reNewPassword"
                      type="password"
                      variant="outlined"
                      value={formik.values.reNewPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.reNewPassword &&
                        Boolean(formik.errors.reNewPassword)
                      }
                      helperText={
                        formik.touched.reNewPassword &&
                        formik.errors.reNewPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      type="submit"
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
