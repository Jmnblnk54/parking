import React from "react";
import { Row, Col, Card } from "antd";
import styled from "styled-components";

// import carHouse from "../../Assets1/carHouse.svg";
import house from "../../assets/icons/home/house.svg";

import car from "../../assets/icons/home/car.svg";
import location from "../../assets/icons/home/location.svg";
import logo from "../../assets/icons/logo-blue.svg";

import bar from "../../assets/icons/bar.svg";

export default function Info() {
  return (

      <InfoSection>
          <Card className="user-card">
            <div className="text-responsive">
              <label>
                <img src={bar} className="bar1" />u find.
              </label>
              <p>
                input your desired location to compare prices of YUGO spots in the
                area
              </p>
            </div>
            <img width="250" id="location-icon" src={location} />
          </Card>
          <Card className="user-card">
            <div className="text-responsive">
              <img className="top-image-center" src={logo} />
              <p>
                once you have paid and reserved your spot, you will recieve
                directions to go to your secured spot.
              </p>
            </div>
            <img width="270" id="car-icon" src={car} />
          </Card>
          <Card className="user-card">
            <div className="text-responsive">
              <label>
                <img src={bar} className="bar2" />u park.
              </label>
              <p>
                follow instructions from your host, park and you are all set to go!
              </p>
            </div>
            <img width="270" id="home-icon" src={house} />
          </Card>
      </InfoSection>
  );
}
export const InfoSection = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  padding: 4%;
  margin: auto;
  margin-top: 2%;
  margin-bottom: 2%;

  .user-card {
    background-color: rgba(77, 157, 116, 0.4);
    width: 569px;
    height: 486px;
    margin-right: 35.33px;

    label {
      font-family: arciform;
      font-size: 50px;

      margin: 0;
      color: #1b233c;
      .bar1,
      .bar2 {
        position: absolute;
        width: 23px;
        top: 50px;
      }
    }
    p {
      width: 80%;

      font-family: arciform;
      font-size: 20px;
      line-height: 22px;
      font-weight: semi-bold;

      color: black;
    }
    .top-image-center {
      width: 110px;
      margin-top: 20px;
      margin-bottom: 15px;
    }
    #location-icon,
    #car-icon,
    #home-icon {
      position: absolute;
      width: 405px;
      right: -58px;
      bottom: -68px;
    }
  }

  .user-card:last-child{
    margin-right: 0px!important;
  }

  @media screen and (max-width: 930px) {
    flex-direction: column;
    height: fit-content;
    padding: 0px;
    .user-card {
      height: fit-content;
      margin: 0px;
      width: 100%;
      background-color: #ecf1ef;
      border: none;
      border-radius: 0;
      .ant-card-body {
        display: flex;
        justify-content: space-between;
        .text-responsive {
          width: 100%;
        }
        label {
          line-height: 50px;
          .bar1,
          .bar2 {
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
        .top-image-center {
          width: 100px;
          margin-top: 0px;
          margin-bottom: 10px;
        }
      }
    }

    #location-icon,
    #car-icon,
    #home-icon {
      position: relative !important;
      right: 0 !important;
      bottom: 0 !important    ;
      width: 150px;
    }
  }
`;
