import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Bounce } from "react-activity";
// import map from "../../Assets1/map.png";
import styled from "styled-components";
import Navbar from "../../components/common/navbar/Navbar";
import DataMap from "../../components/map/DataMap";
import Map from "../../components/map/Map";
import MySpotCard from "../../components/MySpotCard/myspotcard";
import fire from "../../config/config";

export default function MySpots() {
  const [loader, setLoader] = React.useState(true);
  const [noData, setNoData] = React.useState(false);
  const [upcomingData, setUpcomingData] = useState([]);

  const userId = localStorage.getItem("USERID");
  useEffect(() => {
    getData();
  }, []);

  const getUpdatedData = () => {
    setLoader(true);
    getData();
  };

  const getData = () => {
    fire
      .firestore()
      .collection("spots")
      .where("hostId", "==", userId)
      .onSnapshot((query) => {
        const db = [];
        if (query.size === 0) {
          setNoData(true);
          setLoader(false);
        } else {
          query.docs.forEach((doc) => {
            db.push(doc.data());
            setLoader(false);
          });
          setUpcomingData([...db]);
        }
      });
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        {loader ? (
          <div
            style={{
              top: "50%",
              left: "50%",
              marginTop: "10px",
              top: "50%",
              left: "50%",
              marginTop: "10px",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Bounce size={30} color={"#4d9d74"} />
          </div>
        ) : (
          <>
            <div className="reservation-header-div">
              <div className="header-div">
                <h1 style={{ paddingTop: "20px" }}>&nbsp;MY SPOTS</h1>
              </div>
              <div className="reservation-body">
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {noData ? (
                      <h1>No Data Found</h1>
                    ) : (
                      <div className="map-box">
                        {upcomingData?.map((item, key) => {
                          return (
                            <MySpotCard
                              data={item}
                              getUpdatedData={getUpdatedData}
                            />
                          );
                        })}
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
            {noData ? <h1>No Data Found</h1> : <DataMap data={upcomingData} />}
          </>
        )}
      </Wrapper>
    </>
  );
}

export const Wrapper = styled.div`
  background: #eff0f2;
  display: flex;
  height: calc(100% - 114px);
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
