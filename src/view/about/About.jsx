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
              <p>
                <h3>Introducing Yugo:</h3> The game-changing app that's making
                parking a breeze! Imagine finding a secure parking spot or
                turning unused space into a cash-generating asset. With Yugo,
                we're making that dream a reality.
                <p>
                  {" "}
                  Born in Tampa, Florida in 2021, Yugo's mission is to
                  revolutionize parking by seamlessly connecting savvy travelers
                  with enterprising property owners. With just a few taps on our
                  user-friendly app, Yugo transforms the parking experience into
                  a hassle-free and enjoyable endeavor.
                </p>{" "}
                <p>
                  Our passionate team understands the daily struggles of finding
                  parking in today's fast-paced world. That's why we've crafted
                  a platform that caters to two distinct yet complementary
                  audiences:
                </p>
                <ol>
                  <li>
                    Travelers over 16 searching for the perfect parking spot
                    that guarantees safety and convenience
                  </li>
                  <li>
                    Property owners eager to capitalize on unused space and
                    generate effortless passive income
                  </li>
                </ol>
              </p>
              <p>
                <h3>Why choose Yugo?</h3> Picture this: No more circling the
                block, exorbitant parking fees, and no more stress! Instead,
                Yugo delivers a world of parking bliss, where secure spots are
                just a tap away and extra income streams right to your pocket.
                Get ready to embrace the future of parking with Yugo, where
                convenience, reliability, and affordability come together
                perfectly. Join the Yugo family today and experience the
                difference for yourself!
              </p>
              <p>
                <h2>
                  The Startling Reality of Parking Woes: Compelling Statistics
                  You Can't Ignore
                </h2>
                Did you know the challenges of finding a parking spot are more
                significant than you might think? The following eye-opening
                statistics reveal how stressful and time-consuming parking can
                be, particularly regarding beach, stadium, or event parking.
              </p>
              <p>
                <h3> Circling the Block:</h3> Research indicates that 30% of
                urban traffic is caused by drivers searching for parking spots.
                This wastes time and contributes to increased air pollution and
                stress levels.
              </p>
              <p>
                <h3> Time Drain:</h3> American drivers spend 17 hours per year
                searching for parking, costing them $345 per driver in wasted
                time, fuel, and emissions.
              </p>
              <p>
                <h3> Beach Parking Blues:</h3> During peak beach season, parking
                lots and street parking options often reach capacity early,
                forcing visitors to park far away from the beach or miss out on
                a day of fun in the sun…entirely.
              </p>
              <p>
                <h3>Stadium Struggles:</h3> A study of 30 major league sports
                stadiums found that over 40% of fans experienced difficulty
                finding parking, with some even missing the beginning of the
                game due to parking challenges.
              </p>
              <p>
                <h3> Event Parking Nightmares:</h3> At popular events and
                concerts, more than 60% of attendees reported difficulty in
                finding parking, often resorting to expensive or unsafe options.
                These alarming statistics highlight the urgent need for
                innovative parking solutions like Yugo. Our platform addresses
                these pain points head-on, providing a convenient and reliable
                alternative for travelers and property owners alike. Say goodbye
                to the frustration of parking and embrace a world where securing
                a spot is as simple as tapping a button!
              </p>
            </div>
          </Col>
        </Row>
      </MainWrapper>
      <Footer />
    </div>
  );
}

const MainWrapper = styled.div`
  /* height: calc(100vh - 114px); */
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
      font-size: 18px;
      height: 100%;
      padding: 20px;
      background-color: white;
      border-radius: 30px;
    }
    p {
      text-align: justify;
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
