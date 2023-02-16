import { ArrowLeftOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";

import PhoneInput from "react-phone-number-input";
import fire from "../../../config/config";
import { Wrapper } from "./SettingsCard.styled";

function Personalnformation(props) {
  const [data, setData] = React.useState({
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    phoneNumber: props.user.phoneNumber,
    email: props.user.email,
  });

  React.useEffect(() => {
    if (props.show) {
      setData({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        phoneNumber: props.user.phoneNumber,
        email: props.user.email,
      });
    } else {
      setData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      });
    }
  }, [props.show]);

  const history = useHistory();

  const handleCancel = () => {
    props.setShow(false);
  };
  console.log(data);
  const onChangeInformation = () => {
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", localStorage.getItem("USERID"))
      .where("userType", "==", localStorage.getItem("User Type"))
      .onSnapshot((query) => {
        query.docs.forEach((doc) => {
          doc.ref
            .update({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phoneNumber: data.phoneNumber,
            })
            .then(() => props.setShow(false));
        });
      });
    // .update({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   phoneNumber: phoneNumber,
    // })
    // .then(() => {
    //   props.setShow(false);
    // });
  };
  return (
    <Wrapper>
      <Modal
        className="edit-modal"
        visible={props.show}
        closable={false}
        footer={false}
      >
        <div className="top">
          <ArrowLeftOutlined onClick={handleCancel} />
          <h2>Personal Information</h2>
        </div>

        <div className="main">
          <div className="row">
            <Input
              name="firstName"
              type="text"
              placeholder="CHANGE YOUR FIRST NAME"
              value={data.firstName}
              onChange={(e) => {
                setData({
                  ...data,
                  firstName: e.target.value,
                });
              }}
            />
          </div>

          <div className="row">
            <Input
              name="lastName"
              type="text"
              placeholder="CHANGE YOUR LAST NAME"
              value={data?.lastName}
              onChange={(e) => {
                setData({
                  ...data,
                  lastName: e.target.value,
                });
              }}
            />
          </div>

          <div className="row">
            <PhoneInput
              countries={["US"]}
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={data?.phoneNumber}
              onChange={(e) => {
                setData({
                  ...data,
                  phoneNumber: e,
                });
              }}
            />
          </div>

          <div className="row">
            <Input
              name="email"
              type="email"
              placeholder="CHANGE YOUR EMAIL"
              value={data?.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="bottom">
          <button onClick={() => onChangeInformation()} className="button">
            update profile
          </button>
        </div>
      </Modal>
    </Wrapper>
  );
}

export default Personalnformation;
