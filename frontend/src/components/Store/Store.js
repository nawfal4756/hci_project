import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import { AddShoppingCartOutlined } from "@material-ui/icons";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./Store.styles";

export default function Store() {
  const classes = useStyles();
  const image = require("../../images/Home1.jpg");
  // const [data, setData] = useState([]);
  const [filter, setFilter] = useState("default");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" align="center" gutterBottom>
        Store
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          container
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <InputLabel htmlFor="age-native-simple">Filter</InputLabel>
          <Select native onChange={handleFilterChange} value={filter}>
            <option value="default">Select</option>
            <option value="ltoh">Price: Low to High</option>
            <option value="htol">Price: High to Low</option>
            <option value="available">Available Products</option>
          </Select>
        </Grid>
        <Grid item xs={10} md={10} lg={3} container direction="column">
          <Card raised>
            <Link to={`/store}`} style={{ textDecoration: "none" }}>
              <CardContent>
                <Grid item xs>
                  <img src={image} alt="" className={classes.image} />
                </Grid>
                <Grid item xs>
                  <Typography className={classes.text}>Product 1</Typography>
                </Grid>
                <Grid item xs>
                  <Typography className={classes.text}>Rs 100</Typography>
                </Grid>
              </CardContent>
            </Link>
            <CardActions>
              <Grid item xs={12}>
                <Link to="" style={{ textDecoration: "none" }}>
                  <Button variant="outlined">View Product</Button>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined">
                  <AddShoppingCartOutlined />
                  <Typography>Add To Cart</Typography>
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
