import {
  ArrowLeftOutlined,
  LoadingOutlined,
  LockFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { CometChat } from "@cometchat-pro/chat";

import { Col, message, Modal, Popconfirm, Rate, Row, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { COMETCHAT_CONSTANTS } from "../../config/comet-config.js";
import fire from "../../config/config";
import "./ReviewModal.css";

const antIcon = (
  <LoadingOutlined
    style={{
      color: "white",
    }}
    spin
  />
);

export default function TripCard(props) {
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewValue, setReviewValue] = useState("");
  const [ratingValue, setRatingValue] = useState(2.5);
  const [loading, setLoading] = useState(false);

  const handleMessages = (hostId) => {
    const id = hostId;
    var appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .build();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
      () => {
        if (CometChat.setSource) {
          CometChat.setSource("ui-kit", "web", "reactjs");
          CometChat.login(id, COMETCHAT_CONSTANTS?.AUTH_KEY)
            .then((user) => {
              console.log("Login User", user);
              history.push({
                pathname: "/traveler/messages",
                state: {
                  travelerID: id,
                },
              });
            })
            .catch((error) => {
              if (error.code === "ERR_UID_NOT_FOUND") {
                console.log("Error", error.code);
                const uid = id;
                // console.log("UID", uid)
                let name = props.data.travelerUser.firstName;
                let image = props.data.travelerUser.firstImageUrl;
                var user = new CometChat.User(uid);
                user.setName(name);
                if (image) {
                  user.setAvatar(image);
                }
                CometChat.createUser(user, COMETCHAT_CONSTANTS?.AUTH_KEY).then(
                  (user) => {
                    CometChat.login(id, COMETCHAT_CONSTANTS?.AUTH_KEY).then(
                      (user_) => {
                        console.log("LOGIN Host", user_);

                        history.push("/traveler/messages", {
                          travelerID: id,
                        });
                      }
                    );
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
        console.log(error);
      }
    );
  };

  const DeclineByTraveler = (
    id,
    travelerEmail,
    hostEmail,
    startDate,
    endDate
  ) => {
    setDisable(false);
    // console.log(id, travelerEmail, hostEmail, startDate, endDate);
    const cancelReservationByTraveler = fire
      .functions()
      .httpsCallable("cancelReservationByTraveler");
    message.loading("In Progress");
    const resp = cancelReservationByTraveler({
      reservationId: id,
      travelerEmail: travelerEmail,
      hostEmail: hostEmail,
      startDate: startDate,
      endDate: endDate,
    }).then(() => {
      message.success("Reservation Successfully Cancelled");
    });
  };

  const handleStartTrip = () => {
    fire
      .firestore()
      .collection("reservation")
      .doc(props.data.docId)
      .update({
        status: "in progress",
      })
      .then((e) => {
        history.push("/traveler/tripstart", {
          spotData: props.data.spotData,
        });
      })
      .catch((e) => console.log(e));
  };

  const toggleReview = () => {
    setReviewModal(!reviewModal);
  };
  React.useEffect(() => {
    const reservationRef = fire
      .firestore()
      .collection("reservation")
      .doc(props.data?.docId);

    reservationRef
      .get()
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
  }, []);

  const handleReviewSubmit = () => {
    setLoading(true);
    if (reviewValue.split(" ").length < 8) {
      setLoading(false);
      message.error("Write atleast 10 words");
    } else {
      const reservationRef = fire
        .firestore()
        .collection("reservation")
        .doc(props.data?.docId);

      fire
        .firestore()
        .collection("reviews")
        .add({
          comment: reviewValue,
          rating: ratingValue,
          spotId: props.data?.spotData?.spotId,
          travelerId: props.data?.travelerUser?.userId,
          travelerName: props.data?.travelerUser?.firstName,
          profileImageUrl: props.data?.travelerUser?.profileImageUrl,
        })
        .then((e) => {
          reservationRef
            .update({
              review: true,
            })
            .catch((e) => console.log(e));
          setLoading(false);
          message.success("Submitted successfully");
          setReviewModal(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  };

  return (
    <>
      <Wrapper>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="spot-card-container">
              <div className="left">
                <div className="spot-image">
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "20px",
                      border: "1px solid #4d9d74",
                      objectFit: "cover",
                    }}
                    src={props?.data?.spotData?.thirdImageUrl}
                    alt="spotImage.svg"
                  />
                </div>

                <div className="center-details">
                  {/* <h3>
                    {"Spot Name:" + "\t" + props.data?.spotData?.spotName}
                  </h3> */}
                  <div className="miles">
                    {"Spot Name:" + "\t" + props.data?.spotData?.spotName}
                  </div>
                  <Row gutter={[25, 25]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                      <div>Starting&nbsp;On</div>
                      <div className="date">
                        <div>
                          {moment(
                            props.data?.startDate,
                            "MM-DD-YYYY, ddd hh:mm"
                          )
                            .format("MM-DD-YYYY, ddd hh:mm a")
                            .toString()}
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                      <div>Leaving&nbsp;On</div>
                      <Row>
                        <div tyle={{ marginLeft: "30px" }} className="date">
                          <div>
                            {moment(
                              props.data?.endDate,
                              "MM-DD-YYYY, ddd hh:mm"
                            )
                              .format("MM-DD-YYYY, ddd hh:mm a")
                              .toString()}
                          </div>
                        </div>
                      </Row>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            color:
                              props.data?.status.toUpperCase() === "PENDING"
                                ? "red"
                                : "green",
                          }}
                        >
                          {"Status" + "\t" + props.data?.status.toUpperCase()}
                        </div>
                        {/* <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log("Print");
                          }}
                        >
                          <FileOutlined color="#4d9d74" />
                        </div> */}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="right-details">
                <div className="contact-div">
                  <button
                    className="contact-traveller-button"
                    disabled={props.data?.status === "pending" ? true : false}
                    onClick={() => handleMessages(props.data.hostId)}
                  >
                    {props.data?.status === "pending" ? (
                      <LockFilled className="locked-filled" />
                    ) : null}
                    Contact Host
                  </button>
                </div>
                <div className="buttons">
                  {props.data?.status != "finished" ? (
                    <button
                      className={
                        props.data?.tripStarted == false
                          ? "book-now-button book-now-button-disabled"
                          : "book-now-button"
                      }
                      disabled={props.data?.tripStarted == false}
                      onClick={
                        props.data?.tripStarted == true ? handleStartTrip : null
                      }
                    >
                      START TRIP
                    </button>
                  ) : props.data?.review == false ? (
                    <button
                      className={"book-now-button"}
                      onClick={toggleReview}
                    >
                      Give Review
                    </button>
                  ) : (
                    <h3>Trip closed</h3>
                  )}
                  {props.data?.status != "finished" ? (
                    <Popconfirm
                      title="You want to cancel the reservation ?"
                      icon={<QuestionCircleFilled style={{ color: "red" }} />}
                      onConfirm={() =>
                        DeclineByTraveler(
                          props.data.docId,
                          props.data?.travelerUser.email,
                          props.data?.hostEmail,
                          props.data?.startDate,
                          props.data?.endDate
                        )
                      }
                      visible={disable}
                      onCancel={() => setDisable(false)}
                    >
                      <button
                        className="book-now-button-decline"
                        onClick={() => setDisable(true)}
                      >
                        {"Cancel".toUpperCase()}
                      </button>
                    </Popconfirm>
                  ) : null}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          className="review-modal"
          visible={reviewModal}
          closable={false}
          footer={false}
        >
          <div className="top">
            <ArrowLeftOutlined onClick={toggleReview} />
            <h2>Review your trip</h2>
          </div>
          <div className="middle">
            <div className="divider" />

            <h2>
              How would you rate your experience of{" "}
              {props.data?.spotData?.spotName}?
            </h2>
            <Rate
              allowHalf
              value={ratingValue}
              onChange={(e) => setRatingValue(e)}
            />
            <TextArea
              name="review"
              placeholder="Your Review"
              value={reviewValue}
              onChange={(e) => {
                setReviewValue(e.target.value);
              }}
              type="text"
              className="review-modal-input"
              showCount
              maxLength={500}
            />
            <div className="divider" />

            <div className="bottom">
              <button
                className="modal-button"
                disabled={loading}
                onClick={handleReviewSubmit}
              >
                {loading ? <Spin indicator={antIcon} /> : "Submit"}
              </button>
              {/* )} */}
            </div>
          </div>
        </Modal>
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
  .left {
    display: flex;
    align-items: center;
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
      width: 165px;
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
    height: 100%;
  }

  .buttons {
    display: flex;
    align-items: end;
    margin-top: 60px;
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
    padding: 6px 10px;
    border: none;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    margin-top: 50px;
    white-space: nowrap;
  }
  .book-now-button-disabled {
    background: #c7c7c7;
    cursor: no-drop;
    :hover {
      background: #c7c7c7 !important;
    }
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
    margin-top: 50px;
  }
  .contact-traveller-button {
    color: #4d9d74;
    padding: 6px 20px;
    border: 1px solid #4d9d74;
    border-radius: 20px;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    width: 130px;
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
  @media screen and (max-width: 1000px) {
    .spot-card-container {
      width: 100%;
      display: flex;
      height: 100%;
      flex-direction: column;
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
      padding: 6px 13px;
      font-size: 9px;
    }
    .buttons {
      margin: 0px;
      margin-left: 15px;
    }
    .book-now-button,
    .book-now-button-decline {
      margin-top: 7px;
    }
    .center-details .date {
      width: 100%;
    }
  }
`;
