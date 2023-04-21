import { Alert, Col, Row } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Availabilty from "../../components/availability/Availability";
import Navbar from "../../components/common/navbar/Navbar";
import ListSpot from "../../components/listspot/ListSpot";
import PriceSpot from "../../components/pricespot/PriceSpot";
import fire from "../../config/config.js";
import spotValidation from "../../functions/spotValidation.js";
import styled from "styled-components";
export default function Listing() {
  const history = useHistory();
  const [halfDay, setHalfDay] = useState(false);
  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const hostId = localStorage.getItem("USERID");
  const [data, setData] = useState({
    spotName: "",
    spotAddress: "",
    noOfSpot: "",
    spotDescription: "",
    halfDayPrice: 0,
    dailyPrice: 0,
    weeklyPrice: 0,
    monthlyPrice: 0,
    startDate: "",
    endDate: "",
    cryptoCheck: "No",
    error: "",
    type: "",
    firstImageUrl: "",
    secondImageUrl: "",
    thirdImageUrl: "",
    check: false,
    latitude: "",
    longitude: "",
  });

  const handleListSpot = () => {
    const ref = fire.firestore().collection("spots");
    const response = spotValidation(data, halfDay, weekly, daily, monthly);
    if (response === "All Clear") {
      setData({
        ...data,
        error: "",
      });
      if (data.type !== "") {
        const docId = ref.doc().id;
        ref
          .doc(docId)
          .set({
            spotName: data?.spotName,
            spotAddress: data?.spotAddress,
            noOfSpot: data?.noOfSpot,
            spotDescription: data?.spotDescription,
            halfDayPrice: parseInt(data?.halfDayPrice),
            dailyPrice: parseInt(data?.dailyPrice),
            weeklyPrice: parseInt(data?.weeklyPrice),
            monthlyPrice: parseInt(data?.monthlyPrice),
            startDate: data?.startDate,
            endDate: data?.endDate,
            cryptoCheck: data?.cryptoCheck,
            hostId: hostId,
            status: "pending",
            spotId: docId,
            spotType: data?.type,
            rating: "0",
            firstImageUrl: data?.firstImageUrl,
            secondImageUrl: data?.secondImageUrl,
            thirdImageUrl: data?.thirdImageUrl,
            latitude: data?.latitude,
            longitude: data?.longitude,
          })
          .then(() => {
            setData({
              ...data,
              error: "Added",
              spotName: "",
              spotAddress: "",
              noOfSpot: "",
              spotDescription: "",
              halfDayPrice: 0,
              dailyPrice: 0,
              weeklyPrice: 0,
              monthlyPrice: 0,
              startDate: "",
              endDate: "",
              cryptoCheck: "No",
              firstImageUrl: "",
              secondImageUrl: "",
              thirdImageUrl: "",
              latitude: "",
              longitude: "",
            });
            history.push("/host/profile");
          })
          .catch((e) => {
            setData({
              ...data,
              error: e.code,
            });
          });
      } else {
        setData({
          ...data,
          error: "Please Select Any Available Price Spot",
        });
      }
    } else {
      setData({
        ...data,
        error: response,
      });
    }
  };

  return (
    <>
        <Navbar />
        <Wrapper>
          <div className="profile-sub-wrap">
            {data.error === "" ? null : (
              <Alert message={data.error} type="error" showIcon />
            )}
            <Row>
              <Col lg={24}>
                <h1>MANAGE LISTING</h1>
              </Col>
            </Row>
            <div className="flex-row">
                <div className="listing-col">
                  <ListSpot
                    halfDay={halfDay}
                    setHalfDay={setHalfDay}
                    daily={daily}
                    setDaily={setDaily}
                    weekly={weekly}
                    setWeekly={setWeekly}
                    monthly={monthly}
                    setMonthly={setMonthly}
                    data={data}
                    setData={setData}
                  />
                </div>
                <div className="listing-col">
                  <PriceSpot
                    halfDay={halfDay}
                    setHalfDay={setHalfDay}
                    daily={daily}
                    setDaily={setDaily}
                    weekly={weekly}
                    setWeekly={setWeekly}
                    monthly={monthly}
                    setMonthly={setMonthly}
                    data={data}
                    setData={setData}
                  />
                </div>
                <div className="listing-col">
                  <Availabilty
                    data={data}
                    setData={setData}
                    handleListSpot={handleListSpot}
                  />
                </div>
            </div>
          </div>
        </Wrapper>
    </>
  );
}

export const Wrapper = styled.div`
    height: 100%;
  
  .profile-sub-wrap {
    background-color: #e7f0eb;
    height: 100%;
    padding: 30px 30px 20px 30px;
    height: 100%;
  }
  .flex-row {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
  }

  .listing-col {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 30%;
    margin: 10px;
  }

  @media screen and (max-width: 991px) {
    height: auto!important;
    
    .listing-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: auto;
      max-width: 100%;
      margin-bottom: 5%; 
    }

    .flex-row {
      flex-direction: column;
    }

  }
`;
