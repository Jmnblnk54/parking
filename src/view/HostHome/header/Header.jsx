import React from "react";
import { Row, Col, Button } from "antd";
import styled from "styled-components";

import Group3 from "../../../Assets1/Group3.svg";
import circle from "../../../assets/circle.png";

import { useHistory } from "react-router";

import background2 from "../../../assets/images/background2.png";

export default function Header() {
  const history = useHistory();
  const type = localStorage.getItem("User Type");
  return (
    <Wrapper>
      <div className="bg-opacity">
        <Row style={{ height: "100%" }} align="middle">
          <Col lg={10} xl={12} md={12} sm={24} xs={24} flex>
            <h1>HOST WITH YUGO.</h1>
            <h2 id="share-space">
              SHARE YOUR SPACE.
              <br />
              BE YOUR OWN BOSS.
            </h2>
            <Row>
              <Col lg={24} xl={24} sm={24} md={12} xs={24}>
                <div className="side-header-text">
                  <h2 className="host-sub-title-text">
                    <img src={circle} width={"12px"} alt="" />
                    &nbsp;Flexible schedule
                  </h2>

                  <p className="host-sub-title-text">list your space whenever you want.</p>

                  <h2 className="host-sub-title-text">
                    <img src={circle} width={"12px"} alt="" />
                    &nbsp;Get paid how you want, when you want
                  </h2>

                  <p className="host-sub-title-text">
                    cash out whenever you want or keep your balance in your YUGO
                    WALLET.{" "}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              {/* <Col lg={1}></Col> */}
              <Col lg={24}>
                <Button
                  onClick={() =>
                    type === null
                      ? history.push("/host/Login")
                      : history.push("/host/listing")
                  }
                >
                  LIST YOUR SPOT NOW
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={14} xl={12} md={12} sm={24} xs={24}>
            <img className="right-img" src={Group3} width={"100%"} alt="" />
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 30px;
  height: fit-content;
  min-height: calc(100vh - 111px);
  width: 100%;
  max-width: 1800px;
  margin: auto;
  justify-content: center;
  display: flex;

  h1 {
    font-family: arciform;
    color: rgb(8,15,40);
  }
  #share-space {
    line-height: 60px;
    font-size: 70px;
    color: rgb(8,15,40);
  }
  .ant-btn {
    background-color: #080f28 !important;
    border-radius: 15px !important;
    height: 40px !important;
    color: white !important;
    margin-top: 5px;
    display: flex;
    align-items: center;
  }

  .side-header-text {
    margin-top: 5px;
    line-height: 1;
  }
  .bg-opacity {
    width: 100%;
    padding: 2%;
  }
  button span {
    font-size: 1rem;
  }
  .host-sub-title-text {
    color: rgb(8,15,40)!important;
  }
  @media screen and (max-width: 720px) {
    margin: 0px;
    height: fit-content;
    min-height: auto;

    background-image: url("${background2}");

    background-size: cover;
    background-repeat: no-repeat;

    .bg-opacity {
      padding: 20px 30px;
      background-color: rgba(255, 255, 255, 0.7);
    }

    h1 {
      margin: 0px;
      font-size: 35px;
    }
    #share-space {
      line-height: 23px;
      font-size: 25px;
    }
    .side-header-text {
      margin-top: 0px;
      line-height: 1;
      P {
        font-size: 17px;
        color: rgb(8,15,40);
      }
      img {
        width: 5px;
      }
      h2 {
        font-size: 20px;
        margin: 0;
      }
    }
    .right-img {
      /* margin: 30px 0px; */
      display: none;
    }
    .ant-btn {
      font-size: 12px;
      border-radius: 20px !important;
    }
  }
`;
