import { IconButton, TextField, useMediaQuery } from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import React, { useState } from "react";
import styled from "styled-components";
import spotImage from "../../assets/images/spot-image.svg";
import Map from "../../components/map/Map";
import SpotCard from "../spotCard/SpotCard";
import TravelSpotDetials from "./details/TravelSpotDetails";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import PlacesAuto from "../Google Auto/PlaceAutocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Bounce } from "react-activity";
import ToggleButtons from "../togglebuttons/ToggleButtons";

import CloseMapButton from "../closemapbutton/CloseMapButton";
import SearchMap from "../map/SearchMap";

function MobileView({
  loader,
  data,
  duration,
  handleDuration,
  showDetails,
  setShowDetails,
  sId,
  setSpotId,
  spotType,
  onBooked,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  LocationSearch,
  handlePlace,
  handleSelect,
  locationData,
  viewMap,
  setViewMap,
  centerCoords,
  locationCoords,
}) {
  return (
    <Wrapper>
      {viewMap ? (
        <>
          <div className="close-map">
            <CloseMapButton setViewMap={setViewMap} />
          </div>
          <div className="map-spot-details">
            <TravelSpotDetials
              maxheight={"300px"}
              visible={showDetails}
              setVisible={setShowDetails}
              spotId={sId.spotId}
              price={sId.price}
              onBooked={onBooked}
            />
          </div>
        </>
      ) : (
        <>
          <div className="spots-container">
            <ToggleButtons
              duration={duration}
              handleDuration={handleDuration}
            />

            {loader ? (
              data.length === 0 ? (
                <h1>No Spot Found</h1>
              ) : (
                <div className="spots-container-main">
                  {data.map((val, key) => {
                    return (
                      <>
                        <SpotCard
                          data={val}
                          key={key}
                          locationName={val?.spotName}
                          image={spotImage}
                          setShowDetails={setShowDetails}
                          showDetails={showDetails}
                          setSpotId={setSpotId}
                          sId={sId}
                          miles="3.1"
                          rate={
                            val?.spotType === "Daily"
                              ? val?.dailyPrice
                              : val?.spotType === "Weekly"
                              ? val?.weeklyPrice
                              : val?.spotType === "Monthly"
                              ? val?.monthlyPrice
                              : val?.spotType === "Half Day"
                              ? val?.halfDayPrice
                              : null
                          }
                          rating={data?.rating}
                          onBooked={onBooked}
                          spotId={val?.spotId}
                          spotType={spotType}
                        />
                      </>
                    );
                  })}
                </div>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Bounce size={30} color={"#4d9d74"} />
              </div>
            )}
            <button className="view-map-btn" onClick={() => setViewMap(true)}>
              view map
            </button>
          </div>

          <div className="travel-spot-details">
            {showDetails == false && (
              <>
                <div className="mobile-main">
                  <div className="title">
                    YOU FIND,&nbsp;YOU GO,&nbsp;YOU PARK.
                  </div>
                  <div className="mobile-search">
                    <PlacesAuto
                      value={LocationSearch}
                      handleSelect={handleSelect}
                      handlePlace={handlePlace}
                    />
                  </div>
                  <div className="date-main">
                    <div className="date-card">
                      STARTING ON
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDateTimePicker
                          className="date-input"
                          value={startDate}
                          minDateTime={moment()
                            .add(1, "hours")
                            .add(30, "minutes")}
                          minutesStep={30}
                          onChange={(e) =>
                            setStartDate(moment(e, "MM-DD-YYYY HH:mm"))
                          }
                          closeOnSelect
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              margin="dense"
                              error={false}
                              fullWidth
                              variant="filled"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="date-card" style={{ marginLeft: "10px" }}>
                      LEAVING ON
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDateTimePicker
                          className="date-input"
                          value={endDate}
                          maxDateTime={
                            spotType == "Half Day"
                              ? moment(startDate).add(22, "hours")
                              : spotType == "Daily"
                              ? moment(startDate)
                                  .add(29, "days")
                                  .add(24, "hours")
                              : spotType == "Weekly"
                              ? moment(startDate)
                                  .add(6, "days")
                                  .add(24, "hours")
                              : spotType == "Monthly"
                              ? moment(startDate)
                                  .add(29, "days")
                                  .add(24, "hours")
                              : null
                          }
                          shouldDisableTime={
                            spotType == "Daily"
                              ? (time, type) => {
                                  return (
                                    (moment(startDate).hour() == time
                                      ? false
                                      : true) &&
                                    (moment(startDate).minute() == time
                                      ? false
                                      : true)
                                  );
                                }
                              : null
                          }
                          minutesStep={30}
                          onChange={(e) =>
                            setEndDate(moment(e, "MM-DD-YYYY HH:mm"))
                          }
                          minDateTime={
                            spotType == "Half Day"
                              ? moment(startDate).add(2, "hours")
                              : spotType == "Daily"
                              ? moment(startDate).add(24, "hours")
                              : spotType == "Weekly"
                              ? moment(startDate)
                                  .add(6, "days")
                                  .add(24, "hours")
                              : spotType == "Monthly"
                              ? moment(startDate)
                                  .add(29, "days")
                                  .add(24, "hours")
                              : null
                          }
                          closeOnSelect
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              margin="dense"
                              fullWidth
                              error={false}
                              variant="filled"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <button className="submit-btn">submit</button>
                </div>
              </>
            )}
            <TravelSpotDetials
              maxheight={"300px"}
              visible={showDetails}
              setVisible={setShowDetails}
              spotId={sId.spotId}
              price={sId.price}
              onBooked={onBooked}
            />
          </div>
        </>
      )}
      {loader ? (
        <SearchMap
          locationData={locationData}
          data={data}
          setShowDetails={setShowDetails}
          setSpotId={setSpotId}
          centerCoords={centerCoords}
          locationCoords={locationCoords}
          viewMap={viewMap}
        />
      ) : null}
    </Wrapper>
  );
}

export default MobileView;

const Wrapper = styled.div`
  display: flex !important;
  flex-direction: column-reverse !important;
  height: 100%;
  width: 100%;
  .close-map {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 77.14px;
    padding: 10px 20px;
  }
  .map-spot-details {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    height: calc(100vh - 77.14px);
    padding: 20px;
    backdrop-filter: blur(0.7px);
  }
  .mobile-spots {
    display: block;
  }
  .spots-container {
    background: #eff0f2;
    width: 100%;
    height: 50%;
    z-index: 2;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .spots-container-main {
      overflow-y: scroll;
      height: calc(100% - 55px);
      padding-right: 10px;
      ::-webkit-scrollbar {
        -webkit-appearance: none !important;
      }
      ::-webkit-scrollbar:vertical {
        width: 12px !important;
      }
      ::-webkit-scrollbar:horizontal {
        height: 12px !important;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #4d9d74 !important;
        border-radius: 10px !important;
        border: 2px solid #ffffff !important;
      }
      ::-webkit-scrollbar-track {
        border-radius: 10px !important;
        background-color: #ffffff !important;
      }
    }
    .view-map-btn {
      display: block;
      margin-top: 10px;
      width: 100px;
      align-self: center;
      border-radius: 30px;
      border: none;

      background: #4d9d74;
      color: white;
      :hover {
        background: #6db992;
      }
    }
  }
  .travel-spot-details {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 77.14px;
    padding: 11px;
    backdrop-filter: blur(0.5px) brightness(60%);
    z-index: 1;

    transition: 0.5s;
    width: 100%;
    height: calc(50vh - 30px);
    .mobile-main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
      width: 100%;
      border-radius: 50px;
      .mobile-search {
        width: 100%;
        input {
          box-shadow: none;
          border: none;
          border-radius: 10px;
          width: 100%;
          padding: 10px 15px;
          color: black;
          border: 1px solid transparent;
        }
      }
      .title {
        color: white;
        font-size: 19px;
      }
      .date-main {
        display: flex;
        .date-card {
          font-size: 12px;
          color: white;
          .date-input {
            width: 100%;
            border-radius: 10px;
            background: white;
            margin: 0px;
            .MuiInputBase-input {
              font-size: 10px;
              /* height: 8px; */
              padding: 10px;
              color: red;
            }
          }
        }
      }

      .submit-btn {
        align-self: flex-end;
        border-radius: 30px;
        border: none;
        margin-top: 10px;
        padding: 0px 40px;
        background: #4d9d74;
        color: white;
        font-size: 12px;
      }
    }
  }
`;
