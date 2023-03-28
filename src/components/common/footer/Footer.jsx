import React from "react";

import whiteLogoSvg from "../../../assets/icons/logo-white.svg";
import footerLogo from "../../../Assets1/footerLogo.svg";

import apple from "../../../assets/images/apple-store-badge.png";
import google from "../../../assets/images/google-play-badge.png";

import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagramSocialIcon.svg";
import twitter from "../../../assets/twitter.png";

import styled from "styled-components";
export default function Footer() {
  const userType = localStorage.getItem("User Type");

  return (
    <Wrapper>
      <div className="main">
        {/* <div className="mobile-div">
          <div className="top">
            <div className="title">DOWNLOAD OUR APP</div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="badges">
              <a href="https://play.google.com/store">
                <img src={google} />
              </a>
              <a href="https://www.apple.com/app-store/">
                <img src={apple} style={{ paddingTop: "20px" }} />
              </a>
            </div>
            <img
              id="square-logo"
              height={"120px"}
              width={"120px"}
              src={footerLogo}
            />
          </div>
        </div>
        <div className="mobile-div">
          <div className="top">
            <div className="title">SOCIALS</div>
          </div>
          <div className="social-icon">
            <a href="https://facebook.com">
              <img src={facebook} alt="" />
            </a>
            <a href="https://twitter.com">
              <img src={twitter} alt="" />
            </a>
            <a href="https://instagram.com">
              <img src={instagram} alt="" />
            </a>
          </div>
        </div> */}

        <div className="left">
          <div className="columns">
            <ul>
              <div className="top">
                <img className="logo" src={whiteLogoSvg} />
              </div>
              {userType === null ? (
                <>
                  <li>
                    <a href="/faq">FAQS</a>
                  </li>
                  <li>
                    <a href="/privacy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms">Terms and Conditions</a>
                  </li>
                  <li>
                    <a href="/about">Contact Us</a>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <div className="columns">
            <div className="top">
              <div className="title">HOST</div>
            </div>
            <ul>
              <li>
                <a href="/host/profile">My Profile</a>
              </li>
              <li>
                <a href="/host/listing">My Listing</a>
              </li>
              <li>
                <a href="/host/upcomingreservation">Upcoming Reservations</a>
              </li>
              <li>
                <a href="/">How it Works</a>
              </li>
            </ul>
          </div>
          <div className="columns">
            <div className="top">
              <div className="title">TRAVELER</div>
            </div>
            <ul>
              <li>
                <a href="/traveler/profile">My Profile</a>
              </li>
              <li>
                <a href="/traveler/trips">Upcoming Trips</a>
              </li>
              <li>
                <a href="/traveler/manage">Vehicle Information</a>
              </li>
              <li>
                <a href="/traveler/favorites">My Favorites</a>
              </li>
              <li>
                <a href="/">How it Works</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="divider" />
        <div className="right">
          <div className="columns mobile-hide">
            <div className="top">
              <div className="title">DOWNLOAD OUR APP</div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="badges">
                <a href="https://play.google.com/store">
                  <img src={google} />
                </a>
                <a href="https://www.apple.com/app-store/">
                  <img src={apple} style={{ paddingTop: "20px" }} />
                </a>
              </div>
              <img
                id="square-logo"
                height={"120px"}
                width={"120px"}
                src={footerLogo}
                alt=""
              />
            </div>
          </div>
          <div className="columns mobile-hide">
            <div className="top">
              <div className="title">SOCIALS</div>
            </div>
            <div className="social-icon">
              <a href="https://www.facebook.com/YugoPark-103906632191524">
                <img src={facebook} alt="" />
              </a>
              <a href="https://twitter.com/YugoPark">
                <img src={twitter} alt="" />
              </a>
              <a href="https://www.instagram.com/yugopark/?hl=en ">
                <img src={instagram} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  background-color: #1b233c;

  .main {
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 40px 50px;
    height: 300px;
    .left,
    .right {
      flex: 1;
      display: flex;
      justify-content: space-around;
    }
    .divider {
      height: 100%;
      width: 1px;
      background-color: white;
    }
    .columns {
      margin-right: 10px;
      .top {
        height: 70px;
        .title {
          font-size: 30px;
        }
      }
      .badges {
        display: flex;
        flex-direction: column;
        img {
          width: 170px;
        }
      }
      .social-icon {
        display: flex;
        flex-direction: row;
        img {
          margin: 5px;
        }
      }
      #square-logo {
        padding-left: 25px;
        margin-top: -13px;
      }
    }
    .columns ul {
      padding: 0px;
      li {
        list-style: none;
        line-height: 1.7;
        a {
          color: white;
        }
      }
      .logo {
        width: 120px;
      }
    }
    .mobile-div {
      display: none;
    }
  }
  @media screen and (max-width: 900px) {
    .main {
      padding: 20px 20px;

      .columns {
        .top {
          .title {
            font-size: 23px !important;
          }
        }
        .badges {
          img {
            width: 150px;
          }
        }
        .social-icon {
          img {
          }
        }
        #square-logo {
          width: 100px;
          padding-left: 15px;
          margin-top: -25px;
        }
        ul {
          li {
            a {
              font-size: 13px;
            }
          }
        }
        .logo {
          width: 100px !important;
        }
      }
    }
  }
  @media screen and (max-width: 720px) {
    .main {
      flex-direction: column;
      height: 100%;
      .left,
      .right {
        justify-content: space-between;
        .columns {
          margin: 0px;
        }
      }
      .left {
        margin-top: 10px;
        .columns {
          .top {
            height: 50px;
            display: flex;
            align-items: center;
          }
          .logo {
            width: 70px !important;
          }
        }
      }
      .right {
        .badges {
          width: 60%;
          img {
            width: 100%;
          }
        }
        #square-logo {
          width: 40%;
          padding: 0px 15px;
          margin-top: -22px;
        }
      }
      .columns ul li {
        line-height: 1;
        margin: 5px 0px;
      }
      .mobile-hide {
      }
      .mobile-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0px;

        .top {
          height: 50px;
          .title {
            font-size: 23px !important;
          }
        }
        .badges {
          display: flex;
          flex-direction: column;
          img {
            width: 150px;
          }
        }
        .social-icon {
          display: flex;
          flex-direction: row;
          img {
            margin: 5px;
          }
        }
        #square-logo {
          padding-left: 25px;
          margin-top: -13px;
        }
      }
    }
  }
`;
