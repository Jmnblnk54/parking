import { ArrowLeftOutlined, InfoCircleFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Input,
  message,
  Modal,
  Popconfirm,
  Rate,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import React from "react";
import { DateRange } from "react-date-range";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import deleteIcon from "../../assets/Group81.svg";
import milesIcon from "../../assets/icons/milesIcon.svg";
import fire from "../../config/config";
import "../../style/EditSpotModal.css";
import PlacesAuto from "../Google Auto/PlaceAutocomplete";
import spotValidation from "../../functions/spotValidation.js";

const { Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

function MySpotCard({ data, getUpdatedData }) {
  const auth = localStorage.getItem("Auth Token");
  const userType = localStorage.getItem("User Type");
  const history = useHistory();

  const [loader, setLoader] = React.useState(false);
  const [state, setState] = React.useState([
    {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      key: "selection",
    },
  ]);
  const [editModal, setEditModal] = React.useState(false);
  const [editData, setEditData] = React.useState({
    dailyPrice: 0,
    endDate: "",
    halfDayPrice: 5,
    latitude: null,
    longitude: null,
    monthlyPrice: 0,
    noOfSpot: "",
    spotAddress: "",
    spotDescription: "",
    spotId: "",
    spotName: "",
    spotType: "",
    startDate: "",
    weeklyPrice: 0,
  });

  const onConfirm = (id) => {
    fire
      .firestore()
      .collection("spots")
      .doc(id)
      .delete()
      .then(() => {
        message.success("Spot Deleted");
      });
  };

  console.log(editData);

  const handleToggle = () => {
    setEditModal((prevState) => {
      if (prevState == true) {
        setEditData();
        return false;
      } else {
        setEditData(data);

        return true;
      }
    });
  };
  const handlePlace = (address) => {
    setEditData({
      ...editData,
      spotAddress: address,
    });
  };
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0])
          .then((latLng) => {
            setEditData({
              ...editData,
              spotAddress: address,
              latitude: latLng?.lat,
              longitude: latLng?.lng,
            });
          })
          .catch((error) => console.error("Error", error));
      })
      .catch((error) => console.error("Error", error));
  };

  const handleAmount = (amount) => {
    if (editData?.spotType === "Daily") {
      setEditData({
        ...editData,
        dailyPrice: amount,
      });
    } else if (editData?.spotType === "Weekly") {
      setEditData({
        ...editData,
        weeklyPrice: amount,
      });
    } else if (editData?.spotType === "Monthly") {
      setEditData({
        ...editData,
        monthlyPrice: amount,
      });
    } else if (editData?.spotType === "Half Day") {
      setEditData({
        ...editData,
        halfDayPrice: amount,
      });
    }
  };

  const handleUpdate = () => {
    setLoader(true);
    const response = spotValidation(editData);
    console.log(response);
    if (response === "All Clear") {
      fire
        .firestore()
        .collection("spots")
        .doc(data.spotId)
        .update({
          spotName: editData.spotName,
          spotType: editData.spotType,
          spotAddress: editData.spotAddress,
          noOfSpot: editData.noOfSpot,
          spotDescription: editData.spotDescription,
          halfDayPrice: editData.halfDayPrice,
          dailyPrice: editData.dailyPrice,
          weeklyPrice: editData.weeklyPrice,
          monthlyPrice: editData.monthlyPrice,
          startDate: editData.startDate,
          endDate: editData.endDate,
        })
        .then(() => {
          message.success("Successfully updated");
          setLoader(false);
        })
        .then(() => {
          handleToggle();
          getUpdatedData();
        })
        .catch(() => {
          message.error("Error updating spot");
          setLoader(false);
        });
    } else {
      message.error(response);
      setLoader(false);
    }
  };
  return (
    <Wrapper>
      <>
        <div className="spot-card-container">
          <div className="left">
            <div className="spot-image">
              <img
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 30,
                  objectFit: "cover",
                }}
                src={data.firstImageUrl}
                alt="spotImage.svg"
              />
            </div>

            <div className="center-details">
              <h3>{data.spotName}</h3>
              <div className="status">
                <label>Status: </label>
                <label
                  style={{
                    color:
                      data.status == "Rejected"
                        ? "red"
                        : data.status == "Approved"
                        ? "#4d9d74"
                        : "black",
                  }}
                >
                  {data.status}
                </label>
                {data.status == "Rejected" && (
                  <Tooltip
                    title="Your spot date is expired, kindly update the date and
                 wait for the parking associate authorization"
                  >
                    <InfoCircleFilled style={{ marginLeft: "5px" }} />
                  </Tooltip>
                )}
              </div>
              <div className="miles">
                <img src={milesIcon} alt="milesIcon.svg" />
                <span style={{ marginLeft: "5px" }}>{data.spotAddress}</span>
              </div>
              <div className="rating">
                <Rate disabled value={data.rating} />
              </div>
            </div>
          </div>

          <div className="right-details">
            <div className="amount">
              ${" "}
              {data?.spotType === "Daily"
                ? data?.dailyPrice
                : data?.spotType === "Weekly"
                ? data?.weeklyPrice
                : data?.spotType === "Monthly"
                ? data?.monthlyPrice
                : data?.spotType === "Half Day"
                ? data?.halfDayPrice
                : null}
            </div>
            <div className="buttons">
              <div className="buttons">
                <Popconfirm
                  title="Are you want to delete this spot？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => onConfirm(data.spotId)}
                >
                  <img
                    src={deleteIcon}
                    width={"22px"}
                    style={{ cursor: "pointer" }}
                    alt=""
                  />
                </Popconfirm>
              </div>
              <button className="book-now-button" onClick={handleToggle}>
                edit
              </button>
            </div>
          </div>
        </div>
        <Modal
          className="edit-spot-modal"
          visible={editModal}
          closable={false}
          footer={false}
        >
          <div className="top">
            <ArrowLeftOutlined onClick={handleToggle} />
            <h2>Edit Spot</h2>
          </div>
          <div className="main">
            <Row gutter={[15, 15]}>
              <Col md={12} lg={12}>
                <label>SPOT NAME</label>
                <Input
                  allowClear
                  name="spotName"
                  type="text"
                  placeholder="Enter Spot Name"
                  value={editData?.spotName}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      spotName: e.target.value,
                    });
                  }}
                />

                <label>SPOT TYPE</label>
                <Select
                  value={{
                    value: editData?.spotType,
                    label: editData?.spotType,
                  }}
                  options={[
                    { value: "Half Day", label: "Half Day" },
                    { value: "Daily", label: "Daily" },
                    { value: "Weekly", label: "Weekly" },
                    { value: "Monthly", label: "Monthly" },
                  ]}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      spotType: e,
                    })
                  }
                />
                <label>SPOT ADDRESS</label>
                <PlacesAuto
                  value={editData?.spotAddress}
                  handleSelect={handleSelect}
                  handlePlace={handlePlace}
                  noPlaceHolder
                />
                <label>NUMBER OF SPOTS</label>
                <Input
                  allowClear
                  type="number"
                  value={editData?.noOfSpot}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      noOfSpot: e.target.value,
                    });
                  }}
                />
                <label>DESCRIPTION</label>
                <Input
                  allowClear
                  value={editData?.spotDescription}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      spotDescription: e.target.value,
                    });
                  }}
                />
                <label>AMOUNT</label>
                <Input
                  allowClear
                  type="number"
                  prefix="$"
                  value={
                    editData?.spotType === "Daily"
                      ? editData?.dailyPrice
                      : editData?.spotType === "Weekly"
                      ? editData?.weeklyPrice
                      : editData?.spotType === "Monthly"
                      ? editData?.monthlyPrice
                      : editData?.spotType === "Half Day"
                      ? editData?.halfDayPrice
                      : null
                  }
                  onChange={(e) => handleAmount(e.target.value)}
                />
              </Col>
              <Col md={12} lg={12}>
                <DateRange
                  minDate={new Date()}
                  editableDateInputs={true}
                  onChange={(item) => {
                    setState([item.selection]);

                    setEditData({
                      ...editData,
                      startDate: item.selection.startDate.toUTCString(),
                      endDate: item.selection.endDate.toUTCString(),
                    });
                  }}
                  rangeColors={["#4d9d74", "#4d9d74", "#4d9d74"]}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </Col>
            </Row>
          </div>

          <div className="bottom">
            <Button loading={loader} onClick={handleUpdate} className="button">
              update spot
            </Button>
          </div>
        </Modal>
      </>
    </Wrapper>
  );
}

export default MySpotCard;

const Wrapper = styled.div`
  margin-bottom: 10px;
  .spot-card-container {
    background: #fff;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .spot-image {
    img {
      height: 125px;
    }
  }
  .ant-rate {
    color: #4d9d74;
    font-size: 12px;
    li {
      margin-right: 4px;
    }
  }

  .center-details {
    margin-left: 10px;
    h3 {
      margin: 0px;
      font-weight: bold;
      font-size: 19px;
    }
    .status {
      font-size: 16px;

      font-weight: bold;
    }
    .miles {
      margin-top: -3px;

      font-size: 14px;
    }
    .rating {
      margin-top: -3px;
    }
  }

  .right-details {
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .buttons {
    display: flex;
    align-items: center;
  }
  .amount {
    font-size: 22px;
    font-weight: bold;
  }

  .details-button {
    padding: 6px 20px;
    border: none;
    border-radius: 20px;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 5px;
    text-decoration: underline;
  }

  .book-now-button {
    background: #4d9d74;
    padding: 6px 20px;
    border: none;
    border-radius: 20px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 5px;
  }

  .book-now-button:hover {
    background: #6db992;
  }
  @media screen and (max-width: 900px) {
    .spot-card-container {
      display: flex;
      flex-direction: column;
      align-items: inherit;
    }
  }

  @media screen and (max-width: 500px) {
    .spots {
      display: flex !important;
      flex-direction: column !important;
    }
    .spots-container {
      width: 100%;
    }
  }
`;
