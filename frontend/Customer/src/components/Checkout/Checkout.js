import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./Checkout.styles";
import { userRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { openSnackBar } from "../../redux/snackBarRedux";
import { clearCart } from "../../redux/cartRedux";

export default function Checkout() {
  const classes = useStyles();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      payment: "cod",
      additioalNotes: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await userRequest.post(
          `/orders/create/customer/${user._id}`,
          {
            customerId: user._id,
            products: cart.products,
            additioalNotes: values.additioalNotes,
          }
        );
        dispatch(
          openSnackBar({
            message: `Order placed for amount Rs ${res.data.total}`,
            severity: "success",
          })
        );
        dispatch(clearCart());
        navigate("/orders", { replace: true });
      } catch (err) {
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
    },
  });

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Checkout
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Paper elevation={5} className={classes.paper}>
              <Grid
                container
                justifyContent="space-evenly"
                alignItems="center"
                direction="column"
              >
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <RadioGroup id="payment">
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label="Cash On Delivery"
                        />
                      </RadioGroup>
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Additional Order Notes"
                    multiline
                    id="additioalNotes"
                    value={formik.values.additioalNotes}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    type="submit"
                  >
                    Checkout
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
