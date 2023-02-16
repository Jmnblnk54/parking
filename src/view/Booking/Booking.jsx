import { message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BookingDetailsCard from "../../components/booking/BookingDetailsCard";
import PaymentCard from "../../components/booking/PaymentCard";
import Navbar from "../../components/common/navbar/Navbar";
import fire from "../../config/config";
import { Div, Wrapper } from "./Booking.styled";
const stripe = require("@stripe/stripe-js");

function Booking() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [data, setData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [reservation, setReservation] = useState({});
  const [travelerData, setTravelerData] = useState({});
  const [hostData, setHostData] = useState({});
  const auth = localStorage.getItem("Auth Token");
  const userType = localStorage.getItem("User Type");
  const userId = localStorage.getItem("USERID");
  useEffect(() => {
    if (location?.state?.spotId) {
      console.log(location?.state);
      getTravelerData();
      fire
        .firestore()
        .collection("spots")
        .where("spotType", "==", location?.state?.spotType)
        .where("spotId", "==", location?.state?.spotId)
        .onSnapshot((query) => {
          const db = [];
          if (query.size === 0) {
            console.log("Data", query.size);
          } else {
            query.docs.forEach((doc) => {
              fire
                .firestore()
                .collection("users")
                .where("userId", "==", doc.data().hostId)
                .where("userType", "==", "HOST")
                .onSnapshot((query) => {
                  query.docs.forEach((data) => {
                    setHostData(data.data());
                  });
                });
              setData(doc.data());
              setLoading(true);
            });
          }
        });
    }
  }, [location]);

  const getTravelerData = () => {
    fire
      .firestore()
      .collection("users")
      .where("userType", "==", localStorage.getItem("User Type"))
      .where("userId", "==", localStorage.getItem("USERID"))
      .onSnapshot((e) => {
        if (e.size === 0) {
          console.log("User Data Not Found", e.size);
        } else {
          e.docs.forEach((doc) => {
            setTravelerData(doc.data());
          });
        }
      });
  };

  const PayNow = () => {
    if (reservation.paymentMethodName === "Stripe") {
      getHostStripeID();
      console.log(reservation);
      if (reservation.hostStripeId) {
        fire
          .firestore()
          .collection("users")
          .where("userId", "==", userId)
          .get()
          .then((e) => {
            // e.docs.forEach((doc) => {
            //   // if (doc.data().stripe_customerId === "") {
            //   //   console.log("First Setup Your Stripe Account")
            //   // } else {
            // }
            // })
          });
      } else {
        message
          .error(
            "No Booking is Available Now for this Spot because Stripe Payment is Not Verified",
            5
          )
          .then(() => message.destroy());
      }
    } else {
    }
  };
  const getHostStripeID = () => {
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", data?.hostId)
      .where("userType", "==", "HOST")
      .get()
      .then((e) => {
        let res = "";
        e.docs.forEach((doc) => {
          if (String(doc.data().stripeAccountId).length === 0) {
            setReservation({
              ...reservation,
              hostStripeId: "",
            });
          } else {
            setReservation({
              ...reservation,
              hostStripeId: doc.data().stripeAccountId,
            });
          }
        });
      });
    // return res;
  };
  return (
    loading && (
      <Wrapper>
        <Navbar />
        <Div>
          <BookingDetailsCard
            totalPrice={
              location?.state?.totalPrice + location?.state?.serviceFees
            }
            serviceFees={location?.state?.serviceFees}
            spotType={location?.state?.spotType}
            data={data}
            startDate={location?.state?.startDate}
            endDate={location?.state?.endDate}
            days={location?.state?.days}
            PayNow={PayNow}
            reservation={reservation}
            setReservation={setReservation}
            price={location?.state?.price}
          />
          <PaymentCard
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            data={data}
            startDate={moment(
              location?.state?.startDate,
              "MM-DD-YYYY, ddd hh:mm"
            ).format("MM-DD-YYYY, ddd hh:mm a")}
            endDate={moment(
              location?.state?.endDate,
              "MM-DD-YYYY, ddd hh:mm"
            ).format("MM-DD-YYYY, ddd hh:mm a")}
            travelerData={travelerData}
            bookingData={location?.state}
            hostData={hostData}
            totalPrice={
              location?.state?.totalPrice + location?.state?.serviceFees
            }
          />
        </Div>
      </Wrapper>
    )
  );
}

export default Booking;
