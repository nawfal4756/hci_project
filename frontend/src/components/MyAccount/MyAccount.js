import React, { useState } from "react";
import {
  Box,
  Button,
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

export default function MyAccount() {
  const [updated, setUpdated] = useState(false);
  const classes = useStyles();
  const info = {
    name: "Muhammad Nawfal Mehboob",
    email: "nawfalmehboob@gmail.com",
    street: "SU-72, Sector G",
    area: "Askari V, Malir Cantt",
    city: "Karachi",
    state: "Sindh",
    country: "Pakistan",
    dob: "10/14/2000",
    gender: "male",
    username: "nawfal4756",
  };
  const [dob, setDob] = useState(info.dob);
  const [gender, setGender] = useState(info.gender);
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
          <Box>
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
                    defaultValue={info.name}
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
                    defaultValue={info.email}
                  />
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    native
                    onChange={handleGenderChange}
                    value={gender}
                    required
                    variant="outlined"
                    labelId="gender"
                    disabled={!updated}
                  >
                    <option value="default" disabled>
                      Select
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="dob"
                      label="Date of Birth"
                      format="MM/dd/yyyy"
                      variant="outlined"
                      value={dob}
                      disabled={!updated}
                      disableFuture
                      onChange={handleDOBChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={10} md={10} lg={5}>
                  <TextField
                    id="username"
                    required
                    variant="outlined"
                    label="Username"
                    disabled={!updated}
                    defaultValue={info.username}
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
                    <Button variant="outlined" className={classes.updateButton}>
                      Apply Changes
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
