import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function MyAccount() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography variant="h2" align="center">
            My Account
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
