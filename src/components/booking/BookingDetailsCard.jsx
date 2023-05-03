import React from "react";
import styled from "styled-components";

import { InfoCircleFilled } from "@ant-design/icons";
import { Rate, Tooltip } from "antd";
import moment from "moment";

function BookingDetailsCard(props) {
  return (
    <Wrapper className="main">
      <div className="top">
        <div className="div-img">
          <img src={props.data?.firstImageUrl} alt="" />
        </div>
      </div>
      <div className="div-title">
          <div className="spot-name-title">{props.data.spotName}</div>
          <div className="rating">
            <Rate disabled defaultValue={3} value={props.data.rating} />
          </div>
        </div>
      <div className="middle">
        <div className="div-date">
          {/* <div style={{ flex: 1 }}>
            Opening Hours
            <div className="date-time">
              <div className="time">09:00AM </div>
              <div className="time">10:00 PM</div>
            </div>
          </div> */}
          <div className="div-date-main">
            STARTING ON
            <div
              className="date-time"
              style={{
                padding: "3px 0px",
              }}
            >
              <div className="time">
                {moment(props.startDate, "MM-DD-YYYY, ddd hh:mm").format(
                  "MM-DD-YYYY, ddd hh:mm a"
                )}
              </div>
              {/* <div className="time">09:00 AM</div> */}
            </div>
          </div>
          <div className="div-date-main">
            LEAVING ON
            <div
              className="date-time"
              style={{
                padding: "3px 0px",
              }}
            >
              <div className="time">
                {moment(props.endDate, "MM-DD-YYYY, ddd hh:mm").format(
                  "MM-DD-YYYY, ddd hh:mm a"
                )}
              </div>
              {/* <div className="time">09:00 PM</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="duration">
          <div className="title">TOTAL DURATION</div>
          <div className="text">{props.spotType}</div>
          <div className="text">
            Reserved until{" "}
            {moment(props.endDate, "MM-DD-YYYY, ddd hh:mm").format("hh:mm a")}
          </div>
          {/* <div className="text">{"Number of Days" + "\t" + props?.days}</div> */}
        </div>
        <div className="total-price">
          <div className="text">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Service Fees of Spot Booking">
                <InfoCircleFilled style={{ paddingRight: "10px" }} />
              </Tooltip>
              <div>Service Fee:</div>
            </div>
            <div>Total Price:</div>
          </div>
          <div className="price">
            <div>{"$" + "\t" + parseFloat(props.serviceFees).toFixed(2)}</div>
            <div>{"$" + "\t" + parseFloat(props.totalPrice).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default BookingDetailsCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 40%;
  height: 100%;
  margin: 20px;
  border-radius: 35px;
  padding: 20px;
  background: white;

  .spot-name-title {
    font-size: 1.5rem;
  }

  .payNow {
    width: 80%;
    margin-top: 10px;
    border-radius: 20px;
    height: 30px;
    background-color: #4d9d74;
    border: 1px solid white;
    color: white;
  }
  .top {
    display: flex;
    .div-img,
    .div-title {
      flex: 1;
    }
    .div-img {
      width: 100%;
      // padding: 10px;
      img {
        object-fit: cover;
        width: 100%;
        height: 300px;
        border-radius: 20px;
      }
    }
    .div-title {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-size: 22px;
      }
      .rating {
        margin-top: -10px;
        .ant-rate {
          color: #4d9d74;
          li {
            font-size: 1rem;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    padding: 15px 0px;
    font-size: 1rem;
    .div-date {
      display: flex;
      width: 85%;
      .div-date-main {
        flex: 1;
        padding-left: 10px;
      }

      .date-time {
        display: flex;
        justify-content: space-between;
        border-radius: 8px;
        padding: 3px 5px !important;
        text-align: center;
        background: #eff0f2;
        .time {
          color: #4d9d74;
        }
      }
    }
  }
  .bottom {
    padding-top: 10px;
    .duration {
      .title {
        font-size: 1rem;
      }
      .text {
        font-size: 1rem;
        line-height: 14px;
        color: #4d9d74;
      }
    }
    .total-price {
      display: inline-flex;
      float: right;

      background: #d5eadf;
      padding: 10px 10px;
      border-radius: 17px;

      line-height: 30px;
      font-size: 1.375rem;

      .text {
        text-align: right;
        padding-right: 10px;
      }
      .price {
        color: #4d9d74;
      }
    }
  }
  @media screen and (max-width: 999px) {
    width: 95%;
    align-self: center;
    .div-date {
      flex-direction: column;
      width: 100% !important;
      .div-date-main {
        padding-top: 10px;
        padding-left: 0px !important;
      }
    }
  }
`;
