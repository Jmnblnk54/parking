import React from "react";
import styled from "styled-components";
import { Carousel } from "antd";
import curve1 from "../../../assets/icons/curve1.svg";
import curve2 from "../../../assets/icons/curve2.svg";
import curve3 from "../../../assets/icons/curve3.svg";

import Group99 from "../../../assets/Group99.svg";
export default function Testimonial() {
  // const contentStyle = {
  //   height: "160px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#364d79",
  // };
  return (
    <Wrapper>
      <div className="container">
        <div className="user-card">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea co.png
          </p>
          <div className="overlay">
            <img className="blue-curve" src={curve1} />

            <img src={Group99} id="user-img" />
            <h1>John Smith</h1>
          </div>
        </div>
        <div className="user-card">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea co.png
          </p>
          <div className="overlay">
            <img className="blue-curve" src={curve1} />
            <img src={Group99} id="user-img" />
            <h1>Sarah anderson</h1>
          </div>
        </div>
        <div className="user-card">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea co.png
          </p>
          <div className="overlay">
            <img className="blue-curve last-curve" src={curve1} />

            <img src={Group99} id="user-img" />
            <h1>Paul green</h1>
          </div>
        </div>
      </div>
      <div className="container-mobile">
        <h2>WHAT HOSTS SAY</h2>
        <Carousel effect="scrollx">
          <div className="main">
            <div className="user-card">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea co.png
              </p>
              <div className="overlay">
                <img className="blue-curve" src={curve1} />

                <img src={Group99} id="user-img" />
                <h1>John Smith</h1>
              </div>
            </div>
          </div>
          <div className="main">
            <div className="user-card">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea co.png
              </p>
              <div className="overlay">
                <img className="blue-curve" src={curve2} />
                <img src={Group99} id="user-img" />
                <h1>Sarah anderson</h1>
              </div>
            </div>
          </div>
          <div className="main">
            <div className="user-card">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea co.png
              </p>
              <div className="overlay">
                <img className="blue-curve last-curve" src={curve3} />

                <img src={Group99} id="user-img" />
                <h1>Paul green</h1>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  height: 100%;
  padding: 40px 0px;
  background-color: rgba(208, 221, 214, 0.4);
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4%;
  margin-bottom: 4%;


  .container {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: 0px 40px;
  }

  .main {
    display: flex !important;
    justify-content: center;
  }
  .container-mobile {
    display: none;
  }
  .user-card {
    width: 280px !important;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 30px 30px 0px 0px;
    background-color: white;

    p {
      padding: 30px 30px 15px 30px;
      line-height: 18px;
    }
    .overlay {
      position: relative;
      z-index: 1;
      overflow: hidden;
      height: 130px;

      .blue-curve {
        z-index: 2;
        width: -webkit-fill-available;
        position: absolute;
        height: 150px;
        object-fit: cover;
        object-position: top;
        background-color: white;
      }
      .last-curve {
        transform: scaleX(-1);
      }
      /* div {
        z-index: 3;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%; */
      #user-img {
        width: 100%;
        height: 70px;
        position: absolute;
        z-index: 3;
      }
      /* } */
      h1 {
        position: absolute;
        color: #BBD0C6;
        font-size: 25px;
        top: 80px;
        z-index: 3;
        width: 100%;
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 930px) {
    display: block;
    .container {
      display: none;
    }
    .container-mobile {
      display: block;
      h2 {
        text-align: center;
      }
    }
    .ant-carousel {
      display: block;
      .slick-dots-bottom {
        bottom: -43px;
      }

      .slick-dots li {
        border-radius: 19px;
        background: black;
        height: 20px;
        width: 20px;
      }
    }
    .ant-carousel .slick-dots li.slick-active button {
      width: 14px;
      height: 14px;
      background: #fff;
      border-radius: 20px;
      margin-left: 3px;
      margin-top: 3px;
    }
  }
`;
