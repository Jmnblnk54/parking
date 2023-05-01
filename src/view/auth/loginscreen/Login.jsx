import {
  ArrowLeftOutlined,
  LoadingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Alert, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import Navbar from "../../../components/common/navbar/Navbar";
import fire, {
  signInWithFacebook,
  signInWithGoogle,
} from "../../../config/config";
import { LoginValidations } from "../../../functions/functions.js";
import LeftScreen from "../leftsection/LeftScreen";
import { Wrapper } from "./Login.styled";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const val = history.location.pathname.includes("host").valueOf();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setShowSpinner(true);
    const response = LoginValidations(values);
    console.log(response);

    if (response == "All Clear") {
      fire
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((e) => {
          fire
            .firestore()
            .collection("users")
            .where("userId", "==", e.user.uid)
            .onSnapshot((query) => {
              if (query.size === 0) {
                setShowSpinner(false);
                setValues({
                  ...values,
                  error: "No User Found",
                });
              } else {
                query.forEach((doc) => {
                  localStorage.setItem("USERID", doc.data().userId);
                  localStorage.setItem("Auth Token", doc.data().token);
                  localStorage.setItem("User Type", doc.data().userType);
                  if (doc.data().userType === "TRAVELER") {
                    history.push("/traveler/home");
                    window.location.reload(false);
                    setShowSpinner(false);
                    setValues({
                      ...values,
                      error: "success",
                    });
                  } else {
                    history.push("/host/home");
                    localStorage.setItem(
                      "StripeId",
                      doc.data().stripeAccountId
                    );
                    window.location.reload(false);
                    setShowSpinner(false);
                    setValues({
                      ...values,
                      error: "success",
                    });
                  }
                });
              }
            });
        })
        .catch((e) => {
          setShowSpinner(false);
          console.log("catch", e);
          if (e.code == "auth/invalid-email") {
            setValues({
              ...values,
              error: "Please enter a valid email address",
            });
          } else if (e.code == "auth/user-not-found") {
            setValues({
              ...values,
              error: "The provided email is not registered in our record",
            });
          } else if (e.code == "auth/wrong-password") {
            setValues({
              ...values,
              error: "Wrong password, please try again",
            });
          }
        });
    } else {
      setShowSpinner(false);
      setValues({
        ...values,
        error: response,
      });
      console.log("validation error");
    }
  };

  // async function getCustomerId(name, email) {
  //   const article = { name: name, email: email };
  //   const headers = {
  //     'Access-Control-Allow-Origin': "http://192.168.0.1:30006",
  //     'Content-Type': 'application/json; charset=utf-8',
  //   };
  //   await axios.post("http://192.168.0.117:3006/create-customer", article, { headers }).then(customer => {
  //     localStorage.setItem("STRIPE_CUSTOMERID", customer.data.id)
  //     console.log(customer.data.id);
  //   }).catch(err => { console.log(err) })
  // }
  const GoogleSignUp = async () => {
    let uType = "";
    const ref = fire.firestore().collection("users");
    await signInWithGoogle().then((e) => {
      if (val) {
        uType = "HOST";

        ref
          .where("userId", "==", e.user.uid)
          .where("userType", "==", uType)
          .get()
          .then((user) => {
            if (user.empty) {
              const DocID = ref.doc().id;
              ref
                .doc(DocID)
                .set({
                  userId: e?.user?.uid,
                  email: e?.user?.email,
                  token: e?.user?.refreshToken,
                  userType: uType,
                  firstName: e?.user?.displayName,
                  lastName: "",
                  phoneNumber: "",
                  created: new Date(),
                  balance: "",
                  profileImageUrl: "",
                  rating: "0",
                  stripeAccountId: "",
                })
                .then(() => {
                  localStorage.setItem("Auth Token", e?.user?.refreshToken);
                  localStorage.setItem("User Type", uType);
                  localStorage.setItem("USERID", e?.user?.uid);
                  history.push("/host/home");
                  window.location.reload(false);
                  setShowSpinner(false);
                });
            } else {
              user.forEach((doc) => {
                localStorage.setItem("Auth Token", doc?.data().token);
                localStorage.setItem("User Type", doc.data().userType);
                localStorage.setItem("USERID", doc.data().userId);

                history.push("/host/home");
                window.location.reload(false);
                setShowSpinner(false);
              });
            }
          });
      } else {
        uType = "TRAVELER";
        ref
          .where("userId", "==", e.user.uid)
          .where("userType", "==", uType)
          .get()
          .then((user) => {
            if (user.empty) {
              const DocID = ref.doc().id;
              console.log("DOCID", DocID);
              ref
                .doc(DocID)
                .set({
                  userId: e?.user?.uid,
                  email: e?.user?.email,
                  token: e?.user?.refreshToken,
                  userType: uType,
                  firstName: e?.user?.displayName,
                  lastName: "",
                  phoneNumber: "",
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
                  stripeAccountId: "",
                })
                .then(() => {
                  localStorage.setItem("Auth Token", e?.user?.refreshToken);
                  localStorage.setItem("User Type", uType);
                  localStorage.setItem("USERID", e?.user?.uid);
                  history.push("/traveler/home");
                  window.location.reload(false);
                  setShowSpinner(false);
                });
            } else {
              user.forEach((doc) => {
                localStorage.setItem("Auth Token", doc?.data().token);
                localStorage.setItem("User Type", doc.data().userType);
                localStorage.setItem("USERID", doc.data().userId);

                history.push("/traveler/home");
                window.location.reload(false);
                setShowSpinner(false);
              });
            }
          });
      }
    });
  };

  const FacebooksignIn = () => {
    signInWithFacebook()
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {});
  };
  return (
    <>
      <Wrapper>
        <Navbar />
        <div className="main">
          <LeftScreen />
          <div className="loginMain">
            <div className="bodyContent">
              <h2>Sign in</h2>
              <div className="login-options">
                <FacebookLoginButton
                  size="45px"
                  onClick={() => FacebooksignIn()}
                >
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "sans-serif",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    <span>Sign In with Facebook</span>
                  </div>
                </FacebookLoginButton>
                <GoogleLoginButton size="45px" onClick={() => GoogleSignUp()}>
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "sans-serif",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    <span>Sign In with Google</span>
                  </div>
                </GoogleLoginButton>
                <span>or</span>
                <GoogleLoginButton
                  className="email-button"
                  size="45px"
                  style={{ background: "#DA6060" }}
                  icon={MailOutlined}
                  iconColor="white"
                  onClick={
                    history?.location?.pathname.includes("host")
                      ? () => history.push("/host/signup")
                      : () => history.push("/traveler/signup")
                  }
                >
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  >
                    <span>Sign up with Email</span>
                  </div>
                </GoogleLoginButton>
              </div>
              <p className="forgotPassword">Forgot my password</p>
              <button className="signin-button" onClick={showModal}>
                Sign in
              </button>
              <Modal
                className="loginModal"
                visible={isModalVisible}
                closable={false}
                footer={false}
                transitionName=""
              >
                <div className="top">
                  <ArrowLeftOutlined onClick={handleCancel} />
                  <h2>Sign in</h2>
                </div>
                <div style={{ width: "100%" }}>
                  <div>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={(e) => handleChange(e)}
                      placeholder="Email"
                      type="email"
                      className="modal-login-input"
                    />
                    <div className="divider" />
                  </div>
                  <div>
                    <Input.Password
                      name="password"
                      value={values.password}
                      onChange={(e) => handleChange(e)}
                      placeholder="Password"
                      className="modal-login-input"
                    />
                    <div className="divider" />
                  </div>
                </div>
                {values.error === "" ? null : values.error === "success" ? (
                  <Alert
                    message={values.error}
                    type="success"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <Alert
                    message={values.error}
                    type="error"
                    style={{ width: "100%" }}
                  />
                )}
                <div className="bottom">
                  <a>Forgot my password</a>
                  {/* {history?.location?.pathname.includes("hosts") ? (
                <button
                  className="modal-button"
                  onClick={() => history.push("/host/profile")}
                >
                  SIGN IN
                </button>
              ) : ( */}
                  <button className="modal-button" onClick={handleSubmit}>
                    Sign in
                  </button>
                  {/* )} */}
                </div>
                {showSpinner ? (
                  <div className="spinner">
                    <Spin indicator={antIcon} />
                  </div>
                ) : null}
              </Modal>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
