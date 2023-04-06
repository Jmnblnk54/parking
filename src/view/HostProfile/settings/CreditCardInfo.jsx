import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import fire from "../../../config/config";
import { message } from "antd";

const CreditCardInfo = ({ uId, getCardDetails }) => {
  const stripe = useStripe();
  console.log(stripe, "stripe");
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setCardError(error.message);
    } else {
      const arr = [
        {
          stripeId: paymentMethod.id,
          cardDetails: paymentMethod.card,
        },
      ];

      setCardError(null);
      await fire
        .firestore()
        .collection("card-details")
        .doc(uId)
        .get()
        .then((e) => {
          if (e.exists === false) {
            e.ref
              .set({ cards: arr })
              .then((e) => message.success("Card Added Successfully"));
          } else {
            const _cards = e.data().cards;
            _cards.push(arr[0]);
            e.ref
              .update({ cards: _cards })
              .then((e) => message.success("Card Added Successfully"));
          }
        })
        .then(() => {
          getCardDetails();
        });

      console.log(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              color: "#32325d",
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
        }}
        onChange={(event) => {
          setCardComplete(event.complete);
          setCardError(event.error ? event.error.message : null);
        }}
      />
      {cardError && (
        <div className="card-error" role="alert">
          {cardError}
        </div>
      )}
      <button type="submit" disabled={!stripe || !cardComplete}>
        Add Card
      </button>
    </form>
  );
};

export default CreditCardInfo;
