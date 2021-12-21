import React, { useState } from "react";
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import { useStyles } from "./MyAccount.styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";
import { PasswordOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useFormik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
import { updateUser } from "../../redux/userRedux";
YupPassword(yup);

const validationSchema = yup.object({
  name: yup.string("Enter your full name").required("Full Name is rqeuired"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  street: yup
    .string("Enter your street address")
    .required("Street Address is required"),
  area: yup.string("Enter your area").required("Area is required"),
  city: yup.string("Enter your city").required("City is required"),
  state: yup.string("Enter your state").required("State is required"),
  country: yup.string("Enter your country").required("Country is required"),
  phone: yup
    .number("Enter you Contact Number")
    .typeError("Must be numbers only")
    .integer("Cannot include decimal")
    .min(11, "Contact Number shoulde be of 11 digits")
    .required("Contact Number is required"),
  gender: yup.string("Select Your Gender").required("Gender is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  username: yup.string("Select Your username").required("Username is required"),
});

export default function MyAccount() {
  const info = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: info.name,
      email: info.email,
      gender: info.gender,
      dateOfBirth: info.dateOfBirth,
      street: info.street,
      area: info.area,
      city: info.city,
      state: info.state,
      country: info.country,
      phone: info.phone,
      username: info.username,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await userRequest.put(`/customers/${info._id}`, values);
        console.log(res.data);
        dispatch(updateUser(values));
        dispatch(
          openSnackBar({
            message: `Data Successfully Updated, ${res.data.name}`,
            severity: "success",
          })
        );
        setUpdated(false);
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
  const [updated, setUpdated] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="column"
        alignContent="center"
        justifyContent="space-evenly"
      >
        <Grid item xs>
          <Typography variant="h2" align="center">
            My Account
          </Typography>
        </Grid>
        <Grid item xs>
          <form onSubmit={formik.handleSubmit}>
            <Paper elevation={5} className={classes.paper}>
              <Grid
                container
                spacing={2}
                justifyContent="space-evenly"
                alignContent="center"
              >
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    onClick={() => {
                      setUpdated(true);
                    }}
                    variant="outlined"
                    className={classes.button}
                  >
                    <EditOutlined />
                    Edit
                  </Button>
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="name"
                    variant="outlined"
                    label="Full Name"
                    disabled={true}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="email"
                    type="email"
                    required
                    variant="outlined"
                    label="Email"
                    disabled={!updated}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    native
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    required
                    id="gender"
                    variant="outlined"
                    labelId="gender"
                    disabled={true}
                  >
                    <option value="default" disabled>
                      Select
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                  {formik.touched.gender && Boolean(formik.errors.gender) ? (
                    <FormHelperText>
                      {formik.touched.gender && formik.errors.gender}
                    </FormHelperText>
                  ) : null}
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="dob"
                      label="Date of Birth"
                      format="MM/dd/yyyy"
                      variant="outlined"
                      value={formik.values.dateOfBirth}
                      disabled={true}
                      disableFuture
                      error={
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth)
                      }
                      helperText={
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="username"
                    required
                    variant="outlined"
                    label="Username"
                    disabled={true}
                    value={formik.values.username}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="street"
                    required
                    variant="outlined"
                    label="Street"
                    disabled={!updated}
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.street && Boolean(formik.errors.street)
                    }
                    helperText={formik.touched.street && formik.errors.street}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="area"
                    required
                    variant="outlined"
                    label="Area"
                    disabled={!updated}
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    error={formik.touched.area && Boolean(formik.errors.area)}
                    helperText={formik.touched.area && formik.errors.area}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="city"
                    required
                    variant="outlined"
                    label="City"
                    disabled={!updated}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="state"
                    required
                    variant="outlined"
                    label="State"
                    disabled={!updated}
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="country"
                    required
                    variant="outlined"
                    label="Country"
                    disabled={true}
                    value={formik.values.country}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="phone"
                    required
                    variant="outlined"
                    label="Contact Number"
                    type="number"
                    disabled={!updated}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <InputLabel htmlFor="update-password">
                    Update Password
                  </InputLabel>
                  <Link to="/password" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      className={classes.passwordButton}
                      id="update-password"
                    >
                      <PasswordOutlined className={classes.passwordSymbol} />
                      Update Password
                    </Button>
                  </Link>
                </Grid>
                {updated ? (
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Button
                      variant="outlined"
                      className={classes.cancelButton}
                      onClick={() => {
                        setUpdated(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      className={classes.updateButton}
                      type="submit"
                    >
                      Apply Changes
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
