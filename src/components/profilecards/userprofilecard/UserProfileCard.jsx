import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Rate, Row, Select, Upload } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import fire from "../../../config/config";
import MyReferralCode from "../../../view/HostProfile/settings/MyReferralCode";
import PaymentMethodModal from "../../../view/HostProfile/settings/PaymentMethodModal";
import Personalnformation from "../../../view/HostProfile/settings/Personalnformation";
import ImageUploader from "../../common/imageUploader/ImageUploader";

const { Option } = Select;

export default function UserProfileCard({ user, setUser }) {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

  const getBase64 = (file, fileName) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    var metadata = {
      contentType: "image/png",
    };
    reader.onload = () => {
      //setImage(reader.result);
      const docId = user?.docId;
      fire
        .storage()
        .ref(`images/${user.firstName + "" + user.userType}`)
        .putString(reader.result.split(",")[1], "base64", metadata)
        .then(() => {
          fire
            .storage()
            .ref("images/")
            .child(`${user.firstName + "" + user.userType}`)
            .getDownloadURL()
            .then((url) => {
              console.log(docId);
              fire
                .firestore()
                .collection("users")
                .doc(docId)
                .update({
                  profileImageUrl: url,
                })
                .then(() => {
                  console.log("UPDATED");
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e.code));
        });
    };
  };
  const onUploadProfileImage = (file) => {
    if (file.file.status == "done" || file.file.status == "error") {
      getBase64(file.file.originFileObj, file.file.originFileObj.name);
      // console.log("FileName", file.file.originFileObj.name);
    }
  };

  return (
    <>
      <Wrapper>
        <Card className="user-profile-card" bordered={false}>
          <Row gutter={[15, 5]} className="account-image-div">
            <Col>
              <div className="image-plus-Div">
                <div className="image-Div">
                  {user?.profileImageUrl === "" ? (
                    <ImageUploader image={image} />
                  ) : (
                    <ImageUploader
                      image={
                        user?.profileImageUrl ? user?.profileImageUrl : image
                      }
                    />
                  )}
                </div>
                <Upload onChange={onUploadProfileImage} showUploadList={false}>
                  <div className="plus-Div">
                    <PlusOutlined className="plus-icon" />
                  </div>
                </Upload>
              </div>
              {/* <img src={Group100} width={150} className="user-Image" /> */}
            </Col>
            <Col>
              <h2>
                {user?.firstName === ""
                  ? ""
                  : user?.firstName + "\t(" + user?.userType + ")"}
              </h2>
              <p>{user?.email}</p>
              {user?.referredBy != "" && (
                <p className="number">referred By: {user?.referredBy}</p>
              )}
              <p className="number">
                {user?.phoneNumber === "" ? "No Number" : user?.phoneNumber}
              </p>
              {user?.rating === "" ? (
                <Rate defaultValue={0} disabled />
              ) : (
                <Rate value={parseInt(user?.rating / 25)} disabled />
              )}
            </Col>
          </Row>
          <div className="Account-Para-Div">
            <p id="account-text">account settings</p>
          </div>
          <Row style={{ marginTop: "10px" }}>
            <Col className="personal-Info-Col">
              <div className="settings-li">
                <a onClick={() => setShowPersonal(true)}>
                  Personal Information
                </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="personal-Info-Col">
              <div className="settings-li">
                <a href onClick={() => setShowPaymentModal(true)}>
                  Payment Method
                </a>
              </div>
              {/* <Select
                defaultValue="payout method"
                className="personal-Info-Select"
              >
                <Option value="payout method">payout method</Option>
              </Select> */}
            </Col>
          </Row>
          {/* <Row>
            <Col className="personal-Info-Col">
              <div className="settings-li">
                <a>Listing Information</a>
              </div>
              // {/* <Select
              //   defaultValue="listing information"
              //   className="personal-Info-Select"
              // >
              //   <Option value="listinginformation">listing information</Option>
              // </Select> 
            </Col>
          </Row> */}
          <Row>
            <Col xs={24} className="personal-Info-Col">
              <div className="settings-li">
                <a onClick={() => setShowReferral(true)}>My Referral Code</a>
              </div>
              {/* <Select
                defaultValue="my referral code"
                className="personal-Info-Select"
              >
                <Option value="my referral code">my referral code</Option>
              </Select> */}
            </Col>
          </Row>
        </Card>
      </Wrapper>
      <Personalnformation
        user={user}
        setUser={setUser}
        show={showPersonal}
        setShow={setShowPersonal}
      />
      <MyReferralCode
        user={user}
        show={showReferral}
        setShow={setShowReferral}
      />
      <PaymentMethodModal
        show={showPaymentModal}
        setShow={setShowPaymentModal}
      />
    </>
  );
}
export const Wrapper = styled.div`
  .ant-upload {
    width: 0px;
  }
  .ant-rate {
    color: #4d9d74;
    font-size: 12px;
    li {
      margin-right: 4px;
    }
  }
  h1 {
    margin-bottom: 0.2em !important;
    line-height: 0.7;
  }
  .user-profile-card {
    border-radius: 20px;
    line-height: 0.7;
    min-height: 370px;
    width: 100%;
    h1 {
      margin: 0px;
      font-size: 40px;
      line-height: 0.7;
    }
    p {
      font-size: 14px;
      margin: 0px;
      margin-top: 16px;
    }
    .number {
      margin: 0px;
      margin-top: 7px;
      font-size: 14px;
    }
    #account-text {
      margin-top: 20px;
      text-transform: uppercase;
      color: #b5b4b4;
    }
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-bottom: 1px solid black !important;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    color: black;
    box-shadow: none !important;
    width: 100%;
  }
  .personal-Info-Col {
    width: 100%;
    .ant-select-selection-search {
      margin-left: -10px;
      width: 100%;
    }
    .ant-select-selection-item {
      margin-left: -10px;
    }
  }
  .personal-Info-Select {
    width: 100%;
  }
  .option-Personal-Info {
    margin-left: -10px;
    width: 100%;
  }
  .Account-Para-Div {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    p {
      width: 100%;
      height: 14px;
      margin-top: 35px;
    }
  }
  .image-plus-Div {
    display: flex;
    /* width: 0px; */
  }
  .plus-Div {
    background: #fff;
    cursor: pointer;
    outline: none;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: center;
    width: 30px;
    border-radius: 14px;
    position: relative;
    top: 5px;
    right: 44px;
    border: none;
    p {
      margin: 0px;
      font-size: 28px;
    }
  }
  .image-Div {

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #4d9d74;
    }
  }
  .account-image-div {
    display: flex;
    align-items: center;
  }
  .plus-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .settings-li {
    width: 100%;

    padding: 10px 0px;
    border-bottom: 1px solid black;

    a {
      color: black;
    }
  }

  @media screen and (max-width: 1045px) {
    #account-text {
      margin-top: 8px !important;
    }
  }
  @media screen and (max-width: 1300px) {
    .user-Image {
      width: 95px;
    }
    .user-profile-card {
      h1 {
        margin: 0px;
        margin-top: 15px;
      }
    }
    .image-Div {
      img {
        width: 105px;
        height: 105px;
        border-radius: 50%;
      }
    }
  }
`;
