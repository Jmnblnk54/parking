import { LockFilled } from "@ant-design/icons";
import { CometChat } from "@cometchat-pro/chat";
import { Button, Col, message, notification, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import spotImage from "../../assets/images/spot-image.svg";
import { COMETCHAT_CONSTANTS } from "../../config/comet-config.js";

export default function ReservationCard(props) {
  const stripeId = localStorage.getItem("StripeId");

  const [disable, setDisable] = useState(true);
  const history = useHistory();
  const handleMessages = (travelerId) => {
    console.log(travelerId);
    // const id = "5DPMW50rQDcYIuEXevgofGRFSFw2";
    var appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .build();

    CometChat.init(COMETCHAT_CONSTANTS?.APP_ID, appSetting).then(
      () => {
        if (CometChat.setSource) {
          CometChat.setSource("ui-kit", "web", "reactjs");
          // console.log("INITIALIZE USER", id)

          CometChat.login(travelerId, COMETCHAT_CONSTANTS?.AUTH_KEY)
            .then((user) => {
              history.push({
                pathname: "/host/messages",
                state: {
                  travelerID: travelerId,
                },
              });
            })
            .catch((error) => {
              if (error.code === "ERR_UID_NOT_FOUND") {
                console.log("Error", error.code);
                const uid = travelerId;
                // console.log("UID", uid)
                let name = "Traveler";
                let image = props.data?.travelerUser.firstImageUrl;
                var user = new CometChat.User(uid);
                user.setName(name);
                if (image) {
                  user.setAvatar(image);
                }
                CometChat.createUser(user, COMETCHAT_CONSTANTS?.AUTH_KEY).then(
                  (user) => {
                    CometChat.login(
                      travelerId,
                      COMETCHAT_CONSTANTS?.AUTH_KEY
                    ).then((user_) => {
                      console.log("LOGIN", user_);

                      history.push("/host/messages", {
                        travelerID: travelerId,
                      });
                    });
                  },
                  (error) => {
                    console.log("ERROR", error);
                  }
                );
              }
            });
        }
      },
      (error) => {
        console.log("Error", error);
      }
    );
  };

  return (
    <>
      <Wrapper>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="spot-card-container">
              <div className="spot-image">
                <img
                  style={{
                    height: "130px",
                    width: "130px",
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                  src={props?.data?.spotData?.firstImageUrl}
                  alt="spotImage.svg"
                />
              </div>

              <div className="center-details">
                {/* <h3>{props?.data?.spotData.spotName}</h3> */}
                <div className="contact-div">
                  <button
                    className="contact-traveller-button"
                    disabled={props.data?.status === "Approved" ? false : true}
                    onClick={() => handleMessages(props.data?.travelerId)}
                  >
                    {props.data?.status === "Approved" ? null : (
                      <LockFilled className="locked-filled" />
                    )}
                    Contact traveler
                  </button>
                </div>
                <div className="miles">
                  {"Traveler Name:" +
                    "\t" +
                    props?.data?.travelerUser.firstName}
                </div>
                <Row gutter={(12, 12)}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <div>Starting&nbsp;On</div>
                    <div className="date">
                      <div>
                        {moment(
                          props.data?.startDate,
                          "MM-DD-YYYY, ddd hh:mm a"
                        )
                          .format("MM-DD-YYYY, ddd hh:mm a")
                          .toString()}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <div>Leaving&nbsp;On</div>
                    <div className="date">
                      <div>
                        {moment(props.data?.endDate, "MM-DD-YYYY, ddd hh:mm a")
                          .format("MM-DD-YYYY, ddd hh:mm a")
                          .toString()}
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="buttons">
                  {props.data?.status === "pending" ? (
                    <button
                      className="book-now-button"
                      onClick={() => {
                        if (stripeId === "null") {
                          const key = "StripeError";
                          notification["error"]({
                            key,
                            message: "Error accepting trip",
                            description:
                              "You need to add payment method first by going to your profile",
                            duration: 0,
                            placement: "bottomLeft",
                            btn: (
                              <Button
                                type="primary"
                                size="small"
                                style={{
                                  background: "#4d9d74",
                                  padding: "6px 20px",
                                  border: "none",
                                  borderRadius: "20px",
                                  color: "#fff",
                                  fontSize: "14px",
                                  cursor: "pointer",
                                  marginLeft: "5px",
                                  lineHeight: "10px",
                                }}
                                onClick={() => {
                                  notification.close(key);
                                  history.push("/host/profile");
                                }}
                              >
                                Go to profile
                              </Button>
                            ),
                          });
                        } else {
                          props.acceptReservation(props?.data);
                        }
                      }}
                    >
                      {"accept".toUpperCase()}
                    </button>
                  ) : null}
                  <button
                    className="book-now-button-decline"
                    onClick={() =>
                      props.declineReservation(
                        props.data?.docId,
                        props.data?.hostEmail,
                        props.data?.travelerUser.email,
                        props.data?.startDate,
                        props.data?.endDate
                      )
                    }
                  >
                    {"Cancel".toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  margin-bottom: 10px;
  h1 {
    margin-top: 40px;
  }
  .spot-card-container {
    background: #fff;
    border-radius: 15px;
    /* width: 680px;
    height: 200px; */
    height: 100%;
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ant-rate {
    color: #4d9d74;
    font-size: 12px;
    li {
      margin-right: 4px;
    }
  }

  .center-details {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    .contact-div {
      justify-content: flex-end;
      width: 100%;
      align-self: flex-end;
      display: flex;
      margin-bottom: 10px;
    }

    h3 {
      margin: 0px;
      font-weight: bold;
    }
    .date {
      border-radius: 5px;
      background: #eff0f2;
      display: flex;
      flex-direction: row;
      padding: 6px;
      max-width: 170px;
    }
    .miles {
      margin-top: -3px;
      font-weight: bold;
      color: #4d9d74;
    }
  }

  .right-details {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
    height: 100%;
  }

  .buttons {
    display: flex;
    align-items: end;
    width: 100%;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .amount {
    font-size: 22px;
    font-weight: bold;
  }

  .details-button {
    text-decoration: underline;
  }

  .book-now-button {
    background: #4d9d74;
    padding: 6px 20px;
    border: none;
    border-radius: 20px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 5px;
  }
  .book-now-button-decline {
    background: #9d534d;
    padding: 6px 20px;
    border: none;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
  }
  .contact-traveller-button {
    width: 150px;
    color: #4d9d74;
    padding: 6px 10px;
    border: 1px solid #4d9d74;
    border-radius: 20px;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    :disabled {
      background: lightgray;
      cursor: unset;
    }
  }
  .book-now-button:hover {
    background: #6db992;
  }
  .locked-filled {
    font-size: 16px;
    padding-right: 10px;
  }
  @media screen and (max-width: 999px) {
    .spot-card-container {
      width: 100%;

      height: 100%;
    }
    .spot-image {
      img {
        height: 139px;
      }
    }
    .spot-image {
      font-size: 10px;
    }
    .right-details {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    .right-details {
      width: 100%;
      height: 100%;
    }
    .contact-traveller-button {
      padding: 4px 8px;

      font-size: 12px;
      width: 130px;
    }
    .locked-filled {
      font-size: 12px;
      padding-right: 5px;
    }
    .book-now-button,
    .book-now-button-decline {
      margin-top: 7px;
      padding: 4px 10px;
      font-size: 1rem;
    }
    .center-details {
      font-size: 12px;
    }
    .center-details .date {
      width: 100%;
    }
  }
`;
