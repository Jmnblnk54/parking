// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import fire from "../../config/config";
import "./styles.css";

// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       iconColor: "#4d9d74",
//       color: "black",
//       fontWeight: 500,
//       fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//       fontSize: "16px",
//       fontSmoothing: "antialiased",
//       ":-webkit-autofill": {
//         color: "black",
//       },
//       "::placeholder": {
//         color: "#4d9d74",
//       },
//     },
//     invalid: {
//       iconColor: "black",
//       color: "black",
//     },
//   },
// };

// const CardField = ({ onChange }) => (
//   <div className="FormRow">
//     <CardElement options={CARD_OPTIONS} onChange={onChange} />
//   </div>
// );

// const Field = ({
//   label,
//   id,
//   type,
//   placeholder,
//   required,
//   autoComplete,
//   value,
//   onChange,
// }) => (
//   <div className="FormRow">
//     <label htmlFor={id} className="FormRowLabel">
//       {label}
//     </label>
//     <input
//       className="FormRowInput"
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       required={required}
//       autoComplete={autoComplete}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// const SubmitButton = ({ processing, error, children, disabled }) => (
//   <button
//     className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
//     type="submit"
//     disabled={processing || disabled}
//   >
//     {processing ? "Processing..." : children}
//   </button>
// );

// const ErrorMessage = ({ children }) => (
//   <div className="ErrorMessage" role="alert">
//     <svg width="16" height="16" viewBox="0 0 17 17">
//       <path
//         fill="#FFF"
//         d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
//       />
//       <path
//         fill="#6772e5"
//         d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
//       />
//     </svg>
//     {children}
//   </div>
// );

// const ResetButton = ({ onClick }) => (
//   <button type="button" className="ResetButton" onClick={onClick}>
//     <svg width="32px" height="32px" viewBox="0 0 32 32">
//       <path
//         fill="#FFF"
//         d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
//       />
//     </svg>
//   </button>
// );
const fetchFromAPI = async (endpointURL, opts) => {
  const { method, body } = { method: "POST", body: null, ...opts };
  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const CheckoutForm = () => {
  const handleClick = async (e) => {
    const body = { line_items: [product] };
    const { id: sessionId } = fetchFromAPI("checkouts", {
      body,
    });
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (error) {
      console.log(error);
    }
  };
  const [product, setProduct] = useState({
    name: "hat",
    description: "Pug hat. A hat your pug will love.",
    images: [""],
    amount: 9900,
    currency: "usd",
    quantity: 0,
  });

  return (
    <>
      <div>
        <h3>{product.name}</h3>
        <h4>Stripe Amount: {product.amount}</h4>

        <img src={product.images[0]} width="250px" alt="product" />

        <button onClick={() => changeQuantity(-1)}>-</button>
        <span>{product.quantity}</span>
        <button onClick={() => changeQuantity(1)}>+</button>
      </div>

      <hr />

      <button onClick={handleClick} disabled={product.quantity < 1}>
        Start Checkout
      </button>
    </>
  );
};

// const CheckoutForm = (props) => {
//   const uId = localStorage.getItem("USERID");
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [cardComplete, setCardComplete] = useState(false);
//   const [cardDetails, setCardDetails] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const history = useHistory();
//   // const [paymentMethod, setPaymentMethod] = useState(null);
//   const [billingDetails, setBillingDetails] = useState({
//     email: "",
//     phone: "",
//     name: "",
//   });

//   const getCardDetails = async () => {
//     await fire
//       .firestore()
//       .collection("card-details")
//       .doc(uId)
//       .get()
//       .then((e) => {
//         let cardData = e.data();
//         cardData.docid = e.id;
//         setCardDetails(cardData);
//       });
//   };

//   useEffect(() => {
//     if (!cardDetails.length) {
//       getCardDetails();
//       console.log("card details in checkout", cardDetails);
//     }
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     if (error) {
//       elements.getElement("card").focus();
//       return;
//     }

//     if (cardComplete) {
//       setProcessing(true);
//     }
//     let token = await stripe.createToken(elements.getElement(CardElement));
//     const payload = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//       billing_details: billingDetails,
//     });
//     // const token = await stripe.createToken({
//     //   card: elements.getElement(CardElement),
//     // });
//     setProcessing(false);

//     if (payload.error) {
//       setError(payload.error);
//     } else {
//       console.log(token.token);
//       const spotId = props.data.spotId;
//       fire
//         .firestore()
//         .collection("spots")
//         .doc(spotId)
//         .get()
//         .then((e) => {
//           const _noOfSpot = e.data()?.noOfSpot;
//           if (_noOfSpot <= 0) {
//             message.error(
//               "We are sorry, currently all lots of this spot are reserved "
//             );
//           } else {
//             message.success("Reservation Booked");
//             e.ref
//               .update({
//                 noOfSpot: _noOfSpot - 1,
//               })
//               .then(async () => {
//                 props.setPaymentMethod(payload.paymentMethod);
//                 const createReservations = fire
//                   .functions()
//                   .httpsCallable("createReservations");
//                 const resp = await createReservations({
//                   travelerUser: props.travelerData,
//                   spotData: props.data,
//                   hostId: props.data.hostId,
//                   travelerId: props.travelerData.userId,
//                   startDate: props.bookingData.startDate,
//                   endDate: props.bookingData.endDate,
//                   numberOfDays: props.bookingData.days,
//                   pricePerDay: props.bookingData.price,
//                   totalPrice: props.bookingData.totalPrice,
//                   servicesFees: props.bookingData.serviceFees,
//                   paymentMethod: payload.paymentMethod.id,
//                   hostEmail: props.hostData.email,
//                   tokenId: token.token.id,
//                 }).then(() => {
//                   history.push("/traveler/trips");
//                 });
//               });
//           }
//         })
//         .catch(() => {
//           message.error("We are having some server error");
//         });
//     }
//   };

//   const reset = () => {
//     setError(null);
//     setProcessing(false);
//     props.setPaymentMethod(null);
//     setBillingDetails({
//       email: "",
//       phone: "",
//       name: "",
//     });
//   };

//   return props.paymentMethod ? (
//     <div className="Result">
//       <div className="ResultTitle" role="alert">
//         Payment successful
//       </div>
//       <div className="ResultMessage">
//         No money was charged Until Spot Owner accept this Reservation, but we
//         generated a PaymentMethod
//       </div>
//       <ResetButton onClick={reset} />
//     </div>
//   ) : (
//     <form className="Form" onSubmit={handleSubmit}>
//       <fieldset className="FormGroup">
//         <Field
//           label="Name"
//           id="name"
//           type="text"
//           placeholder="Jane Doe"
//           required
//           autoComplete="name"
//           value={billingDetails.name}
//           onChange={(e) => {
//             setBillingDetails({ ...billingDetails, name: e.target.value });
//           }}
//         />
//         <Field
//           label="Email"
//           id="email"
//           type="email"
//           placeholder="janedoe@gmail.com"
//           required
//           autoComplete="email"
//           value={billingDetails.email}
//           onChange={(e) => {
//             setBillingDetails({ ...billingDetails, email: e.target.value });
//           }}
//         />
//         <Field
//           label="Phone"
//           id="phone"
//           type="tel"
//           placeholder="(941) 555-0123"
//           required
//           autoComplete="tel"
//           value={billingDetails.phone}
//           onChange={(e) => {
//             setBillingDetails({ ...billingDetails, phone: e.target.value });
//           }}
//         />
//       </fieldset>
//       <fieldset className="FormGroup">
//         <CardField
//           onChange={(e) => {
//             setError(e.error);
//             setCardComplete(e.complete);
//           }}
//         />
//       </fieldset>
//       {error && <ErrorMessage>{error.message}</ErrorMessage>}
// <SubmitButton processing={processing} error={error} disabled={!stripe}>
//   Pay
// </SubmitButton>
// </form>
//   );
// };

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.

// export default CheckoutForm;
