import { Card } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import spotImage from "../../../assets/images/spot-image.svg";
import fire from "../../../config/config";
import { Wrapper } from "../Cards.styled";

export default function UpcomingCard() {
  const history = useHistory();
  const HostId = localStorage.getItem("USERID");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fire
      .firestore()
      .collection("reservation")
      .where("hostId", "==", HostId)
      .limit(1)
      .onSnapshot((query) => {
        if (query.empty) {
          setError("No Reservation Found");
          query.docs.forEach((data) => {
            setData([data.data()]);
          });
        } else {
          query.docs.forEach((data) => {
            setData([data.data()]);
          });
        }
      });
  }, []);
  return (
    <>
      <Wrapper>
        <Card className="profile-card-upcom" bordered={false}>
          <h1>UPCOMING RESERVATIONS</h1>

          {data.length === 0 ? (
            <h2 style={{ alignSelf: "center" }}>{error}</h2>
          ) : (
            data.map((val, key) => {
              return (
                <div className="main" key={key}>
                  <div className="image">
                    <img
                      style={{ borderRadius: 20 }}
                      src={val?.spotData?.firstImageUrl}
                      alt="Spot Image"
                    />
                  </div>
                  <div className="details">
                    {/* <h3>{val?.spotData?.spotName}</h3> */}
                    <div className="green-title">
                      <span className="description-title">
                        Spot Name:
                      </span><br></br>
                      {"\t" + val?.spotData?.spotName}
                    </div>

                    <div className="description-title">Starting&nbsp;On:</div>
                    <div className="date">
                      <div className="green-title">
                        {moment(val?.startDate, "MM-DD-YYYY, ddd hh:mm").format(
                          "MM-DD-YYYY, ddd hh:mm a"
                        )}
                      </div>
                    </div>

                    <div className="description-title">Leaving&nbsp;On:</div>

                    <div className="date">
                      <div className="green-title">
                        {moment(val?.endDate, "MM-DD-YYYY, ddd hh:mm").format(
                          "MM-DD-YYYY, ddd hh:mm a"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div className="switch" style={{ marginTop: 20, cursor: "pointer" }}>
            <button
              className="switchButton"
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/host/upcomingreservation")}
            >
              all reservations
            </button>
          </div>
        </Card>
      </Wrapper>
    </>
  );
}
