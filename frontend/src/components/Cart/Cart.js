import { Button, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import {
  AddOutlined,
  DeleteOutlined,
  RemoveOutlined,
} from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  clearCart,
  deleteProduct,
} from "../../redux/cartRedux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useStyles } from "./Cart.styles";

export default function Cart() {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart);
  const image = require("../../images/no image.png");
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, type) => {
    dispatch(changeQuantity({ productId, type }));

    if (type === "dec") {
      const product = cartItems.products.find((item) => item._id === productId);
      if (product.quantity === 1) {
        dispatch(
          openSnackBar({ message: "Removed from cart!", severity: "success" })
        );
      }
    }
  };

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct({ productId }));
    dispatch(
      openSnackBar({
        message: "Deleted from Cart Successfully!",
        severity: "success",
      })
    );
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Grid item xs>
          <Typography variant="h2" align="center">
            Cart
          </Typography>
        </Grid>
        {cartItems.products.length > 0 ? (
          cartItems.products.map((product) => {
            var imageLink = "";
            if (product.productImage) {
              imageLink = `http://localhost:5000/${product.productImage}`;
            } else {
              imageLink = image;
            }
            return (
              <Grid item xs={12} key={product._id}>
                <Paper elevation={5} className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={10} md={10} lg={3}>
                      <img src={imageLink} alt={product.name} />
                    </Grid>
                    <Grid item xs={10} md={10} lg={3}>
                      <Grid container direction="column">
                        <Grid item xs={12}>
                          <Typography variant="h5">{product.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h5">
                            Rs {product.price * product.quantity}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          container
                          direction="row"
                          alignContent="flex-end"
                          justifyContent="flex-end"
                          className={classes.quantity}
                        >
                          <Grid item xs={3}>
                            <IconButton
                              onClick={() => {
                                handleQuantityChange(product._id, "inc");
                              }}
                            >
                              <AddOutlined />
                            </IconButton>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography
                              variant="h6"
                              className={classes.quantityText}
                            >
                              {product.quantity}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <IconButton
                              onClick={() => {
                                handleQuantityChange(product._id, "dec");
                              }}
                            >
                              <RemoveOutlined />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      md={10}
                      lg={3}
                      container
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    >
                      <Button
                        onClick={() => {
                          handleProductDelete(product._id);
                        }}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              className={classes.noProduct}
            >
              No product in cart!
            </Typography>
          </Grid>
        )}
        {cartItems.products.length > 0 ? (
          <div>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Total: Rs {cartItems.total}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.clear}
                fullWidth
                variant="outlined"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                Clear Cart
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.checkout} fullWidth variant="outlined">
                CheckOut
              </Button>
            </Grid>
          </div>
        ) : null}
      </Grid>
    </div>
  );
}
