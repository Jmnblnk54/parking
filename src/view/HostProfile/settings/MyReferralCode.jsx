import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal } from "antd";
import React from "react";
import styled from "styled-components";
import fire from "../../../config/config";

export default function MyReferralCode(props) {
  const [loader, setLoader] = React.useState(false);
  const [referralCode, setReferralCode] = React.useState("");
  const userId = localStorage.getItem("USERID");
  const type = localStorage.getItem("User Type");

  React.useEffect(() => {
    if (props.show) {
      if (props.user.myRefCode == undefined) {
        setReferralCode("");
      } else {
        setReferralCode(props.user.myRefCode);
      }
    }
  }, [props.show]);

  const handleCancel = () => {
    props.setShow(false);
  };

  const generateCode = () => {
    setLoader(true);
    fire
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .where("userType", "==", type)
      .onSnapshot((e) => {
        console.log(e.docs[0].data());
        const _data = e.docs[0].data();
        const arr = _data.email.split("@");
        const _code = arr[0] + "/" + type;

        e.docs[0].ref
          .update({
            myRefCode: _code,
          })
          .then(() => {
            setReferralCode(_code);
            setLoader(false);

            message.success("Referral Generated");
          })
          .catch(() => {
            message.error("Error Generating Referral");
          });
      });
  };

  return (
    <ModalWrapper
      visible={props.show}
      className="edit-modal"
      closable={false}
      footer={false}
    >
      <div className="top">
        <ArrowLeftOutlined onClick={handleCancel} />
        <h2>My referral Code</h2>
      </div>
      <div className="main" style={{ fontSize: "20px" }}>
        {referralCode == "" ? (
          "Please Generate Referral Code"
        ) : (
          <>
            <div className="referral">My referral code is:</div>
            <div className="code">
              {referralCode}{" "}
              <CopyOutlined
                onClick={() => {
                  navigator.clipboard.writeText(referralCode);
                  message.success("Text Copied");
                }}
              />
            </div>
          </>
        )}
      </div>
      {}
      <div className="bottom">
        <Button
          onClick={generateCode}
          className="button"
          loading={loader}
          style={{
            padding: "4px 15px",
            color: referralCode != "" && "black",
            background: referralCode != "" && "#c7c7c7",
          }}
          disabled={referralCode != ""}
        >
          generate code
        </Button>
      </div>
    </ModalWrapper>
  );
}

const ModalWrapper = styled(Modal)`
  .ant-modal-content,
  .ant-modal-body {
    height: auto;
    min-height: auto;
  }
`;
