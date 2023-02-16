import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Input, message, Modal } from "antd";
import { useHistory } from "react-router";

import PhoneInput from "react-phone-number-input";
import { Wrapper } from "./SettingsCard.styled";
import "../../../style/PaymentMethodModal.css";
import fire from "../../../config/config";
import { useEffect } from "react";

function PaymentMethodModal(props) {
  const handleCancel = () => {
    props.setShow(!props.show);
  };

  return (
    <Wrapper>
      <Modal
        className="editPayment-modal"
        visible={props.show}
        closable={false}
        footer={false}
      >
        <div className="top">
          <ArrowLeftOutlined onClick={handleCancel} />
          <h2>Payment Method</h2>
        </div>

        <div className="main">
          <div className="row">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Stripe</h2>
              {props.user?.stripeAccountId != null ? (
                <div>
                  {props.user?.stripeAccountId}{" "}
                  <button
                    className="button"
                    style={{ marginTop: 10 }}
                    onClick={() => {
                      props.setAddButton(!props.addButton);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  className="button"
                  onClick={() => window.open("https://dashboard.stripe.com/")}
                >
                  Connect
                </button>
              )}
            </div>

            {props.addButton == true ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Input
                  value={props.stripeAccount}
                  onChange={(e) => props.setStripeAccount(e.target.value)}
                  placeholder="Enter your stripe account ID here"
                  style={{
                    borderBottomWidth: 1,
                    marginTop: 10,
                    width: "80%",
                  }}
                />
                <button
                  className="button"
                  style={{ marginTop: 10 }}
                  onClick={props.handleAddClick}
                >
                  ADD
                </button>
              </div>
            ) : null}
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>PayPal</h2>
              <button className="button">Connect</button>
            </div>
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
}

export default PaymentMethodModal;
