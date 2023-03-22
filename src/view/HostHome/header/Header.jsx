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
        <div class="host-row">
          <div class="host-col">
            <h1>HOST WITH YUGO.</h1>
            <h2 id="share-space">
              SHARE YOUR SPACE.
              <br />
              BE YOUR OWN BOSS.
            </h2>
            <Row>
              <Col lg={24} xl={24} sm={24} md={12} xs={24}>
                <div className="side-header-text">
                  <h2>
                    <img src={circle} width={"12px"} alt="" />
                    &nbsp;Flexible schedule
                  </h2>

                  <p>list your space whenever you want.</p>

                  <h2>
                    <img src={circle} width={"12px"} alt="" />
                    &nbsp;Get paid how you want, when you want
                  </h2>

                  <p>
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
          </div>
          <div class="host-col">
            <img className="right-img" src={Group3} width={"100%"} alt="" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  height: 80vh;
  padding: 4%;

  h1 {
    font-family: arciform;
    line-height: 15px;
  }
  #share-space {
    line-height: 56px;
    font-size: 63px;
  }

  .right-img {
    width: 100%;
    max-width: 820px;
  }

  .host-col {
    width: 50%;
    display: flex;
    flex-basis: content;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    margin: auto;
  }

  .host-row {
    padding: 4%;
    width: 100%;
    display: flex;
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
