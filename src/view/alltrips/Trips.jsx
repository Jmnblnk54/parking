import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import TripCard from "../../components/tripCard/TripCard";

import styled from "styled-components";
import Navbar from "../../components/common/navbar/Navbar";
import Map from "../../components/map/Map";
import fire from "../../config/config";
import DataMap from "../../components/map/DataMap";

export default function Trips() {
  const [upcomingData, setUpcomingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("USERID");

  useEffect(() => {
    fire
      .firestore()
      .collection("reservation")
      .where("travelerId", "==", userId)
      .limit(25)
      .onSnapshot((query) => {
        const db = [];
        setLoading(true);
        if (query.size === 0) {
          query.docs.forEach((doc) => {
            setLoading(true);
            db.push(doc.data());
          });
          setUpcomingData([...db]);
        } else {
          query.docs.forEach((doc) => {
            setLoading(true);
            db.push(doc.data());
          });
          setUpcomingData([...db]);
        }
      });
  }, [userId]);

  return (
    loading && (
      <>
        <Navbar />
        <Wrapper>
          <div className="reservation-header-div">
            <div className="header-div">
              <h1 style={{ paddingTop: "20px" }}>&nbsp;UPCOMING TRIPS</h1>
            </div>
            <div className="reservation-body">
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  {upcomingData.length !== 0 ? (
                    upcomingData.map((val, index) => {
                      return (
                        <Row key={index}>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <TripCard data={val} />
                          </Col>
                        </Row>
                      );
                    })
                  ) : (
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h1>No Upcoming Reservations Found</h1>
                      </Col>
                    </Row>
                  )}
                  {/* <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <ReservationCard />
                  </Col>
                </Row> */}
                </Col>
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
  height: calc(100% - 114.25px);
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

  @media screen and (max-width: 999px) {
    height: calc(100% - 77.14px);
  }
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    .reservation-header-div {
      width: 100%;
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
