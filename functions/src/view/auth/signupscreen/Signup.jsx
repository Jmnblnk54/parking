import React, { useState, useEffect } from "react";
import { Wrapper } from "./Signup.styled";
import { Input, Alert } from "antd";
import axios from "axios";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useHistory, useParams } from "react-router";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import fire from "../../../config/config";
import { SignupValidations } from "../../../functions/functions.js";
import { getCustomerId } from "../../../utils/keys";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 60,
    }}
    spin
  />
);

export default function IndexPage() {
  const history = useHistory();
  const val = history.location.pathname.includes("host").valueOf();
  const [showSpinner, setShowSpinner] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    error: "",
    type: "",
    checkBox: false,
    stripeAccountId: "",
    referral: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };
  console.log(values);

  const handleClick = () => {
    setShowSpinner(!showSpinner);
    const response = SignupValidations(values);
    console.log(response);

    if (response == "All Clear") {
      setValues({
        ...values,
        error: "",
      });

      if (values.referral != "") {
        fire
          .firestore()
          .collection("users")
          .where("myRefCode", "==", values.referral)
          .get()
          .then((e) => {
            if (e.empty) {
              setShowSpinner(false);

              setValues({
                ...values,
                error: "Referral code doesn't exist",
              });
            } else {
              postSignup();
            }
          });
      } else {
        postSignup();
      }
    } else {
      setShowSpinner(false);

      setValues({
        ...values,
        error: response,
      });
    }
  };

  const postSignup = () => {
    let uType = "";
    if (val) {
      uType = "HOST";
    } else {
      uType = "TRAVELER";
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((e) => {
        // setShowSpinner(false);

        e.user
          .sendEmailVerification()
          .then(() => console.log("Email Sent"))
          .catch((e) => {
            console.log(e.code);
          });
        if (uType === "TRAVELER") {
          // Traveler
          fire
            .firestore()
            .collection("users")
            .doc(e.user.uid)
            .set({
              userId: e.user.uid,
              email: e.user.email,
              token: e.user.refreshToken,
              userType: uType,
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: values?.phoneNumber,
              created: new Date(),
              balance: "",
              profileImageUrl: "",
              rating: "0",
              vehicleModel: "",
              vehicleYear: "",
              vehicleMake: "",
              vehicleColor: "",
              frontLicenseImage: "",
              backLicenseImage: "",
              LicensePlateNumber: "",
              stripeAccountId: null,
              referredBy: values.referral,
            })
            .then(() => {
              localStorage.setItem("Auth Token", e.user.refreshToken);
              localStorage.setItem("User Type", uType);
              localStorage.setItem("USERID", e.user.uid);
              console.log("FIRESTORE DONE");
              history.push("/traveler/search");
              window.location.reload(false);
              setShowSpinner(false);
              setValues({
                ...values,
                error: "success",
              });
            })
            .catch((e) => {
              setShowSpinner(false);
              setValues({
                ...values,
                error: e.code,
              });
            });
        } else {
          //HOST
          fire
            .firestore()
            .collection("users")
            .doc(e.user.uid)
            .set({
              userId: e.user.uid,
              email: e.user.email,
              token: e.user.refreshToken,
              userType: uType,
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: values?.phoneNumber,
              created: new Date(),
              balance: "",
              profileImageUrl: "",
              rating: "0",
              stripeAccountId: null,
              referredBy: values.referral,
            })
            .then(() => {
              localStorage.setItem("Auth Token", e.user.refreshToken);
              localStorage.setItem("User Type", uType);
              localStorage.setItem("USERID", e.user.uid);
              console.log("FIRESTORE DONE");
              history.push("/host/home");
              localStorage.setItem("SripeId", null);
              window.location.reload(false);
              setShowSpinner(false);
              setValues({
                ...values,
                error: "success",
              });
            })
            .catch((e) => {
              setShowSpinner(false);
              setValues({
                ...values,
                error: e.code,
              });
            });
        }
      })
      .catch((e) => {
        setShowSpinner(false);

        setValues({
          ...values,
          error: e.message,
        });
      });
  };

  return (
    <Wrapper>
      <div className="signup-container">
        <div className="bodyContent">
          <div className="top">
            <ArrowLeftOutlined onClick={() => history.goBack()} />
            <h2>Sign Up</h2>
          </div>
          <p>Please fill in this form to create an account!</p>

          <div className="inputField">
            <Input
              name="firstName"
              value={values.firstName}
              type="text"
              placeholder="FIRST NAME"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="inputField">
            <Input
              name="lastName"
              value={values.lastName}
              type="text"
              placeholder="LAST NAME"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="inputField">
            <PhoneInput
              countries={["US"]}
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={values.phoneNumber}
              onChange={(e) =>
                setValues({
                  ...values,
                  phoneNumber: e,
                })
              }
            />
          </div>

          <div className="inputField">
            <Input
              name="email"
              type="email"
              value={values.email}
              placeholder="EMAIL"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="inputField">
            <Input.Password
              name="password"
              placeholder="CREATE PASSWORD"
              onChange={(e) => handleChange(e)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>

          <div className="inputField">
            <Input.Password
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              onChange={(e) => handleChange(e)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="inputField">
            <Input
              name="referral"
              type="text"
              value={values.referral}
              placeholder="Referral Code"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* {history?.location?.pathname.includes("host") ? (
            <div className="inputField">
              <Input type="email" placeholder="CREDIT CARD" />
            </div>
          ) : null} */}

          <div className="bottomSection">
            <input
              type="checkbox"
              value={values.checkBox}
              onClick={() =>
                setValues({ ...values, checkBox: !values.checkBox })
              }
            />
            <p>
              I accept the{" "}
              <span
                style={{
                  color: "#79A182",
                  cursor: "pointer",
                }}
              >
                Terms of Use & Privacy Policy
              </span>
            </p>
          </div>
          <div>
            {values.error === "" ? null : (
              <Alert message={values.error} type="error" />
            )}
          </div>
          <div className="signin">
            <button className="signin-button" onClick={handleClick}>
              Sign up
            </button>
          </div>
          {/* <Modal visible={!isModalVisible} closable={false} footer={false}> */}
          {/* </Modal> */}
        </div>
      </div>
      {showSpinner ? (
        <div className="spinner">
          <Spin indicator={antIcon} />
        </div>
      ) : null}
    </Wrapper>
  );
}
