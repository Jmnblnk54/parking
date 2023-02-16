import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

function PaypalPayment({ spotName, amount, startDate, endDate, hostData }) {
  const [success, setSuccess] = React.useState(false);
  const [ErrorMessage, setErrorMessage] = React.useState("");
  const [orderID, setOrderID] = React.useState(false);
  const [billingDetails, setBillingDetails] = React.useState("");

  console.log(amount);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: `Spot Reservation: "${spotName}" from "${startDate}" to "${endDate}"`,
            amount: {
              currency_code: "USD",
              value: amount,
            },
            payee: { email_address: hostData.email },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  console.log(hostData);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setBillingDetails(payer);
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  React.useEffect(() => {
    if (success) {
      alert("Payment successful!!");
    }
  }, [success]);

  console.log(1, orderID);
  console.log(2, success);
  console.log(3, ErrorMessage);

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <PayPalButtons
        style={{
          color: "blue",
          shape: "pill",
          label: "pay",
          tagline: false,
          layout: "vertical",
        }}
        fundingSource="paypal"
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
      {setErrorMessage != "" ? setErrorMessage : null}
    </PayPalScriptProvider>
  );
}

export default PaypalPayment;
