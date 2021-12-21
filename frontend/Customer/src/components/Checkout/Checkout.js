import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import StripeCheckout from "react-stripe-checkout";
import { useStyles } from "./Checkout.styles";
import { publicRequest, userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Checkout() {
  const STRIPE_KEY =
    "pk_test_51HinnOFsnlx225g691MvvyOswXQTLQrvLxso5qutMVC9YhmEIy1MWz0wTNAfkwRw29TRLbXGqkbs4dR1YH2CZLfn00qgYisvsX";
  const classes = useStyles();
  const [totalAmountState, setTotalAmountState] = useState(0);
  const [stripeToken, setStripeToken] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const getTotalAmount = async () => {
      try {
        let res = await userRequest.post(
          `/products/totalprice/${user._id}`,
          cart
        );
        setTotalAmountState(res.data);
      } catch (err) {}
    };
    getTotalAmount();
  }, []);

  useEffect(() => {
    const backendPaymentRequest = async () => {
      try {
        const res = await publicRequest.post("/checkout/payment", {
          tokenId: stripeToken,
          amount: totalAmountState,
        });
        console.log(res.data);
      } catch (err) {}
    };
    backendPaymentRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeToken]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Checkout
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="space-evenly"
          alignContent="center"
          direction="column"
        >
          <form>
            <Paper elevation={5} className={classes.paper}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <RadioGroup
                    value={paymentMethod}
                    id="payment"
                    onChange={(event) => {
                      setPaymentMethod(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="cod"
                      control={<Radio />}
                      label="Cash On Delivery"
                    />
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Credit or Debit Card"
                    />
                  </RadioGroup>
                </FormLabel>
              </FormControl>
              <Grid item xs={12}>
                <StripeCheckout
                  name="Karachi Dairy Farm"
                  token={onToken}
                  amount={totalAmountState * 100}
                  description={`Payment of amount Rs ${totalAmountState}`}
                  stripeKey={STRIPE_KEY}
                >
                  <Button variant="outlined">Checkout</Button>
                </StripeCheckout>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
