const router = require("express").Router();
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(STRIPE_KEY);

router.post("/payment", async (req, res) => {
  await stripe.charges.create(
    {
      // source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return res.status(500).json(stripeErr);
      }

      res.status(200).json(stripeRes);
    }
  );
});

module.exports = router;
