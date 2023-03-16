import { Card } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
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
      <Wrapper>
        <Card
          className="profile-card-upcom"
          bordered={false}
          style={{ minHeight: "322px" }}
        >
          <h1>UPCOMING TRIPS</h1>
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
                    {/* <h3>{val?.spotData.spotName}</h3> */}
                    <div className="green-title">
                      {"Spot Name:" + "\t" + val?.spotData.spotName}
                    </div>

                    <div>Starting&nbsp;On</div>
                    <div className="date">
                      <div>
                        {moment(val?.startDate, "MM-DD-YYYY, ddd hh:mm")
                          .format("MM-DD-YYYY, ddd hh:mm a")
                          .toString()}
                      </div>
                    </div>

                    <div>Leaving&nbsp;On</div>
                    <div className="date">
                      <div>
                        {moment(val?.endDate, "MM-DD-YYYY, ddd hh:mm")
                          .format("MM-DD-YYYY, ddd hh:mm a")
                          .toString()}
                      </div>
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
    </>
  );
}
