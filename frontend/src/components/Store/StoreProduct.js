import { Button, Fab, Grid, TextField, Typography } from "@material-ui/core";
import {
  AddOutlined,
  AddShoppingCartOutlined,
  RemoveOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useStyles } from "./StoreProduct.styles";

export default function StoreProduct() {
  const image = require("../../images/Home1.jpg");
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction="row" justifyContent="space-evenly">
        <Grid item xs={10} md={10} lg={5}>
          <img src={image} alt="" className={classes.imgae} />
        </Grid>
        <Grid
          item
          xs={10}
          md={10}
          lg={5}
          container
          spacing={2}
          justifyContent="space-evenly"
        >
          <Grid item xs>
            <Typography variant="h4">Product 1</Typography>
            <Typography variant="h6">Rs 500</Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <div className={classes.quantityContainer}>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
              >
                <Grid item xs={3}>
                  <Fab
                    color="primary"
                    aria-label="addQuantity"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    <AddOutlined />
                  </Fab>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    label="Quantity"
                    value={quantity}
                  />
                </Grid>
                <Grid item xs={3} className={classes.button}>
                  <Fab
                    color="primary"
                    aria-label="subtractQuantity"
                    onClick={() => {
                      setQuantity(quantity - 1);
                    }}
                    disabled={quantity <= 1}
                  >
                    <RemoveOutlined />
                  </Fab>
                </Grid>
              </Grid>
            </div>
            <Grid item xs className={classes.buttonCart}>
              <Button variant="outlined" fullWidth>
                <AddShoppingCartOutlined />
                <Typography>Add To Cart</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
