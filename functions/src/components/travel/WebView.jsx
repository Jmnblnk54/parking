import React from "react";
import styled from "styled-components";
import SpotCard from "../spotCard/SpotCard";
import ToggleButtons from "../togglebuttons/ToggleButtons";
import spotImage from "../../assets/images/spot-image.svg";
import Map from "../map/Map";

import TravelSpotDetials from "./details/TravelSpotDetails";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import PlacesAuto from "../Google Auto/PlaceAutocomplete";
import { Bounce } from "react-activity";
import { IconButton, TextField } from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import SearchMap from "../map/SearchMap";
import { useLocation } from "react-router";

function WebView({
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
  centerCoords,
  locationCoords,
}) {
  return (
    <Wrapper>
      <div className="spots-container">
        <ToggleButtons duration={duration} handleDuration={handleDuration} />

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
      </div>
      <div className="travel-spot-details">
        <TravelSpotDetials
          maxheight={"300px"}
          visible={showDetails}
          setVisible={setShowDetails}
          spotId={sId.spotId}
          price={sId.price}
          onBooked={onBooked}
        />
      </div>
      {loader ? (
        <SearchMap
          locationData={locationData}
          data={data}
          setShowDetails={setShowDetails}
          setSpotId={setSpotId}
          centerCoords={centerCoords}
          locationCoords={locationCoords}
        />
      ) : null}
    </Wrapper>
  );
}

export default WebView;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  .spots-container {
    padding: 0px 30px 20px 30px;
    background: #eff0f2;
    width: 50%;
    height: 100%;

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
  }
  .travel-spot-details {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 720px) {
    display: none;
  }
`;
