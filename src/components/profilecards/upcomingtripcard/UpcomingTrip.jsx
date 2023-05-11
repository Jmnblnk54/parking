import { Card } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import fire from "../../../config/config";
import { Wrapper } from "../Cards.styled";

export default function UpcomingTrip() {
  const history = useHistory();
  const [reservationData, setReservationData] = useState([]);
  const userId = localStorage.getItem("USERID");
  const [error, setError] = useState("");

  useEffect(() => {
    fire
      .firestore()
      .collection("reservation")
      .where("travelerId", "==", userId)
      .limit(1)
      .onSnapshot((query) => {
        if (query.empty) {
          setError("No Upcoming Reservation Available");
          query.docs.forEach((data) => {
            setReservationData([data.data()]);
          });
        } else {
          query.docs.forEach((data) => {
            setReservationData([data.data()]);
          });
        }
      });
  }, []);

  return (
    <>
    <Wrapping>
      <Wrapper>
        <Card
          className="profile-card-upcom"
          bordered={false}>
          <h2>UPCOMING TRIPS</h2>
          {reservationData.length === 0 ? (
            <h2 style={{ alignSelf: "center" }}>{error}</h2>
          ) : (
            reservationData.map((val, key) => {
              return (
                <div className="main" key={key}>
                  <div className="image">
                    <img
                      style={{ borderRadius: 20 }}
                      src={val?.spotData.firstImageUrl}
                      alt="Spot Image"
                    />
                  </div>
                  <div className="details">
                    
                    <div className="details-title">
                      <p>Spot Name: <span>{"\t" + val?.spotData.spotName}</span></p>
                    </div>

                    <div className="details-title">
                      <p>Starting&nbsp;On: <span>{moment(val?.startDate, "MM/DD/YYYY, ddd hh:mm").format("MM/DD/YYYY, ddd hh:mm a").toString()}</span></p>
                    </div>

                    <div className="details-title">
                      <p>Leaving&nbsp;On: <span>{moment(val?.endDate, "MM/DD/YYYY, ddd hh:mm").format("MM/DD/YYYY, ddd hh:mm a").toString()}</span></p>
                    </div>

                  </div>
                </div>
              );
            })
          )}
          <div className="switch" style={{ marginTop: 20 }}>
            <button
              style={{ cursor: "pointer" }}
              className="switchButton"
              onClick={() => history.push("/traveler/trips")}
            >
              all trips
            </button>
          </div>
        </Card>
      </Wrapper>
      </Wrapping>
    </>
  );
}

const Wrapping = styled.div`
  .details-title {
    text-transform: capitalize;
    color: #b5b4b4;
    .switchButton {
      font-size: 1rem;
    }
    span {
      color: #4d9d74;
      font-weight: bold;
    }

    p {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      line-height: 19px;
    }
  }

  h2 {
    font-size: 1.5rem;
  }

  .details {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
  }
`;