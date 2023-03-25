import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import ReservationCard from "../../components/reservationcard/ReservationCard";
// import map from "../../Assets1/map.png";
import Navbar from "../../components/common/navbar/Navbar";
import Map from "../../components/map/Map";
import styled from "styled-components";
import fire from "../../config/config";
import SpotCard from "../../components/spotCard/SpotCard";
import FavouriteCards from "../../components/favouritecards/FavouriteCards";
import spotImage from "../../assets/images/spot-image.svg";
import DataMap from "../../components/map/DataMap";
import { Bounce } from "react-activity";

export default function FavouriteSpot() {
  const [loader, setLoader] = useState(true);
  const [upcomingData, setUpcomingData] = useState([]);

  const userId = localStorage.getItem("USERID");

  useEffect(() => {
    fire
      .firestore()
      .collection("Favorite")
      .where("travelerId", "==", userId)
      .onSnapshot((query) => {
        const db = [];

        if (query.size === 0) {
          query.docs.forEach((doc) => {
            db.push(doc.data());
          });
          setUpcomingData([...db]);
          setLoader(false);
        } else {
          console.log(query.size);
          query.docs.forEach((doc) => {
            db.push(doc.data());
          });

          setUpcomingData([...db]);
          setLoader(false);
        }
      });
  }, []);

  function getData() {}

  return (
    <>
      <Navbar />
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Bounce size={30} color={"#4d9d74"} />
        </div>
      ) : (
        <Wrapper>
          <div className="reservation-header-div">
            <div className="header-div">
              <h1 style={{ paddingTop: "20px" }}>&nbsp;MY FAVORITES</h1>
            </div>
            <div className="reservation-body">
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  {upcomingData.length !== 0 ? (
                    upcomingData.map((val, index) => {
                      console.log(val);
                      return (
                        <Row key={index}>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <FavouriteCards
                              id={val?.refId}
                              image={val?.spotData?.firstImageUrl}
                              Name={val?.spotData?.spotName}
                              locationName={val?.spotData?.spotAddress}
                              rate={val?.spotData?.rating}
                              rating={val?.spotData?.spotName}
                              price={
                                val?.spotData?.spotType === "Daily"
                                  ? val?.spotData?.dailyPrice
                                  : val?.spotData?.spotType === "Weekly"
                                  ? val?.spotData?.weeklyPrice
                                  : val?.spotData?.spotType === "Monthly"
                                  ? val?.spotData?.monthlyPrice
                                  : val?.spotData?.spotType === "Half Day"
                                  ? val?.spotData?.halfDayPrice
                                  : null
                              }
                            />
                          </Col>
                        </Row>
                      );
                    })
                  ) : (
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h1>No Spots</h1>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </div>
          </div>
          {upcomingData.length !== 0 ? <DataMap data={upcomingData} /> : null}
        </Wrapper>
      )}
    </>
  );
}

export const Wrapper = styled.div`
  background: #eff0f2;
  display: flex;
  // height: calc(100% - 114px);
  height: 100%;
  .reservation-header-div {
    width: 57%;
    overflow-y: scroll;
    padding-right: 20px;
  }
  h1 {
    padding-left: 20px;
  }
  .reservation-body {
    padding-left: 20px;
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
