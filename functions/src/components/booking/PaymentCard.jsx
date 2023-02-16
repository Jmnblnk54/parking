import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import PaymentMethod from "../paymentmethod/PaymentMethod";
import CheckoutForm from "./Checkout";
import PaypalPayment from "./PaypalPayment";

export default function PaymentCard(props) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "sk_test_51KBVfvL1EKKxPjppGBkfGWnZ1mQpcwDpIhNYI8L0ZL3X4E9dXx5H09z5tMWDQzkTeRRnclIEbdeqPSUmm6X5Vjc600PAUopYgH",
  };
  const stripePromise = loadStripe(
    "pk_test_51KBVfvL1EKKxPjppwsXmWi2ae2nG5duejEhNvc9zhv85AfvaMbcQQ9wlJ8Y0733Vr4sdr1hcV4EjNBiTXKWyFIgn00rKEZQ6uo"
  );
  // console.log(stripePromise);
  const history = useHistory();
  const [value, setValue] = useState("Card");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // console.log(value);
  const onSubmit = () => {};
  return (
    <Wrapper>
      <div className="heading">Payment Info</div>
      <div className="main">
        <PaymentMethod value={value} onChange={onChange} />
        {value === "Card" ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              paymentMethod={props.paymentMethod}
              setPaymentMethod={props.setPaymentMethod}
              data={props.data}
              travelerData={props.travelerData}
              bookingData={props.bookingData}
              hostData={props.hostData}
            />
          </Elements>
        ) : (
          <PaypalPayment
            hostData={props.hostData}
            spotName={props.data.spotName}
            startDate={props.startDate}
            endDate={props.endDate}
            amount={parseFloat(props.totalPrice).toFixed(2)}
          />
          // <>
          //   <div style={{ alignSelf: "center" }}>
          //     <button className="btn btn-green">Login Paypal</button>
          //   </div>
          // </>
        )}
        <br />
        {/* <div className="heading">3.&nbsp;Review And Purchase</div>
      <button className="btn btn-green" onClick={() => onSubmit()}>
        Complete Booking
      </button> */}
      </div>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 50%;

  background: white;
  margin: 20px;
  border-radius: 35px;
  padding: 20px;
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .heading {
    font-size: 22px;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100% !important;
    height: 35px !important;
    cursor: pointer;
    background: #da6060;
    color: white;
    border-radius: 5px !important;
    border: 0px !important;
    min-width: 26px;
    font-size: 15px;
    svg {
      width: 26px;
      height: 26px;
    }
    div {
      width: 100%;
    }
  }
  .btn-green {
    background: #4d9d74;
  }
  .login-options {
    margin: 15px 0px;
    .divider {
      width: 45%;
      height: 1px;
      background: #cacaca;
      margin: 15px 0px;
    }
  }
  @media only screen and (max-width: 999px) {
    width: 95%;
    align-self: center;
  }
`;
