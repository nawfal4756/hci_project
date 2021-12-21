import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./Home.styles";

export default function Home() {
  const home1 = require("../../images/Home1.jpg");
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            Welcome To Karachi Dairy Farm
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={0}>
            <img
              src={home1}
              alt="Milk pouring in to container"
              className={classes.image}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={0}>
            <img src={home1} alt="Milk pouring in to container" />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
