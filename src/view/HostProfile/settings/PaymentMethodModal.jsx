import React, { useState, useEffect } from "react";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Input, message, Modal, Spin } from "antd";
import { useHistory } from "react-router";
import PhoneInput from "react-phone-number-input";
import { Wrapper } from "./SettingsCard.styled";
import "../../../style/PaymentMethodModal.css";
import fire from "../../../config/config";
import CreditCardInfo from "./CreditCardInfo";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function PaymentMethodModal(props) {
  const uId = localStorage.getItem("USERID");
  const [loader, setLoader] = React.useState(true);
  const [detailsCard, setDetailsCard] = useState([]);
  console.log(detailsCard, "detailsCard");
  const handleCancel = () => {
    props.setShow(!props.show);
  };


  //  if(detailsCard?.cards?.lenght == 1 ){
  //     detailsCard?.cards?.lenght = 0
  //   }else {
      
  //   }
  
  const handleRemoveCard = (stripeId) => {
    const filteredCards = detailsCard?.cards?.filter(
      (card) => card.stripeId !== stripeId
    );
    setDetailsCard((prevState) => ({ ...prevState, cards: filteredCards }));
    fire
    .firestore()
    .collection("card-details")
    .doc(uId)
    .set({ cards: filteredCards })
    .then(() => {
      message.success("Card Removed Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getCardDetails = async () => {
    setLoader(true);

    const data = [];
    await fire
      .firestore()
      .collection("card-details")
      .doc(uId)
      .get()
      .then((e) => {
        let cardData = e.data();
        cardData.docid = e.id;
        setDetailsCard(cardData);
        console.log(cardData);
        setLoader(false);
      });
  };

  useEffect(() => {
    getCardDetails();
  }, []);

  const stripePromise = loadStripe(
    "pk_test_51MrN6pIq1A3rEdJ0A41bxcc3WjTPyuNtkWsXF5CfKszJq5PBCGbPpIvaCPJ8Oi1EexcxCh6m867JTwtUgpNG2XFb00PoUgo4vx"
  );

  return (
    <Wrapper>
      <Modal
        className="editPayment-modal"
        visible={props.show}
        closable={false}
        footer={false}
      >
        {loader ? (
          <div>
            <Spin />
          </div>
        ) : (
          <>
            <div className="top">
              <ArrowLeftOutlined onClick={handleCancel} />
              <h2>Payment Method</h2>
            </div>

            <div className="main">
              <div className="row">
                <div style={{ width: "100%" }}>
                  {detailsCard?.cards?.map((card) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0px 10px 5px 10px",
                      }}
                    >
                      <span style={{fontSize:"18px", fontWeight:"600", fontFamily:"sans-serif"}}>
                      {card?.cardDetails.brand} **** {card?.cardDetails?.last4}{" "}</span>
                      <span>
                        <button
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleRemoveCard(card.stripeId);
                          }}
                        >
                          Remove
                        </button>
                      </span>
                    </div>
                  ))}

                  <div>
                    <Elements stripe={stripePromise}>
                      <CreditCardInfo
                        uId={uId}
                        getCardDetails={getCardDetails}
                      />
                    </Elements>
                  </div>
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
              {/* <div className="row">
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
          </div> */}
            </div>
          </>
        )}
      </Modal>
    </Wrapper>
  );
}

export default PaymentMethodModal;
