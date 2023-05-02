import { ArrowLeftOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import PhoneInput from "react-phone-number-input";
import fire from "../../../config/config";
import { Wrapper } from "./SettingsCard.styled";

const PersonalInformation = ({
  show,
  user,
  handleSetUser,
  handleShowPersonal,
}) => {
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
  });

  useEffect(() => {
    if (show) {
      setData({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    } else {
      setData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      });
    }
  }, [show]);

  const history = useHistory();

  const handleCancel = () => {
    handleShowPersonal(false);
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
            .then(() => handleShowPersonal(false));
        });
      });
    // .update({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   phoneNumber: phoneNumber,
    // })
    // .then(() => {
    //   handleShowPersonal(false);
    // });
  };
  return (
    <Wrapper>
      <Modal
        className="edit-modal"
        visible={show}
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
};

export default PersonalInformation;
