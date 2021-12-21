import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import { AddShoppingCartOutlined } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./Store.styles";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";
import { openSnackBar } from "../../redux/snackBarRedux";

export default function Store() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("default");
  const [loading, setLoading] = useState(false);
  const image = require("../../images/no image.png");
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/products/");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (typeof err.response.data === "string") {
          dispatch(
            openSnackBar({ message: err.response.data, severity: "error" })
          );
        } else {
          dispatch(
            openSnackBar({
              message: "Server Error. Try Again Later",
              severity: "error",
            })
          );
        }
      }
    };

    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    if (filter === "ltoh") {
      setFilteredProducts(
        data.sort((a, b) => {
          return a.price - b.price;
        })
      );
    } else if (filter === "htol") {
      setFilteredProducts(
        data.sort((a, b) => {
          return b.price - a.price;
        })
      );
    } else if (filter === "available") {
      setFilteredProducts(
        data.filter((product) => {
          if (product.available) {
            return product;
          }
          return null;
        })
      );
    } else {
      setFilteredProducts([]);
    }
  };

  const handleAddCart = (productId) => {
    const currentProduct = data.find((product) => product._id === productId);
    dispatch(openSnackBar({ message: "Added to Cart!", severity: "success" }));
    dispatch(addProduct({ ...currentProduct, quantity: 1 }));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" align="center" gutterBottom>
        Store
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
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
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => {
                var imageLink = "";
                if (product.productImage) {
                  imageLink = `http://localhost:5000/${product.productImage}`;
                } else {
                  imageLink = image;
                }
                return (
                  <Grid item xs={10} md={10} lg={3} key={product._id}>
                    <Grid container direction="column">
                      <Card raised>
                        <Link
                          to={`/store/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <CardContent>
                            <Grid item xs>
                              <img
                                src={imageLink}
                                alt=""
                                className={classes.image}
                              />
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.text}>
                                {product.name}
                              </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.text}>
                                Rs {product.price}
                              </Typography>
                            </Grid>
                            <Grid item xs>
                              {product.available ? (
                                <Typography className={classes.textInStock}>
                                  In Stock!
                                </Typography>
                              ) : (
                                <Typography className={classes.textOutStock}>
                                  Out of Stock!
                                </Typography>
                              )}
                            </Grid>
                          </CardContent>
                        </Link>
                        <CardActions>
                          <Grid item xs={12}>
                            <Link
                              to={`/store/${product._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="outlined">View Product</Button>
                            </Link>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="outlined"
                              disabled={!product.available}
                              onClick={() => handleAddCart(product._id)}
                            >
                              <AddShoppingCartOutlined />
                              <Typography>Add To Cart</Typography>
                            </Button>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                );
              })
            : data.map((product) => {
                var imageLink = "";
                if (product.productImage) {
                  imageLink = `http://localhost:5000/${product.productImage}`;
                } else {
                  imageLink = image;
                }
                return (
                  <Grid item xs={10} md={10} lg={3} key={product._id}>
                    <Grid container direction="column">
                      <Card raised>
                        <Link
                          to={`/store/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <CardContent>
                            <Grid item xs>
                              <img
                                src={imageLink}
                                alt=""
                                className={classes.image}
                              />
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.text}>
                                {product.name}
                              </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.text}>
                                Rs {product.price}
                              </Typography>
                            </Grid>
                            <Grid item xs>
                              {product.available ? (
                                <Typography className={classes.textInStock}>
                                  In Stock!
                                </Typography>
                              ) : (
                                <Typography className={classes.textOutStock}>
                                  Out of Stock!
                                </Typography>
                              )}
                            </Grid>
                          </CardContent>
                        </Link>
                        <CardActions>
                          <Grid item xs={12}>
                            <Link
                              to={`/store/${product._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="outlined">View Product</Button>
                            </Link>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="outlined"
                              disabled={!product.available}
                              onClick={() => handleAddCart(product._id)}
                            >
                              <AddShoppingCartOutlined />
                              <Typography>Add To Cart</Typography>
                            </Button>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                );
              })}
        </Grid>
      )}
    </div>
  );
}
