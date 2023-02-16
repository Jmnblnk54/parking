import { InfoCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Dropdown,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Tooltip,
  Upload,
} from "antd";
import React from "react";
import styled from "styled-components";
import fire from "../../config/config";
import PlaceAuto from "../Google Auto/PlaceAutocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
let count = 0;

export default function ListSpot(props) {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [fileList, setFileList] = React.useState([]);
  const handleCancel = () => setPreviewVisible(false);

  const handleChange = ({ fileList: newFileList, asd }) => {
    setFileList(newFileList);

    if (count === 0) {
      if (
        newFileList[0].status === "done" ||
        newFileList[0].status === "error"
      ) {
        count += 1;
        getFrontBase64(newFileList[0].originFileObj, "First Image");
        console.log("1\t" + count);
      }
    } else if (count === 1) {
      if (
        newFileList[1].status === "done" ||
        newFileList[1].status === "error"
      ) {
        count += 1;
        getFrontBase64(newFileList[1].originFileObj, "Second Image");
        console.log("2\t" + count);
      }
    } else if (count === 2) {
      if (
        newFileList[2].status === "done" ||
        newFileList[2].status === "error"
      ) {
        count += 1;
        getFrontBase64(newFileList[2].originFileObj, "Third Image");
        console.log("3\t" + count);
      }
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  const getFrontBase64 = (file, type) => {
    var reader = new FileReader();
    var metadata = {
      contentType: "image/png",
    };
    if (type === "First Image") {
      const docId = Math.floor(Math.random() * 1000000000000);
      message.loading("Image Uploading..");
      reader.readAsDataURL(file);
      reader.onload = () => {
        fire
          .storage()
          .ref(`images/${docId}`)
          .putString(reader.result.split(",")[1], "base64", metadata)
          .then(() => {
            console.log("Uploading");
            fire
              .storage()
              .ref("images/")
              .child(`${docId}`)
              .getDownloadURL()
              .then((url) => {
                console.log("URL FOUND");
                props.setData({
                  ...props.data,
                  firstImageUrl: url,
                });
              })
              .then(() => {
                return "Url Not Found";
              })
              .catch((e) => console.log(e.code));
          });
      };
    } else if (type === "Second Image") {
      const docId = Math.floor(Math.random() * 1000000000000);
      message.loading("Image Uploading..");
      reader.readAsDataURL(file);
      reader.onload = () => {
        fire
          .storage()
          .ref(`images/${docId}`)
          .putString(reader.result.split(",")[1], "base64", metadata)
          .then(() => {
            fire
              .storage()
              .ref("images/")
              .child(`${docId}`)
              .getDownloadURL()
              .then((url) => {
                props.setData({
                  ...props.data,
                  secondImageUrl: url,
                });
              })
              .then(() => {
                return "Url Not Found";
              })
              .catch((e) => console.log(e.code));
          });
      };
    } else {
      const docId = Math.floor(Math.random() * 1000000000000);
      message.loading("Image Uploading..");
      reader.readAsDataURL(file);
      reader.onload = () => {
        fire
          .storage()
          .ref(`images/${docId}`)
          .putString(reader.result.split(",")[1], "base64", metadata)
          .then(() => {
            fire
              .storage()
              .ref("images/")
              .child(`${docId}`)
              .getDownloadURL()
              .then((url) => {
                props.setData({
                  ...props.data,
                  thirdImageUrl: url,
                });
              })
              .then(() => {
                return "Url Not Found";
              })
              .catch((e) => console.log(e.code));
          });
      };
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handlePlace = (address) => {
    props.setData({
      ...props.data,
      spotAddress: address,
    });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0])
          .then((latLng) => {
            props.setData({
              ...props.data,
              spotAddress: address,
              latitude: latLng?.lat,
              longitude: latLng?.lng,
            });
            // props.setLocationData({
            //   ...props.locationData,
            //   latitude: latLng?.lat,
            //   longitude: latLng?.lng,
            // });
            // console.log(latLng?.lng, latLng?.lat);
          })
          .catch((error) => console.error("Error", error));
      })
      .catch((error) => console.error("Error", error));
  };
  return (
    <>
      <Wrapper>
        <Card className="list-spot" bordered={false}>
          <h1>List your spot</h1>
          <label>UPLOAD IMAGES</label>

          <>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </>
          <label>SPOT NAME</label>

          <Input
            allowClear
            value={props.data.spotName}
            onChange={(e) => {
              props.setData({
                ...props.data,
                spotName: e.target.value,
              });
            }}
          />
          <label>SPOT ADDRESS</label>
          <PlaceAuto
            value={props.data.spotAddress}
            handleSelect={handleSelect}
            handlePlace={handlePlace}
            noPlaceHolder
          />
          {/* <Input
            allowClear
            value={props.data.spotAddress}
            onChange={(e) => {
              props.setData({
                ...props.data,
                spotAddress: e.target.value,
              });
            }}
          /> */}
          <label>NUMBER OF SPOTS</label>
          <Input
            allowClear
            value={props.data.noOfSpot}
            onChange={(e) => {
              props.setData({
                ...props.data,
                noOfSpot: e.target.value,
              });
            }}
          />
          <label>DESCRIPTION</label>
          <Input
            allowClear
            value={props.data.spotDescription}
            onChange={(e) => {
              props.setData({
                ...props.data,
                spotDescription: e.target.value,
              });
            }}
          />
          <label>
            AVAILABILITY
            <span style={{ marginLeft: "10px", fontSize: "10px" }}>
              {" Select All That Apply".toUpperCase()}
              <Tooltip
                title="A host is allowed to specify the availability of their spot. 
              Please choose your preference on how you want travelers to book their spot. 
              You may select any or all of the following:"
              >
                <InfoCircleFilled style={{ marginLeft: "5px" }} />
              </Tooltip>
            </span>
          </label>

          <Row gutter={10}>
            <Col lg={6} xl={6}>
              <button
                className="list-btn"
                onClick={() => {
                  props.setHalfDay(!props.halfDay);
                  !props.halfDay
                    ? props.setData({ ...props.data, type: "Half Day" })
                    : props.setData({ ...props.data, type: "" });
                }}
              >
                HOURLY
              </button>
            </Col>
            <Col lg={6} xl={6}>
              <button
                className="list-btn"
                onClick={() => {
                  props.setDaily(!props.daily);
                  !props.daily
                    ? props.setData({ ...props.data, type: "Daily" })
                    : props.setData({ ...props.data, type: "" });
                }}
              >
                DAILY
              </button>
            </Col>
            <Col lg={6} xl={6}>
              <button
                className="list-btn"
                onClick={() => {
                  props.setWeekly(!props.weekly);
                  !props.weekly
                    ? props.setData({ ...props.data, type: "Weekly" })
                    : props.setData({ ...props.data, type: "" });
                }}
              >
                WEEKLY
              </button>
            </Col>
            <Col lg={6} xl={6}>
              <button
                className="list-btn"
                onClick={() => {
                  props.setMonthly(!props.monthly);
                  !props.monthly
                    ? props.setData({ ...props.data, type: "Monthly" })
                    : props.setData({ ...props.data, type: "" });
                }}
              >
                MONTHLY
              </button>
            </Col>
          </Row>
        </Card>
      </Wrapper>
    </>
  );
}
export const Wrapper = styled.div`
  .list-spot {
    background-color: white;
    border-radius: 30px;
    height: 550px;
    .list-btn {
      background-color: #4d9d74;
      border-radius: 8px;
      width: 100%;
      text-align: center;
      color: white;
      border: none;
      height: 25px;
      font-weight: normal;
      margin-top: 10px;
      cursor: pointer;
      :hover {
        background-color: #356e51;
      }
    }
  }

  .ant-input-lg,
  .ant-input-affix-wrapper {
    border-bottom: 1px solid #d9d9d9;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    box-shadow: none;
    padding: 2px;
    :hover {
      border-color: #40a9ff;
      border-right-width: 1px;
      z-index: 1;
    }
    .input-address {
      border-bottom: 1px solid #d9d9d9;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      box-shadow: none;
      padding: 2px;
      :focus-visible {
        outline: none;
        box-shadow: 0 0 5pt 1pt #b2fed7;
        border: 1px solid #b2fed8;
      }
    }
  }
`;
