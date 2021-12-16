import {
  Grid,
  Typography,
  Paper,
  TextField,
  Select,
  InputLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

export default function Register() {
  const options = ["Karachi", "Faisalabad", "Badin", "Lahore", "Hyderabad"];
  const states = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan"];
  const [gender, setGender] = useState("default");
  const [dob, setDob] = useState(new Date());

  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
          <Paper elevation={5} variant="outlined">
            <div>
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
                    inputProps={{ id: "gender" }}
                  >
                    <option value="default" disabled>
                      Select
                    </option>
                    <option value="male" disabled>
                      Male
                    </option>
                    <option value="female" disabled>
                      Female
                    </option>
                    <option value="other" disabled>
                      Other
                    </option>
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
                      onChange={handleDOBChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
