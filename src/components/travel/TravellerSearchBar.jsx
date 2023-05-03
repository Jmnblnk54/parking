import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import AutoComplete from "react-google-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import styled from "styled-components";
import Group94 from "../../assets/Group94.png";
import LocationButton from "../common/locationbutton/LocationButton";
import PlaceAuto from "../Google Auto/PlaceAutocomplete";
import "./TravelSpot.css";
import "../../style/EditModal.css";

function TravellerSearchBar(props) {
  const onChangeStart = (date, dateString) => {
    props.setStartDate(dateString);
  };
  const onChangeEnd = (date, dateString) => {
    props.setEndDate(dateString);
  };
  const handleStartTime = (time, timeString) => {
    props.setStartTime(moment(time).format("HH:mm"));
  };
  const handleEndTime = (time, timeString) => {
    props.setEndTime(moment(time).format("HH:mm"));
  };
  const handlePlace = (address) => {
    props.setLocationSearch(address);
  };
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0])
          .then((latLng) => {
            props.setLocationSearch(address);
            props.setLocationCoords({
              latitude: latLng?.lat,
              longitude: latLng?.lng,
            });
          })
          .catch((error) => console.error("Error", error));
      })
      .catch((error) => console.error("Error", error));
  };

  const disableLeavingDate = (e) => {
    if (props.duration == "Half Day") {
      return (
        (e && e < moment(props.startDate)) ||
        (props.startDate && e > moment(props.startDate).add(2, "day"))
      );
    } else if (props.duration == "Daily") {
      return e && e < moment(props.startDate);
    } else if (props.duration == "Weekly") {
      return e && e < moment(props.startDate).add(6, "day");
    } else if (props.duration == "Monthly") {
      return e && e < moment(props.startDate).add(29, "day");
    }
  };

  const getDisabledHours = () => {
    if (props.startDate == moment().format("MM-DD-YYYY").toString()) {
      var hours = [];
      for (var i = 0; i < moment().add(2, "hours").hours(); i++) {
        hours.push(i);
      }
      return hours;
    }
  };
  const getEndDisabledHours = () => {
    const time = moment(props.startDate + " " + props.startTime).format(
      "MM-DD-YYYY H:mm"
    );

    if (props.startDate == props.endDate) {
      var hours = [];
      for (var i = 0; i < moment(time).add(2, "hours").hours(); i++) {
        hours.push(i);
      }
      return hours;
    } else {
      var hours = [];
      const sum =
        24 -
        (24 -
          Number(moment(props.startDate + " " + props.startTime).format("H")));

      for (var i = sum; i < 24; i++) {
        hours.push(i);
      }
      return hours;
    }
  };

  return (
    <Wrapper>
      <div className="left">
        <PlaceAuto
          value={props.LocationSearch}
          handleSelect={handleSelect}
          handlePlace={handlePlace}
        />
      </div>
      <div className="right">
        <div className="date-main">
          <div
            className="date-card"
            style={props.duration != "Half Day" ? { width: "48%" } : null}
          >
            STARTING ON
            <DatePicker
              format={
                props.duration != "Half Day"
                  ? "MM-DD-YYYY hh:mm a"
                  : "MM-DD-YYYY"
              }
              onChange={onChangeStart}
              showTime={props.duration != "Half Day"}
              minuteStep={30}
              disabledDate={(e) => {
                return e && e < moment().subtract(1, "day");
              }}
              disabledTime={(e) => {
                if (
                  moment(e).format("DD-MM-YYYY") ==
                  moment().format("DD-MM-YYYY")
                ) {
                  var hours = [];
                  for (var i = 0; i < moment().add(2, "hours").hours(); i++) {
                    hours.push(i);
                  }
                  return {
                    disabledHours: () => hours,
                  };
                }
              }}
            />
          </div>
          <div
            className="date-card"
            style={props.duration != "Half Day" ? { width: "48%" } : null}
          >
            LEAVING ON
            <DatePicker
              disabled={props.startDate == ""}
              format={
                props.duration != "Half Day"
                  ? "MM-DD-YYYY hh:mm a"
                  : "MM-DD-YYYY"
              }
              showTime={props.duration != "Half Day"}
              minuteStep={30}
              onChange={onChangeEnd}
              disabledDate={disableLeavingDate}
              disabledTime={(e) => {
                var hours = [];
                const sum =
                  24 - (24 - Number(moment(props.startDate).format("H")));
                for (var i = 0; i < 24; i++) {
                  if (i != sum) {
                    hours.push(i);
                  }
                }

                return {
                  disabledHours: () => hours,
                };
              }}
            />
          </div>
          {props.duration === "Half Day" && (
            <>
              <div className="date-card">
                FROM
                <TimePicker
                  showNow={false}
                  disabledHours={getDisabledHours}
                  minuteStep={30}
                  use12Hours
                  disabled={props.startDate == ""}
                  format="h:mm a"
                  // defaultValue={moment()
                  //   .add(2, "hours")
                  //   .subtract(
                  //     Number(moment().format("mm"), "minutes"),
                  //     "minutes"
                  //   )}
                  // disabledMinutes={() => [0, 30]}
                  onChange={handleStartTime}
                  hideDisabledOptions
                />
              </div>
              <div className="date-card">
                TO
                <TimePicker
                  showNow={false}
                  disabledHours={getEndDisabledHours}
                  minuteStep={30}
                  use12Hours
                  disabled={props.startTime == "" && props.startDate == ""}
                  format="h:mm a"
                  defaultValue={
                    props.startTime != "" &&
                    moment(props.startDateTime).add(1, "hours")
                  }
                  // disabledMinutes={() => [0, 30]}
                  onChange={handleEndTime}
                  hideDisabledOptions
                />
                {console.log("aa", props.startTime)}
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default TravellerSearchBar;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background: #4d9d74;
  .left,
  .right {
    flex: 1;
    margin: 15px;
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-input-affix-wrapper-lg {
      border-radius: 10px;
    }
    input {
      box-shadow: none;
      border: none;
      border-radius: 10px;
      width: 100%;
      padding: 10px 15px;
      color: black;
      border: 1px solid transparent;
      :focus-visible {
        outline: none;
        box-shadow: 0 0 5pt 1pt #b2fed7;
        border: 1px solid #b2fed8;
      }
    }
  }
  .right {
    margin-left: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .location-main {
      width: 30%;
      display: flex;
    }
    .date-main {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .date-card {
        display: flex;
        flex-direction: column;
        color: white;
        min-width: 10%;
        width: 24%;
        line-height: 13px;
        .ant-picker {
          border-radius: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 720px) {
    display: none;
    flex-direction: column;
    height: 100%;
    .right {
      margin: 0px 15px 15px 15px;
      flex-direction: column;
      .location-main {
        width: 70%;
        justify-content: center;
      }
      .date-main {
        margin-top: 15px;
        width: 100%;
      }
    }
  }
`;
