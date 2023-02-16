import React, { useEffect, useState } from "react";
import { Alert, Card, Input, Modal } from "antd";
import Navbar from "../../components/common/navbar/Navbar";
import { Wrapper } from "./ManageBalance.styled";

import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import Icon from "@mui/material/Icon";
import { ReactComponent as BankIcon } from "../../assets/icons/bank.svg";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CreditCardInput from "react-credit-card-input";
import { ToastContainer, toast } from "react-toastify";
import fire from "../../config/config";
function ManageBalance() {
  const [transfer, setTransfer] = useState(1);
  const [isVisible, setVisible] = useState(false);
  const [walletData, setWalletData] = useState({
    balance: "",
    error: "",
  });
  const userType = localStorage.getItem("User Type");
  const currentUserId = localStorage.getItem("USERID");
  useEffect(() => {
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", currentUserId)
      .where("userType", "==", userType)
      .onSnapshot((query) => {
        query.forEach((doc) => {
          setWalletData({
            ...walletData,
            balance: doc.data().balance,
          });
        });
      });
  }, [currentUserId]);
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };
  return (
    <>
      <Navbar />

      <Wrapper>
        {walletData?.error === "" ? (
          ""
        ) : (
          <Alert message={walletData?.error} closable />
        )}
        <h1 className="title">MANAGE BALANCE</h1>
        <div className="main">
          <div className="top">
            <Card className="card" bordered={false}>
              <h2>MY YUGO WALLET</h2>
              <h1>
                {" "}
                {walletData?.balance === ""
                  ? "$00"
                  : "$" + "" + walletData?.balance}
              </h1>
            </Card>
          </div>
          <div className="mid">
            <Card
              className={
                transfer == 1
                  ? "card card-white card-active"
                  : "card card-white "
              }
              bordered={false}
              onClick={() => setTransfer(1)}
            >
              <OfflineBoltIcon
                style={{ fontSize: "4.0rem", fill: "#4d9d74" }}
              />
              <h3>
                {userType === "TRAVELER"
                  ? "Instant Deposit"
                  : "Instant Transfer"}
              </h3>
              <label>3.0% fee</label>
            </Card>
            <Card
              className={
                transfer == 2
                  ? "card card-white card-active"
                  : "card card-white "
              }
              bordered={false}
              style={{ marginLeft: "20px" }}
              onClick={() => setTransfer(2)}
            >
              <Icon component={BankIcon} style={{ fontSize: "4.0rem" }} />
              <h3>1-3 Business Days</h3>
              <label>No fee</label>
            </Card>
          </div>
          <div className="bot">
            <div className="fees">
              <h3>Fee</h3>
              {userType === "TRAVELER" ? (
                <>
                  {transfer == 1 ? <label>$3.00</label> : <label>No Fee</label>}
                </>
              ) : (
                <>
                  {transfer == 1 ? <label>$0.00</label> : <label>No Fee</label>}
                </>
              )}
            </div>
            <div className="fees">
              <h3>Transfer to</h3>
              <label>Visa... 1234</label>
            </div>
          </div>
          <button
            className="btn"
            onClick={() => {
              if (parseInt(walletData?.balance) > 0) {
                setVisible(!isVisible);
              } else {
                setWalletData({
                  ...walletData,
                  error: "Balance is insufficient funds",
                });
              }
            }}
          >
            Transfer $20
          </button>
          <Modal
            className="loginModal"
            visible={isVisible}
            closable={false}
            footer={false}
          >
            <ArrowLeftOutlined onClick={() => setVisible(!isVisible)} />
            <label>Amount</label>
            <Input
              placeholder="Enter Amount you want to deposit"
              type={"number"}
            />
            <CreditCardInput className="CreditCardInput" />
            <button className="btn" onClick={() => setVisible(!isVisible)}>
              DEPOSIT
            </button>
          </Modal>
        </div>
      </Wrapper>
    </>
  );
}

export default ManageBalance;
