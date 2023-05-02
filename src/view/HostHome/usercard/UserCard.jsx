import React from "react";
import { Row, Col, Card } from "antd";
import styled from "styled-components";

import mobile from "../../../Assets1/mobileHand.svg";
import location from "../../../assets/icons/home/location.svg";
import money from "../../../assets/icons/money.svg";

import bar from "../../../assets/icons/bar.svg";

export default function UserCard() {
  return (
    <Wrapper>
      <Card className="user-card">
        <div className="text-responsive">
          <label>
            <img src={bar} className="bar" />u list.
          </label>
          <p>quickly list your parking spot FOR FREE</p>
        </div>
        <img width="270" id="location-icon" src={location} />
      </Card>
      <Card className="user-card">
        <div className="text-responsive text-responsive-center">
          <label>
            <img src={bar} className="bar" />u sit back.
          </label>
          <p>travelers book and secure their stay online</p>
        </div>
        <img width="200" id="mobile-icon" src={mobile} />
      </Card>
      <Card className="user-card">
        <div className="text-responsive">
          <label>
            <img src={bar} className="bar" />u earn.
          </label>
          <p>cash out whenever you want</p>
        </div>
        <img width="270" id="money-icon" src={money} />
      </Card>
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  padding: 40px 40px 90px 40px;
  max-width: 1800px;
  display: flex;
  align-items: center;
  margin: auto;
  width: 100%;
  justify-content: center;
  background-color: white;

  .user-card {
    background: #9c9fa9;
    width: 550px;
    height: 550px;
    margin-right: 2%;

    label {
      font-family: arciform;
      font-size: 50px;

      margin: 0;
      color: rgb(8,15,40);

      .bar {
        position: absolute;
        top: 50px;
        width: 23px;
      }
    }
    p {
      width: 80%;

      font-family: arciform;
      font-size: 20px;
      line-height: 22px;
      font-weight: semi-bold;

      color: white;
    }
  }
  #location-icon,
  #mobile-icon,
  #money-icon {
    position: absolute;
    right: -28px;
    bottom: -30px;
    width: 100%;
    max-width: 260px;
  }

  @media screen and (max-width: 930px) {
    flex-direction: column;
    height: fit-content;
    padding: 0px;
    .user-card {
      height: fit-content;
      margin: 0px;
      width: 100%;
      border: none;
      border-radius: 0;
      .ant-card-body {
        display: flex;
        justify-content: space-between;

        label {
          line-height: 50px;
          .bar {
            top: 30px;
            left: 25px;
            width: 22px;
          }
        }
        p {
          font-size: 17px;
          line-height: 20px;
          margin: 0;
        }
      }
    }
    .user-card .ant-card-body .text-responsive {
      width: 100%;
    }
    #location-icon,
    #money-icon {
      position: relative;
      right: 0;
      bottom: 0;
      max-width: 40%!important;
    }
    #mobile-icon {
      position: relative;
      right: 0;
      bottom: 0;
      max-width: 40%!important;
    }
  }
  @media screen and (max-width: 700px) {
    .ant-card-body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
