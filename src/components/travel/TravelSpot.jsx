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
import WebView from "./WebView";
import MobileView from "./MobileView";

function TravelSpot({
  loader,
  data,
  price,
  spotType,
  onBooked,
  locationData,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  LocationSearch,
  setLocationSearch,
  duration,
  handleDuration,
  centerCoords,
  locationCoords,
  setLocationCoords,
}) {
  const matches = useMediaQuery("(max-width:720px)");

  const [showDetails, setShowDetails] = useState(false);
  const [sId, setSpotId] = useState({
    spotId: "",
    price: "",
  });
  const [viewMap, setViewMap] = useState(false);

  const handlePlace = (address) => {
    setLocationSearch(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0])
          .then((latLng) => {
            setLocationSearch(address);
            setLocationCoords({
              latitude: latLng?.lat,
              longitude: latLng?.lng,
            });
          })
          .catch((error) => console.error("Error", error));
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <Wrapper>
      {!matches ? (
        <WebView
          loader={loader}
          data={data}
          duration={duration}
          handleDuration={handleDuration}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          sId={sId}
          setSpotId={setSpotId}
          spotType={spotType}
          onBooked={onBooked}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          LocationSearch={LocationSearch}
          handlePlace={handlePlace}
          handleSelect={handleSelect}
          locationData={locationData}
          centerCoords={centerCoords}
          locationCoords={locationCoords}
        />
      ) : (
        <MobileView
          loader={loader}
          data={data}
          duration={duration}
          handleDuration={handleDuration}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          sId={sId}
          setSpotId={setSpotId}
          spotType={spotType}
          onBooked={onBooked}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          LocationSearch={LocationSearch}
          handlePlace={handlePlace}
          handleSelect={handleSelect}
          locationData={locationData}
          viewMap={viewMap}
          setViewMap={setViewMap}
          centerCoords={centerCoords}
          locationCoords={locationCoords}
        />
      )}
    </Wrapper>
  );
}

export default TravelSpot;

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 194px);

  .list-button {
    background: #4d9d74;
    padding: 6px 30px;
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .list-button:hover {
    background: #6db992;
  }

  .mobile-main,
  .view-map-btn,
  .mobile-container {
    display: none;
  }
  @media screen and (max-width: 999px) {
    height: calc(100vh - 157.14px);
  }
  @media screen and (max-width: 720px) {
    height: calc(100vh - 77px);
  }
`;
