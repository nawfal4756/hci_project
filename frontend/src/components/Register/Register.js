import {
  Grid,
  Typography,
  Paper,
  TextField,
  Select,
  InputLabel,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";
import { useStyles } from "./Register.styles";

export default function Register() {
  const classes = useStyles();
  const options = ["Karachi", "Faisalabad", "Badin", "Lahore", "Hyderabad"];
  const states = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan"];
  const [gender, setGender] = useState("default");
  const [dob, setDob] = useState(new Date());
  const [customerType, setCustomerType] = useState("default");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCustomerType = (event) => {
    setCustomerType(event.target.value);
  };

  const handleDOBChange = (date) => {
    setDob(date);
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
              <form>
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
                      required
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="street"
                      label="Street"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="area"
                      label="Area"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      id="city"
                      options={options}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      id="state"
                      options={states}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="country"
                      label="Country"
                      defaultValue="Pakistan"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select
                      native
                      onChange={handleGenderChange}
                      value={gender}
                      required
                      variant="outlined"
                      labelId="gender"
                      // inputProps={{ id: "gender" }}
                    >
                      <option value="default" disabled>
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                  </Grid>
                  <Grid item xs>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="dob"
                        label="Date of Birth"
                        format="MM/dd/yyyy"
                        variant="outlined"
                        value={dob}
                        disableFuture
                        onChange={handleDOBChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs>
                    <InputLabel htmlFor="cusType">Customer Type</InputLabel>
                    <Select
                      native
                      onChange={handleCustomerType}
                      value={customerType}
                      required
                      variant="outlined"
                      inputProps={{ id: "cusType" }}
                    >
                      <option value="default" disabled>
                        Select
                      </option>
                      <option value="retail">Retail</option>
                      <option value="business">Business</option>
                    </Select>
                  </Grid>
                  <Grid item xs>
                    <Button variant="outlined" color="inherit">
                      Register
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
