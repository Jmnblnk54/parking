import { CameraOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Upload } from "antd";
import fire from "../../config/config";

function UploadLicense(props) {
  //   const [frontImage, setfrontImage] = useState(null);
  //   const [backImage, setbackImage] = useState(null);
  const getFrontBase64 = (file, type) => {
    var reader = new FileReader();
    var metadata = {
      contentType: "image/png",
    };
    if (type === "FRONT") {
      reader.readAsDataURL(file);
      reader.onload = () => {
        fire
          .storage()
          .ref(`images/${props.data.docId}`)
          .putString(reader.result.split(",")[1], "base64", metadata)
          .then(() => {
            fire
              .storage()
              .ref("images/")
              .child(`${props.data.docId}`)
              .getDownloadURL()
              .then((url) => {
                props.setData({
                  ...props.data,
                  frontLicenseImage: url,
                });
              })
              .then(() => {
                console.log("URL FOUND");
              })
              .catch((e) => console.log(e.code));
          });
      };
    } else {
      reader.readAsDataURL(file);
      reader.onload = () => {
        fire
          .storage()
          .ref(`images/${props.data.docId}`)
          .putString(reader.result.split(",")[1], "base64", metadata)
          .then(() => {
            fire
              .storage()
              .ref("images/")
              .child(`${props.data.docId}`)
              .getDownloadURL()
              .then((url) => {
                props.setData({
                  ...props.data,
                  backLicenseImage: url,
                });
              })
              .then(() => {
                console.log("URL FOUND");
              })
              .catch((e) => console.log(e.code));
          });
        // props.setData({
        //   ...props.data,
        //   backLicenseImage: reader.result
        // })
      };
    }
  };

  const onUploadFrontImage = (file, type) => {
    if (file.file.status === "done" || file.file.status === "error") {
      getFrontBase64(file.file.originFileObj, type);
    }
  };
  return (
    <Wrapper>
      <div className="main-div">
        <div className="upload-license-div">
          <div className="header-div">
            <h1>Upload License</h1>
          </div>

          <div className="back-front-div">
            <div className="front-div">
              <div className="image-div">
                {props.data.frontLicenseImage ? (
                  <img
                    src={props.data.frontLicenseImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                ) : (
                  <>
                    <div className="text-div">
                      <p>Front of license</p>
                    </div>

                    <Upload
                      onChange={(e) => onUploadFrontImage(e, "FRONT")}
                      showUploadList={false}
                    >
                      <CameraOutlined
                        style={{
                          fontSize: "70px",
                          paddingBottom: "25px",
                          cursor: "pointer",
                        }}
                      />
                    </Upload>
                  </>
                )}
              </div>
            </div>
            <div className="back-div">
              <div className="image-div">
                {props.data.backLicenseImage ? (
                  <img
                    src={props.data.backLicenseImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                ) : (
                  <>
                    <div className="text-div">
                      <p>Back of license</p>
                    </div>

                    <Upload
                      onChange={(e) => onUploadFrontImage(e, "BACK")}
                      showUploadList={false}
                    >
                      <CameraOutlined
                        style={{
                          fontSize: "70px",
                          paddingBottom: "25px",
                          cursor: "pointer",
                        }}
                      />
                    </Upload>
                  </>
                )}
              </div>
            </div>
          </div>
          {props.data.backLicenseImage ? (
            <button
              className="add-btn"
              onClick={() => props.handleCarRegistration()}
            >
              update
            </button>
          ) : (
            <button
              className="add-btn"
              onClick={() => props.handleCarRegistration()}
            >
              add
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default UploadLicense;

const Wrapper = styled.div`
  .main-div {
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .upload-license-div {
    padding: 20px 10px 35px 10px;
  }
  .back-front-div {
    width: 100%;
    height: 100%;
  }
  .text-div {
    padding: 5px 0px 0px 5px;
    width: 100%;
    p {
      font-size: 10px;
      margin: 0px;
    }
  }
  .image-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 143px;
  }
  .anticon svg {
    margin-top: 20px;
  }
  .front-div,
  .back-div {
    background-color: #6e75732e;
    border-radius: 5px;
  }
  .back-div {
    margin-top: 10px;
  }
  .add-btn {
    margin-top: 10px;
    width: 100%;
    color: white;
    border: none;
    background: rgb(77, 157, 116);
    padding: 4px 10px;

    border: none;
    border-radius: 20px;
    color: rgb(255, 255, 255);
    font-size: 14px;
    cursor: pointer;
  }
`;
