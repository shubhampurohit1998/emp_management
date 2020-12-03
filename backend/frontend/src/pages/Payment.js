import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51Hh7mdDLc34hbinWRIiYWGS8UGet1px0OWmp0nDLanTgrrmjL7GA1QDqEzYpX6df8Hh5kpX4JKYYck1VJy7Az2xJ000AP0x7kV"
  );
  return (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
  );
};

export default Payment;
