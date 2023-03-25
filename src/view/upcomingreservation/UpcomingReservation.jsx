import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import ReservationCard from "../../components/reservationcard/ReservationCard";
// import map from "../../Assets1/map.png";
import styled from "styled-components";
import Navbar from "../../components/common/navbar/Navbar";
import Map from "../../components/map/Map";
import fire from "../../config/config";
import moment from "moment";
import axios from "axios";
import DataMap from "../../components/map/DataMap";

export default function UpcomingReservation() {
  const [upcomingData, setUpcomingData] = useState([]);

  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("USERID");

  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   getData();
  // }, []);
  const getData = () => {
    fire
      .firestore()
      .collection("reservation")
      .where("hostId", "==", userId)
      .onSnapshot((query) => {
        const db = [];
        if (query.size === 0) {
          // console.log(query.size);
          setLoading(true);
          query.docs.forEach((doc) => {
            db.push(doc.data());
          });
          setUpcomingData([...db]);
        } else {
          // console.log(query.size);
          query.docs.forEach((doc) => {
            setLoading(true);
            db.push(doc.data());
          });
          setUpcomingData([...db]);
        }
      });
  };
  const acceptReservation = async (value) => {
    message.loading("Loading........", 0);
    const transactionId = fire.firestore().collection("transactions").doc().id;
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    };
    await axios
      .post(
        `https://yugo-97d77.uc.r.appspot.com/transaction?amount=${
          value?.totalPrice
        }&application_fee_amount=${value?.servicesFees}&email=${
          value?.travelerUser?.email
        }&name=Ali&destination_account=${"acct_1KBVfvL1EKKxPjpp"}&token=${"tok_diners"}`,
        config
      )
      .then((res) => {
        // console.log("Charge Id", res.data.payment.id);
        // console.log("Receipt Url", res.data.payment.receipt_url);
        // console.log(
        //   "Date ",
        //   moment(res.data.payment.created).format("MM-DD-YYYY")
        // );
        // console.log("Payment ", res.data.payment);
        fire
          .firestore()
          .collection("Transactions")
          .doc(transactionId)
          .set({
            chargeId: res.data.payment.id,
            receipt_url: res.data.payment.receipt_url,
            createdAt: res.data.payment.created,
            hostId: value?.hostId,
            travelerId: value?.travelerId,
            spotId: value?.spotData.spotId,
            travelerName: value?.travelerUser?.firstName,
            travelerEmail: value?.travelerUser?.email,
            spotName: value?.spotData?.spotName,
            hostEmail: value?.hostEmail,
          })
          .then(() => {
            fire
              .firestore()
              .collection("reservation")
              .doc(value?.docId)
              .update({
                status: "Approved",
                travelerTransactionId: res.data.payment.id,
              })
              .then((e) => {
                message.destroy();
                message.success("Transaction Completed", 3);
              });
          });
      })
      .catch((e) => message.info("Something Wrong", 3));
  };
  const declineReservation = async (
    docId,
    hostEmail,
    travelerEmail,
    startDate,
    endDate
  ) => {
    console.log(docId, hostEmail, travelerEmail);
    message.loading("In Progress", 0);
    const cancelReservationByHost = fire
      .functions()
      .httpsCallable("cancelReservationByHost");
    const resp = await cancelReservationByHost({
      reservationId: docId,
      travelerEmail: travelerEmail,
    });
    if (resp) {
      message.destroy();
      console.log("deleted");
    }
  };

  return (
    loading && (
      <>
        <Navbar />
        <Wrapper>
          <div className="reservation-header-div">
            <div className="header-div">
              <h1 style={{ paddingTop: "20px" }}>
                &nbsp;UPCOMING RESERVATIONS
              </h1>
            </div>
            <div className="reservation-body">
              <Row>
                {upcomingData.length !== 0 ? (
                  upcomingData.map((item, key) => {
                    return (
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <ReservationCard
                          key={key}
                          data={item}
                          acceptReservation={acceptReservation}
                          declineReservation={declineReservation}
                        />
                      </Col>
                    );
                  })
                ) : (
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h1>No Upcoming Reservations Found</h1>
                  </Col>
                )}
              </Row>
            </div>
          </div>
          {upcomingData.length === 0 ? null : (
            // <Map data={upcomingData} value="Trips" />
            <DataMap data={upcomingData} />
          )}
        </Wrapper>
      </>
    )
  );
}

export const Wrapper = styled.div`
  background: #eff0f2;
  display: flex;
  // height: calc(100% - 114px);
  height: 100%;
  .reservation-header-div {
    width: 50%;
    overflow-y: scroll;
    padding-right: 20px;
  }
  h1 {
    padding-left: 20px;
  }
  .reservation-body {
    padding-left: 20px;
  }

  @media screen and (max-width: 999px) {
    height: calc(100% - 77px);
  }
  @media screen and (max-width: 720px) {
    display: flex;
    flex-direction: column;
    .reservation-header-div {
      width: 100%;
      height: 50%;
      padding-right: 20px;
    }
    .reservation-body {
      .ant-col {
        width: 100%;
      }
    }
    .center-details .date {
      width: 100%;
    }
  }
`;
