import styled from "@emotion/styled";
import { ArrowBackIosNewRounded, ArrowBackRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, Col, Row } from "antd";
import React from "react";
import { useHistory } from "react-router";

export default function CommonInfoPage({ title, subtitle, children }) {
  const history = useHistory();
  return (
    <MainWrapper>
      <div className="top">
        <div className="back">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIosNewRounded fontSize="small" />
          </IconButton>
          <span>go back</span>
        </div>
        <Row gutter={[15, 0]}>
          <Col sm={24} md={16} lg={18}>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
          </Col>
          <Col xs={0} sm={0} md={8} lg={6}>
            <h1
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: "100%",
              }}
            >
              Need to get in touch?
            </h1>
          </Col>
        </Row>
      </div>
      <Row className="main" gutter={[15, 15]}>
        <Col xs={24} sm={24} md={16} lg={18}>
          <div className="left">{children}</div>
        </Col>
        <Col xs={24} sm={18} md={8} lg={6}>
          <Row>
            <Col xs={24} md={0}>
              <h1 style={{ margin: 0 }}>Need to get in touch?</h1>
            </Col>
            <Col className="right" span={24}>
              <h2>Yugo Support</h2>
              <Button className="btn">Contact us</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  height: calc(100vh - 114px);
  padding: 10px 40px 40px 40px;
  background-color: #eff0f2ff;
  .top {
    .back {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        margin-left: 10px;
      }
    }
    h1 {
      margin: 0;
    }
    h2 {
      margin: 0;
      color: #4d9d74;
      margin-bottom: 10px;
    }
  }
  .main {
    height: calc(100% - 109px);
    .left {
      height: 100%;
      padding: 20px;
      background-color: white;
      border-radius: 30px;
    }
    .right {
      padding: 20px;
      background-color: #070e2aff;
      border-radius: 30px;
      h2 {
        color: white;
      }
      .btn {
        width: 100px;
        background-color: #4d9d75ff;
        border: none;
        color: white;
        border-radius: 20px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    height: auto;
    padding: 10px 30px 30px 30px;
    .main {
      .left,
      .right {
        padding: 15px;
        border-radius: 20px;
      }
    }
  }
`;
