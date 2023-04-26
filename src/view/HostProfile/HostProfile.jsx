import React, { useEffect, useState } from "react";
import { Col, message, Modal, Row, Spin } from "antd";
import MessageCard from "../../components/profilecards/messagecard/MessageCard";
import UpcomingReservation from "../../components/profilecards/upcomingcard/UpcomingCard";
import addNewSpot from "../../components/profilecards/addSpot/addSpot";
import {BrowserRouter as Router, useHistory } from "react-router-dom";
import HostProfileCard from "../../components/profilecards/hostprofileCard/Hostprofilecard";
import WalletCard from "../../components/profilecards/walletcard/WalletCard";
import Navbar from "../../components/common/navbar/Navbar";
// import { Wrapper } from "../spotNearMe/SpotNearMe.styled";
// import { useHistory } from "react-router";
import styled from "styled-components";
import HostSpot from "../../components/profilecards/hostSpot/hostSpot";
import fire from "../../config/config";
import { LoadingOutlined } from "@ant-design/icons";
import { Zoom } from "@mui/material";
import AddNewSpot from "../../components/profilecards/addSpot/addSpot";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 60,
      color: "black",
    }}
    spin
  />
);

export default function MyProfile() {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [userData, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    balance: "",
    rating: "",
    profileImageUrl: "",
    userType: "",
    docId: "",
  });
  const userId = localStorage.getItem("USERID");
  const uType = localStorage.getItem("User Type");
  const token = localStorage.getItem("Auth Token");
  console.log('this' + history);

  const [error, setError] = useState("");
  const [stripeAccount, setStripeAccount] = useState("");
  const [addButton, setAddButton] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .where("userType", "==", uType)
      .onSnapshot((query) => {
        if (query.size === 0) {
          console.log("NO FOUND");
        } else {
          query.forEach((e) => {
            setUser({
              email: e.data().email,
              firstName: e.data().firstName,
              lastName: e.data().lastName,
              phoneNumber: e.data().phoneNumber,
              wallet: e.data().wallet,
              rating: e.data().rating,
              profileImageUrl: e.data().profileImageUrl,
              userType: e.data().userType,
              docId: e.id,
              stripeAccountId: e.data().stripeAccountId,
              myRefCode: e.data().myRefCode,
            });
            setLoader(true);
            if (e.data().stripeAccountId == null) {
              setAddButton(true);
            }
          });
        }
      });
  }

  const SwitchToTraveler = () => {
    console.log("Button has been clicked");
    // console.log("UID", userData);
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .where("userType", "==", "TRAVELER")
      .get()
      .then((e) => {
        if (e.docs.length === 0) {
          const docId = fire.firestore().collection("users").doc().id;
          // console.log("docId", docId)
          fire
            .firestore()
            .collection("users")
            .doc(docId)
            .set({
              userId: userId,
              email: userData?.email,
              token: token,
              userType: "TRAVELER",
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              phoneNumber: userData?.phoneNumber,
              created: new Date(),
              balance: "",
              profileImageUrl: userData?.profileImageUrl,
              rating: "0",
              vehicleModel: "",
              vehicleYear: "",
              vehicleMake: "",
              vehicleColor: "",
              frontLicenseImage: "",
              backLicenseImage: "",
              LicensePlateNumber: "",
            })
            .then(() => {
              localStorage.clear();
              localStorage.setItem("Auth Token", userData?.token);
              localStorage.setItem("USERID", userId);
              localStorage.setItem("User Type", "TRAVELER");
              // localStorage.setItem("STRIPE_CUSTOMERID", userData?.customerId);
              window.location.reload(false);
              this.props.history.push("/traveler/profile");
            })
            .catch((e) => console.log(e));
        } else {
          e.forEach((doc) => {
            if (doc.data().userType === "TRAVELER") {
              localStorage.clear();
              localStorage.setItem("Auth Token", doc.data().token);
              localStorage.setItem("USERID", doc.data().userId);
              localStorage.setItem("User Type", doc.data().userType);
              window.location.reload(false);
              history.push("/traveler/profile");
            }
          });
        }
      });
  };

  const handleAddClick = () => {
    if (stripeAccount == "") {
      message.error("Stripe ID can not be empty", 5);
    } else {
      fire
        .firestore()
        .collection("users")
        .where("userId", "==", userId)
        .where("userType", "==", "HOST")
        .get()
        .then((e) =>
          e.docs[0].ref
            .update({
              stripeAccountId: stripeAccount,
            })
            .then(() => {
              setShow(!show);
              message.success("Stripe ID added successfully", 5);
              setAddButton(false);
              localStorage.setItem("StripeId", stripeAccount);
              getData();
            })
            .catch(() => {
              message.error("Error adding strip ID", 5);
            })
        )
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="profile-sub-wrap">
          {error ? (
            <Modal
              visible={error ? true : false}
              onCancel={() => setError("")}
              onOk={() => setError("")}
            ></Modal>
          ) : null}
          <div className="my-Profile">
            <h1>MY PROFILE</h1>

            <button
              className="switch-btn"
              style={{ cursor: "pointer" }}
              onClick={() => SwitchToTraveler()}
            >
              switch to traveler
            </button>
          </div>
          {loader ? (
            <>
              <Row
                display="flex"
                align="middle"
                justify="space-around"
                gutter={[20, 20]}
              >
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <HostProfileCard
                    user={userData}
                    handleAddClick={handleAddClick}
                    stripeAccount={stripeAccount}
                    setStripeAccount={setStripeAccount}
                    addButton={addButton}
                    setAddButton={setAddButton}
                    show={show}
                    setShow={setShow}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <WalletCard user={userData} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <UpcomingReservation />
                </Col>
              </Row>

              <Row
                gutter={[20, 20]}
                display="flex"
                align="middle"
                justify="space-around"
              >
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <MessageCard />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <HostSpot />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <AddNewSpot />
                </Col>
              </Row>
            </>
          ) : (
            <div className="spinner">
              <Spin indicator={antIcon} />
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  // height: calc(100% - 114.25px);
  height: 100%;

  .profile-sub-wrap {
    background-color: #e7f0eb;
    height: 100%;
    padding: 30px 30px 20px 30px;
    height: 100%;
  }
  .spinner {
    display: flex;
    justify-content: center;

    height: calc(100vh - 208px);
  }

  .my-Profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 10px;
    width: 100%;
    h1 {
      margin: 0px;
    }

    .switch-btn {
      width: 416px;
      outline: none;
      border-radius: 20px;
      background-color: #080f28;
      color: white;
      height: 38px;
      border: none;
    }
  }
  .switch {
    .switchButton {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 20px;
      background-color: #080f28;
      color: white;
      padding: 9px;
    }
  }

  @media screen and (max-width: 991px) {
    height: fit-content;
    .switch {
      height: fit-content !important;
      .switchButton {
        margin: 0px !important;
      }
    }

    .price-spot {
      width: 50%!important;
    }

    .availability-card {
      width: 50%!important;
    }

  }
  @media screen and (max-width: 670px) {
    .my-Profile {
      flex-direction: column;
      align-items: flex-start;
      .switch-btn {
        width: 100%;
      }
    }
  }
`;
