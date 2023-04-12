import { Alert, Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import fire from "../../config/config";

import Navbar from "../../components/common/navbar/Navbar";
import FavoriteCard from "../../components/favoritecard/FavoriteCard";
import MessageCard from "../../components/profilecards/messagecard/MessageCard";
import UpcomingTrip from "../../components/profilecards/upcomingtripcard/UpcomingTrip";
import UserProfileCard from "../../components/profilecards/userprofilecard/UserProfileCard";
import WalletCard from "../../components/profilecards/walletcard/WalletCard";
import VehicleCard from "../../components/vehiclecard/VehicleCard";

export default function TravellerProfile() {
  const [userData, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    balance: "",
    rating: "",
    profileImageUrl: "",
    userType: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleColor: "",
    frontLicenseImage: "",
    backLicenseImage: "",
    LicensePlateNumber: "",
    docId: "",
  });
  const history = useHistory();
  const userId = localStorage.getItem("USERID");
  const uType = localStorage.getItem("User Type");
  const token = localStorage.getItem("Auth Token");
  const [error, setError] = useState("");
  useEffect(() => {
    async function getData() {
      await fire
        .firestore()
        .collection("users")
        .where("userId", "==", userId)
        .where("userType", "==", uType)
        .onSnapshot((query) => {
          if (query.size === 0) {
            console.log("NO FOUND");
            console.log("Hassan", uType);
          } else {
            query.forEach((e) => {
              setUser({
                email: e.data().email,
                firstName: e.data().firstName,
                lastName: e.data().lastName,
                phoneNumber: e.data().phoneNumber,
                balance: e.data().balance,
                rating: e.data().rating,
                profileImageUrl: e.data().profileImageUrl,
                userType: e.data().userType,
                vehicleModel: e.data().vehicleModel,
                vehicleYear: e.data().vehicleYear,
                vehicleMake: e.data().vehicleMake,
                vehicleColor: e.data().vehicleColor,
                frontLicenseImage: e.data().frontLicenseImage,
                backLicenseImage: e.data().backLicenseImage,
                LicensePlateNumber: e.data().LicensePlateNumber,
                myRefCode: e.data().myRefCode,
                docId: e.id,
                referredBy:
                  e.data().referredBy == undefined || e.data().referredBy == ""
                    ? ""
                    : e.data().referredBy,
              });
            });
          }
        });
    }
    getData();
  }, [userId]);
  // const SwitchToTraveler = () => {
  //   fire.firestore().collection("users").where("userId", "==", userId).where("userType", "==", "HOST")
  //     .get().then(e => {
  //       e.forEach(doc => {
  //         if (doc.data().userType === "HOST") {
  //           localStorage.clear();
  //           localStorage.setItem("Auth Token", doc.data().token);
  //           localStorage.setItem("USERID", doc.data().userId);
  //           localStorage.setItem("User Type", doc.data().userType);
  //           history.push("/host/home");
  //           window.location.reload();
  //         } else {
  //           console.log(doc.data())
  //           setError("No Host Account Exists!");
  //         }
  //       })
  //     })
  // }
  const SwitchToHost = () => {
    // console.log("UID", userData);
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .where("userType", "==", "HOST")
      .get()
      .then((e) => {
        if (e.docs.length === 0) {
          const docId = fire.firestore().collection("users").doc().id;
          fire
            .firestore()
            .collection("users")
            .doc(docId)
            .set({
              userId: userId,
              email: userData?.email,
              token: token,
              userType: "HOST",
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              phoneNumber: userData?.phoneNumber,
              created: new Date(),
              balance: "",
              profileImageUrl: userData?.profileImageUrl,
              rating: "0",
              stripeAccountId:
                userData?.stripeAccountId == undefined
                  ? ""
                  : userData?.stripeAccountId,
            })
            .then(() => {
              localStorage.clear();
              localStorage.setItem("Auth Token", userData?.token);
              localStorage.setItem("USERID", userId);
              localStorage.setItem("User Type", "HOST");
              window.location.reload(false);
              history.push("/host/profile");
            });
        } else {
          e.forEach((doc) => {
            console.log("Available");
            if (doc.data().userType === "HOST") {
              localStorage.clear();
              localStorage.setItem("Auth Token", doc.data().token);
              localStorage.setItem("USERID", doc.data().userId);
              localStorage.setItem("User Type", doc.data().userType);
              window.location.reload(false);
              history.push("/host/profile");
            }
          });
        }
      });
  };

  const handleDelete = () => {
    fire
      .firestore()
      .collection("users")
      .doc(userData?.docId)
      .update({
        vehicleModel: "",
        vehicleYear: "",
        vehicleMake: "",
        vehicleColor: "",
        frontLicenseImage: "",
        backLicenseImage: "",
        LicensePlateNumber: "",
      })
      .then(() => {
        message.success("Deleted Successfully");
      })
      .catch((e) => {
        message.error("Error deleting Vehicle");
        console.log(e.code);
      });
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <div class="profile-sub-wrap">
          {error ? <Alert message={error} closable /> : null}
          <div className="my-Profile">
            <h1>MY PROFILE</h1>
            <button
              style={{ cursor: "pointer" }}
              className="switch-btn"
              onClick={() => SwitchToHost()}
            >
              switch to host
            </button>
          </div>
          <Row
            display="flex"
            align="middle"
            justify="space-around"
            gutter={[20, 20]}
          >
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <UserProfileCard user={userData} setUser={setUser} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <WalletCard user={userData} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <UpcomingTrip />
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
              <VehicleCard user={userData} handleDelete={handleDelete} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <FavoriteCard />
            </Col>
          </Row>
        </div>
      </Wrapper>
    </>
  );
}

export const Wrapper = styled.div`
  background-color: rgba(77, 157, 116, 0.2);
  height: 100%;

  .profile-sub-wrap {
    background-color: #e7f0eb;
    padding: 30px 30px 20px 30px;
    height: 100%;
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
  }

  .profile-card-upcom {
    -webkit-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    -moz-box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
    box-shadow: 0px 0px 37px -3px rgba(194,194,194,1);
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
  .switchButton {
    width: 100%;

    border-radius: 20px;
    background-color: #080f28;
    color: white;
    height: 38px;
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
