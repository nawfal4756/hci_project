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

export default function PasswordChange() {
  const classes = useStyles();
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
          <form>
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
                      required
                      label="Old Password"
                      id="old-password"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="New Password"
                      id="new-password"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Re-Enter New Password"
                      id="re-new-password"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" className={classes.button}>
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
