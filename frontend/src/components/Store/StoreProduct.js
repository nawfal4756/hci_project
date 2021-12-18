import { Button, Fab, Grid, TextField, Typography } from "@material-ui/core";
import {
  AddOutlined,
  AddShoppingCartOutlined,
  RemoveOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addProduct } from "../../redux/cartRedux";
import { publicRequest } from "../../requestMethods";
import { useStyles } from "./StoreProduct.styles";

export default function StoreProduct() {
  const classes = useStyles();
  const image = require("../../images/no image.png");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/${params.id}`);
        setProduct(res.data);
      } catch (err) {}
    };

    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCart = () => {
    dispatch(addProduct({ product, quantity }));
  };

  var imageLink = "";
  if (product.productImage) {
    imageLink = `http://localhost:5000/${product.productImage}`;
  } else {
    imageLink = image;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction="row" justifyContent="space-evenly">
        <Grid item xs={10} md={10} lg={5}>
          <img src={imageLink} alt="" className={classes.imgae} />
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
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="h6">Rs {product.price}</Typography>
            <Typography>{product.description}</Typography>
            {product.available ? (
              <Typography variant="h5" className={classes.textInStock}>
                In Stock!
              </Typography>
            ) : (
              <Typography variant="h5" className={classes.textOutStock}>
                Out of Stock!
              </Typography>
            )}
            {product.available ? (
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
                      disabled={quantity >= product.quantityAvailable}
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
            ) : null}
            <Grid item xs className={classes.buttonCart}>
              <Button
                variant="outlined"
                fullWidth
                disabled={!product.available}
                onClick={handleAddCart}
              >
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
