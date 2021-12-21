import {
  Grid,
  Typography,
  Paper,
  TextField,
  Select,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./Register.styles";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { publicRequest } from "../../requestMethods";
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
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters")
    .minUppercase(1, "Password should contain at least one upper case letter")
    .minSymbols(1, "Password should contain at least one special character")
    .required("Password is required"),
  customerType: yup
    .string("Select Customer Type")
    .required("Customer Type is required"),
  rePassword: yup
    .string("Re Enter New Password")
    .required("Re-Enter Password is required")
    .oneOf([yup.ref("password"), null], "Password does not match"),
});

export default function Register() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = ["Karachi", "Faisalabad", "Badin", "Lahore", "Hyderabad"];
  const states = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan"];
  const [dob, setDob] = useState(new Date());

  const handleSubmit = async (values) => {
    const { rePassword, ...others } = values;
    try {
      const res = await publicRequest.post("/authCustomers/register", others);
      navigate("/login", { replace: true });
      dispatch(
        openSnackBar({
          message: `Registration Successful, ${res.data.name}`,
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
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      street: "",
      area: "",
      city: "",
      state: "",
      country: "Pakistan",
      phone: "",
      gender: "default",
      dateOfBirth: new Date(),
      username: "",
      password: "",
      rePassword: "",
      customerType: "default",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleDOBChange = (date) => {
    setDob(date);
    formik.setFieldValue("dateOfBirth", dob);
    formik.setFieldValue("dateOfBirth", date);
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignContent="center"
        direction="column"
      >
        <Grid item xs>
          <Typography variant="h2" align="center">
            Register
          </Typography>
        </Grid>
        <Grid item xs>
          <Paper elevation={5} variant="outlined" className={classes.paper}>
            <div className={classes.div}>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  direction="column"
                >
                  <Grid item xs>
                    <TextField
                      id="name"
                      label="Full Name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="street"
                      label="Street"
                      variant="outlined"
                      value={formik.values.street}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.street && Boolean(formik.errors.street)
                      }
                      helperText={formik.touched.street && formik.errors.street}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="area"
                      label="Area"
                      variant="outlined"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                      error={formik.touched.area && Boolean(formik.errors.area)}
                      helperText={formik.touched.area && formik.errors.area}
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      id="city"
                      options={options}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          variant="outlined"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.city && Boolean(formik.errors.city)
                          }
                          helperText={formik.touched.city && formik.errors.city}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      id="state"
                      options={states}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State"
                          variant="outlined"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.state && Boolean(formik.errors.state)
                          }
                          helperText={
                            formik.touched.state && formik.errors.state
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="country"
                      label="Country"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.country && Boolean(formik.errors.country)
                      }
                      helperText={
                        formik.touched.country && formik.errors.country
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="phone"
                      label="Contact Number"
                      variant="outlined"
                      placeholder="03xxxxxxxxx"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid item xs>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select
                      native
                      variant="outlined"
                      labelId="gender"
                      id="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                    >
                      <option value="default" disabled>
                        Select
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                    {formik.touched.gender && Boolean(formik.errors.gender) ? (
                      <FormHelperText>
                        {formik.touched.gender && formik.errors.gender}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="dateOfBirth"
                        label="Date of Birth"
                        format="MM/dd/yyyy"
                        variant="outlined"
                        value={formik.values.dateOfBirth}
                        onChange={handleDOBChange}
                        error={
                          formik.touched.dateOfBirth &&
                          Boolean(formik.errors.dateOfBirth)
                        }
                        helperText={
                          formik.touched.dateOfBirth &&
                          formik.errors.dateOfBirth
                        }
                        disableFuture
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="rePassword"
                      label="Re-Enter Password"
                      type="password"
                      variant="outlined"
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.rePassword &&
                        Boolean(formik.errors.rePassword)
                      }
                      helperText={
                        formik.touched.rePassword && formik.errors.rePassword
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <InputLabel htmlFor="customerType">
                      Customer Type
                    </InputLabel>
                    <Select
                      native
                      required
                      variant="outlined"
                      inputProps={{ id: "customerType" }}
                      value={formik.values.customerType}
                      onChange={formik.handleChange}
                    >
                      <option value="default" disabled>
                        Select
                      </option>
                      <option value="retail">Retail</option>
                      <option value="business">Business</option>
                    </Select>
                    {formik.touched.customerType &&
                    Boolean(formik.errors.customerType) ? (
                      <FormHelperText>
                        {formik.touched.customerType &&
                          formik.errors.customerType}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item xs={5}>
                    <Button variant="outlined" color="inherit" type="submit">
                      Register
                    </Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={formik.handleReset}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Typography align="center">
                      Already have an account?{" "}
                      <Link to="/login">Log In Here!</Link>
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
