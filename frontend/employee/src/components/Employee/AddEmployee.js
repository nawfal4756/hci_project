import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  Paper,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import * as yup from "yup";
import { useStyles } from "./AddEmployee.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import YupPassword from "yup-password";
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
  salary: yup
    .number()
    .positive("Salary cannot be negative")
    .required("Salary is required"),
  designation: yup
    .string("Enter designation")
    .required("Designation is required"),
});

export default function AddEmployee() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const states = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan"];
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
      salary: "",
      designation: "",
      isAdmin: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const [rePassword, ...others] = values;
        const res = await employeeRequest.post("/employees", others);
        dispatch(
          openSnackBar({
            message: `${res.data.cowId} successfully added!`,
            severity: "success",
          })
        );
        setLoading(false);
        navigate("/employees");
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
      }
    },
  });

  const handleDOBChange = (date) => {
    formik.setFieldValue("dateOfBirth", date);
  };
  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Add An Employee
          </Typography>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Paper elevation={5} className={classes.paper}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-evenly"
                  alignContent="center"
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
                    <TextField
                      id="city"
                      label="City"
                      variant="outlined"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
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
                    <TextField
                      id="salary"
                      label="Salary"
                      variant="outlined"
                      value={formik.values.salary}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.salary && Boolean(formik.errors.salary)
                      }
                      helperText={formik.touched.salary && formik.errors.salary}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="designation"
                      label="Designation"
                      variant="outlined"
                      value={formik.values.designation}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.designation &&
                        Boolean(formik.errors.designation)
                      }
                      helperText={
                        formik.touched.designation && formik.errors.designation
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Admin Access</FormLabel>
                      <RadioGroup value={formik.values.isAdmin}></RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      type="submit"
                      fullWidth
                      className={classes.button}
                    >
                      Add Employee
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
