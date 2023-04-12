import { Card } from "antd";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function MessageCard() {
  const history = useHistory();
  const userType = localStorage.getItem("User Type");
  return (
    <>
      <Wrapper>
        <Card
          className="user-profile-card"
          bordered={false}
          style={{ marginTop: "20px" }}
        >
          <h1 id="heading">MESSAGE INBOX</h1>
          <p>Click to chat</p>
          <div className="buttons">
            <button
              className="book-now-button"
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(
                  userType === "TRAVELER"
                    ? "/traveler/messages"
                    : "/host/messages"
                )
              }
            >
              view
            </button>
          </div>
          {/* <Row>
            <Col  xs={2}  sm={2} md={2} lg={2} xl={2}>
              <img width={60} src={Group62} alt="" />
            </Col>
            <Col xs={22}  sm={22} md={22} lg={22} xl={22}>
              <ul>
                <li>
                  <h2 className="name">&nbsp;SARAH C.</h2>
                </li>
                <li id="spot">&nbsp;SPOT 1</li>
                <li>&nbsp;Hello host,can i extend my stay</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col  xs={2}  sm={2} md={2} lg={2} xl={2}>
              <img width={60} src={Group62} alt="" />
            </Col>
            <Col xs={22}  sm={22} md={22} lg={22} xl={22}>
              <ul>
                <li>
                  <h1 className="name">&nbsp;NEVIN G.</h1>
                </li>
                <li id="spot4">&nbsp;SPOT4</li>
                <li>&nbsp;Hello host,can you help me find my spot?</li>
              </ul>
            </Col>
          </Row> */}
        </Card>
      </Wrapper>
    </>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  .user-profile-card {
    border-radius: 20px;
    margin-top: 20px;
    -webkit-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    -moz-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    .ant-card-body {
      padding: 5px 16px 11px 18px;
      h1 {
        margin: 0px;
      }
    }
    p {
      margin: 0px;
      margin-top: -5px;
    }
    .buttons {
      float: right;
      margin-top: -4px;
      img {
        vertical-align: top;
      }
    }
    .book-now-button {
      background: #4d9d74;
      padding: 4px 10px;
      width: 100px;
      border: none;
      border-radius: 20px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      margin-left: 5px;
    }
  }
`;
