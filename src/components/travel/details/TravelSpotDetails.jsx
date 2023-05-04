import React, { useState, useEffect } from "react";
import styled from "styled-components";

import picture from "../../../assets/images/picture.png";
import miles from "../../../assets/icons/milesIcon.svg";
import { Modal, Rate } from "antd";
import ReviewCard from "./ReviewCard";
import { useHistory } from "react-router";
import fire from "../../../config/config";
import moment from "moment";
import { useLayoutEffect } from "react";
import "./TravelerDetailMobile.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function TravelSpotDetails(props) {
  const history = useHistory();
  const [spotData, setSpotData] = useState(null);
  const [active, setActive] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [smallScreen, setSmallScreen] = useState();
  const auth = localStorage.getItem("Auth Token");
  const userType = localStorage.getItem("User Type");
  // console.log("Visible", props.spotId);

  // useLayoutEffect(() => {
  //   function updateSize() {
  //     if (window.innerWidth < 999) {
  //       setSmallScreen(true);
  //     } else {
  //       setSmallScreen(false);
  //     }
  //   }
  //   window.addEventListener("resize", updateSize);
  //   updateSize();
  //   return () => window.removeEventListener("resize", updateSize);
  // }, []);

  useEffect(() => {
    let reviewsList = [];
    fire
      .firestore()
      .collection("reviews")
      .where("spotId", "==", props.spotId)
      .limit(2)
      .onSnapshot((query) => {
        if (query.empty) {
          query.docs.forEach((doc) => {
            reviewsList.push(doc.data());
          });
          setReviews([...reviewsList]);
          // console.log("Not Found any reviews");
        } else {
          query.docs.forEach((doc) => {
            reviewsList.push(doc.data());
          });
          setReviews([...reviewsList]);
        }
      });
    fire
      .firestore()
      .collection("spots")
      .where("spotId", "==", props.spotId)
      .onSnapshot((query) => {
        if (query.empty) {
          query.docs.forEach((doc) => {
            setSpotData(doc.data());
          });
        } else {
          query.docs.forEach((doc) => {
            setSpotData({
              spotName: doc.data().spotName,
              rating: doc.data().rating,
              spotType: doc.data().spotType,
              spotAddress: doc.data().spotAddress,
              noOfSpot: doc.data().noOfSpot,
              spotDescription: doc.data().spotDescription,
              halfDayPrice: parseInt(doc.data().halfDayPrice),
              dailyPrice: parseInt(doc.data().dailyPrice),
              weeklyPrice: parseInt(doc.data().weeklyPrice),
              monthlyPrice: parseInt(doc.data().monthlyPrice),
              startDate: doc.data().startDate,
              endDate: doc.data().endDate,
              cryptoCheck: doc.data().cryptoCheck,
              hostId: doc.data().hostId,
              status: doc.data().status,
              spotId: doc.data().docId,
              spotType: doc.data().type,
              rating: doc.data().rating,
              firstImageUrl: doc.data().firstImageUrl,
              secondImageUrl: doc.data().secondImageUrl,
              thirdImageUrl: doc.data().thirdImageUrl,
            });
          });
        }
      });
  }, [props.spotId]);

  return (
    props.visible && (
      <>
        <Wrapper maxheight={props.maxheight}>
          <div className="top">
            <div className="div-img">
              <img src={spotData?.secondImageUrl} alt="" />
            </div>
            <div
              style={{ position: "absolute", right: "0px", cursor: "pointer" }}
              onClick={() => {
                props.setVisible(false);
              }}
            >
              <CloseRoundedIcon />
            </div>
          </div>
          <div className="div-title">
          <div className="booking-title"><p>{spotData?.spotName}</p></div>
              <div className="rating">
                <Rate
                  disabled
                  defaultValue={spotData?.rating}
                  value={spotData?.rating}
                />
              </div>
              <div className="booking">
                <div className="rate">
                  {"$" + "" + props.price + "/" + "day"}
                </div>
                <button
                  className="book-btn"
                  onClick={() => props.onBooked(props.spotId, props.price)}
                >
                  BOOK NOW
                </button>
              </div>
            </div>

          <div className="middle">
            {/* <div className="div-date">
              <div style={{ flex: 1 }}>
                starting on
                <div className="date-time">
                  <div>
                    {moment(spotData?.startDate).format(
                      "MM-DD-YYYY, ddd hh:mm"
                    )}
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, paddingLeft: "10px" }}>
                leaving on
                <div className="date-time">
                  <div>
                    {moment(spotData?.endDate).format("MM-DD-YYYY, ddd hh:mm")}
                  </div>
                </div>
              </div>
            </div> */}
            <div className="availability">
              {props.spotType === "Half Day" ? (
                <>
                  <div>
                    AVAILABILITY FOR <label>02/17/2022</label>
                  </div>
                  <div className="main">
                    <div className={active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">2 PM</div>
                    </div>
                    <div className="divider"></div>
                    <div className={active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">3 PM</div>
                    </div>
                    <div className="divider"></div>
                    <div className={!active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">4 PM</div>
                    </div>
                    <div className="divider"></div>
                    <div className={!active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">5 PM</div>
                    </div>
                    <div className="divider"></div>
                    <div className={!active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">6 PM</div>
                    </div>
                    <div className="divider"></div>
                    <div className={!active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">7 PM</div>
                    </div>
                    <div className="divider"></div>
                    <div className={!active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">8 PM</div>
                    </div>
                    <div className="divider"></div>
                    <div className={!active ? "time-active" : "time"}>
                      <div className="square">
                        <div></div>
                        <div></div>
                      </div>
                      <div className="text">9 PM</div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="bottom">
            <div className="info">
              <div className="title">INFORMATION</div>
              <div className="des">
                REQUIRES DRIVER TO PARALLEL PARK. DIRECT MESSAGE ME IF YOU HAVE
                QUESTIONS. 3RD SPOT TO THE RIGHT.
              </div>
            </div>
            <div className="rev">
              <div className="title">REVIEWS</div>
              {reviews.map((val, key) => {
                return (
                  <ReviewCard
                    key={key}
                    image={val?.profileImageUrl}
                    user={val?.travelerName}
                    review={val?.comment}
                    rating={val?.rating}
                  />
                );
              })}
              {/* <div className='review-card'>
                        <ReviewCard user={"DREW O."} review={"Definitely will use this spot next time!"} />
                    </div> */}
            </div>
          </div>
          <div className="bottom-mobile">
            <div className="middle">
              <div className="div-date">
                <div style={{ flex: 1 }}>
                  starting on
                  <div className="date-time">
                    <div>
                      {moment(spotData?.startDate).format(
                        "MM-DD-YYYY, ddd hh:mm"
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  leaving on
                  <div className="date-time">
                    <div>
                      {moment(spotData?.endDate).format(
                        "MM-DD-YYYY, ddd hh:mm"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="availability">
                {props.spotType === "Half Day" ? (
                  <>
                    <div>
                      AVAILABILITY FOR <label>02/17/2022</label>
                    </div>
                    <div className="main">
                      <div className={active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">2 PM</div>
                      </div>
                      <div className="divider"></div>
                      <div className={active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">3 PM</div>
                      </div>
                      <div className="divider"></div>
                      <div className={!active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">4 PM</div>
                      </div>
                      <div className="divider"></div>
                      <div className={!active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">5 PM</div>
                      </div>
                      <div className="divider"></div>
                      <div className={!active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">6 PM</div>
                      </div>
                      <div className="divider"></div>
                      <div className={!active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">7 PM</div>
                      </div>
                      <div className="divider"></div>
                      <div className={!active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">8 PM</div>
                      </div>
                      <div className="divider"></div>
                      <div className={!active ? "time-active" : "time"}>
                        <div className="square">
                          <div></div>
                          <div></div>
                        </div>
                        <div className="text">9 PM</div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="bottom">
              <div className="info">
                <div className="title">INFORMATION</div>
                <div className="des">
                  REQUIRES DRIVER TO PARALLEL PARK. DIRECT MESSAGE ME IF YOU
                  HAVE QUESTIONS. 3RD SPOT TO THE RIGHT.
                </div>
              </div>
              <div className="rev">
                <div className="title">REVIEWS</div>
                {reviews.map((val, key) => {
                  return (
                    <ReviewCard
                      key={key}
                      image={val?.profileImageUrl}
                      user={val?.travelerName}
                      review={val?.comment}
                      rating={val?.rating}
                    />
                  );
                })}
                {/* <div className='review-card'>
                        <ReviewCard user={"DREW O."} review={"Definitely will use this spot next time!"} />
                    </div> */}
              </div>
            </div>
          </div>
        </Wrapper>
      </>
    )
  );
}

export default TravelSpotDetails;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  z-index: 1;

  background: white;
  width: 40%;
  margin: 20px;
  border-radius: 50px;
  padding: 20px;
  .booking-title {
    font-size: 1.5rem!important;
  
    p {
      margin: 0;
    }
  }

    .div-img {
      flex: 1;
      margin-top: 5%;
      img {
        width: 100%;
        height: 280px;
        object-fit: cover;
        border-radius: 30px;
      }
    }

    .div-title {
      margin-left: 10px;
      align-self: flex-end;
      font-size: 1.5rem;
      flex: 2;
      width: 100%;
      .title {
        font-size: 1.5rem!important;
      }
      .miles {
        display: flex;
        img {
          width: 10%;
        }
        div {
          padding-left: 5px;
        }
      }
      .rating {
        .ant-rate {
          color: #4d9d74;
          line-height: 10px;
          li {
            font-size: 15px;
            margin-right: 4px;
          }
        }
      }
      .booking {
        display: flex;
        flex-direction: column;
        // align-items: end;
        width: 100%;
        .rate {
          font-size: 1.4rem;
          font-weight: bold;
        }
        .book-btn {
          background: #4d9d74;
          padding: 4px 15px;
          border: none;
          border-radius: 20px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          margin-left: 5px;
        }
      }
    }
    .top {
      display: flex;
      position: relative;
    }
  .middle {
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
    font-size: 15px;
    .div-date {
      display: flex;
      width: 85%;
      .date-time {
        display: flex;
        justify-content: space-between;
        border-radius: 8px;
        padding: 3px 5px;
        text-align: center;
        background: #eff0f2;
        .time {
          color: #4d9d74;
        }
      }
    }
    .availability {
      .main {
        display: flex;
        flex-wrap: wrap;
        .divider {
          height: 25px;
          width: 1px;
          background-color: #707070;
          margin: 0px 8px;
        }
      }
      label {
        color: #4d9d74;
      }
      .time,
      .time-active {
        .square {
          display: flex;
          div {
            border-radius: 6px;
            height: 20px;
            width: 20px;
            border: 1px solid #707070;
            :nth-child(2) {
              margin-left: 5px;
            }
          }
        }
        .text {
          text-align: center;
          font-size: 10px;
        }
      }
      .time-active {
        .square {
          display: flex;
          div {
            background: #4d9d74;
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    .info {
      flex: 0.7;
      margin-right: 10px;
      .title {
        font-size: 1rem;
        color: #b5b4b4;
      }
      .des {
        font-size: 12px;
        line-height: 12px;
        color: #4d9d74;
      }
    }
    .rev {
      flex: 1;
      .title {
        font-size: 1rem;
        color: #b5b4b4;
      }
    }
  }
  .bottom-mobile {
    display: none;
  }
  @media screen and (max-width: 720px) {
    width: 100%;
    // max-height: ${(props) => (props.maxheight ? props.maxheight : "unset")};
    height: 100%;
    padding: 10px;
    margin: 0px;
    margin-bottom: 10px;
    position: initial;
    border-radius: 30px;

    .top {
      .div-img {
        img {
          width: 100% !important;
          height: 120px !important;
          min-width: 100px;
        }
      }
      .div-title {
        position: relative;
        .booking {
          position: absolute;
          right: 0;
          bottom: 0;
          .rate {
            font-size: 17px;
          }
          .book-btn {
            padding: 5px 15px;
            font-size: 10px;
          }
        }
        .miles img {
          width: 10%;
        }
        .rating .ant-rate {
          font-size: 14px;
          li {
            font-size: 13px;
            margin-right: 1px;
          }
        }
      }
    }
    .middle,
    .bottom {
      display: none;
    }
    .bottom-mobile {
      display: flex;

      .middle,
      .bottom {
        flex: 1;
        display: block;
      }

      .middle {
        .div-date {
          width: 95%;
          flex-direction: column;
          font-size: 11px;
          .date-time {
            justify-content: end;
          }
        }
      }
      .bottom {
        .info {
          .title {
            font-size: 10px;
          }
          .des {
            font-size: 10px;
            line-height: 10px;
          }
        }
      }
      .rev {
        .title {
          font-size: 10px;
        }
      }
    }
  }
`;
