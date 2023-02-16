import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/navbar/Navbar";
import styled from "styled-components";
import { Col, Row } from "antd";
import WalletCard from "../../components/profilecards/walletcard/WalletCard";
import fire from "../../config/config";

export default function HostPayouts() {
  const [userData, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    balance: "",
  });
  const userId = localStorage.getItem("USERID");
  const uType = localStorage.getItem("User Type");
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
              });
            });
          }
        });
    }
    getData();
  }, [userId]);
  return (
    <Wrapper>
      <Navbar />
      <div
        style={{
          backgroundColor: "#e7f0eb",
          padding: "0px 30px 20px 30px",
        }}
      >
        <div className="host-payouts">
          <h1>MANAGE BALANCE</h1>
        </div>
        <Row
          align="middle"
          display="flex"
          justify="space-around"
          gutter={[20, 20]}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <WalletCard user={userData} />
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: rgba(77, 157, 116, 0.2);
  .host-payouts {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 10px;
    width: 100%;
    h1 {
      margin: 0px;
    }
  }
`;
