import React from "react";
import styled from "@emotion/styled";
import { ArrowBackIosNewRounded, ArrowBackRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, Col, Row } from "antd";
import { useHistory } from "react-router";
import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import house from "../../assets/icons/home/house.svg";

export default function About() {
  const history = useHistory();

  return (
    <div>
      <Navbar />
      <MainWrapper>
        <div className="top">
          <div className="back">
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIosNewRounded fontSize="small" />
            </IconButton>
            <span>go back</span>
          </div>

          <h1>What is Yugo?</h1>
          <h2>About Us</h2>
        </div>

        <Row className="main" gutter={[15, 15]}>
          <Col span={24}>
            <img width="300" src={house} />

            <div className="content">
              <h2>About us</h2>
            </div>
          </Col>
        </Row>
      </MainWrapper>
      <Footer />
    </div>
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
    position: relative;
    img {
      position: absolute;
      right: 0;
      top: -140px;
      z-index: 1;
    }
    .content {
      height: 100%;
      padding: 20px;
      background-color: white;
      border-radius: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    height: auto;
    padding: 10px 30px 30px 30px;
    .main {
      .content {
        padding: 15px;
        border-radius: 20px;
      }
    }
  }
`;
