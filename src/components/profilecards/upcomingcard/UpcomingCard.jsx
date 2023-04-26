import { Card } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
      <Wrapping>
        <Wrapper>
        <Card className="profile-card-upcom" bordered={false}>
          <h2>UPCOMING RESERVATIONS</h2>

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
                    <div className="details-title">
                      <p>Spot Name: <span>{"\t" + val?.spotData?.spotName}</span></p>
                    </div>
                    <div className="details-title">
                      <p>Starting&nbsp;On: <span>{moment(val?.startDate, "MM/DD/YYYY, ddd hh:mm").format("MM/DD/YYYY, ddd hh:mm a")}</span></p>
                    </div>
                      <div className="details-title">
                        <p>Ending&nbsp;On: <span>{moment(val?.endDate, "MM/DD/YYYY, ddd hh:mm").format("MM/DD/YYYY, ddd hh:mm a")}</span></p>
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
      </Wrapping>
    </>
  );
}

const Wrapping = styled.div`
  .details-title {
    text-transform: capitalize;
    color: #b5b4b4;

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

  .details {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
  }
`;
