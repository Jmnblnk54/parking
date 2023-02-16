<<<<<<< HEAD
import GoogleMapReact, { fitBounds } from "google-map-react";
import React, { Component } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

const Marker = (props) => {
  const { color, name, id, rate } = props;
  return (
    <>
      <div
        onMouseUp={() => console.log("Ok")}
        onClick={() => {
          props.setSpotId({
            ...props.sId,
            spotId: id,
            price: rate,
          });
          props.setShowDetails(true);
        }}
        className="pin bounce"
        style={{ backgroundColor: color, cursor: "pointer" }}
        title={name}
      />
      <div className="pulse" />
    </>
  );
};

const SearchMap = (props) => {
  const location = useLocation();

  const defaultProps = {
    center: {
      lat: props.centerCoords.latitude,
      lng: props.centerCoords.longitude,
    },
    zoom: 11,
  };
  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      maxZoom: props.data.length == 0 ? 13 : null,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };

  console.log(props.data.length);
  const bounds = new window.google.maps.LatLngBounds();

  const centerLocation = new window.google.maps.LatLng(
    props.locationCoords?.latitude,
    props.locationCoords?.longitude
  );
  bounds.extend(centerLocation);

  return (
    <Wrapper style={props.viewMap ? { height: "100%" } : null}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBOxLBtGvegxeM8SRG98JYzg_UZMa1aYrk" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={getMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => map.fitBounds(bounds)}
      >
        {props?.data?.map((val, index) => {
          const location = new window.google.maps.LatLng(
            val?.latitude,
            val?.longitude
          );
          bounds.extend(location);

          return (
            <Marker
              key={index}
              id={val?.spotId}
              lat={val?.latitude}
              lng={val?.longitude}
              name={val?.spotName}
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
              color="red"
              setSpotId={props.setSpotId}
              setShowDetails={props.setShowDetails}
            />
          );
        })}

        <Marker
          lat={props.locationCoords?.latitude}
          lng={props.locationCoords?.longitude}
          name={"Current Location"}
          color="blue"
        />
      </GoogleMapReact>
    </Wrapper>
  );
};

export default SearchMap;

const Wrapper = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 720px) {
    width: 100%;
    height: 50%;
  }

  /* .marker {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    &:hover {
      z-index: 1;
    }
  } */
  .pin {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: #00cae9;
    position: absolute;
    transform: rotate(-45deg);
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -20px;
  }
  .pin:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #e6e6e6;
    position: absolute;
    border-radius: 50%;
  }

  .bounce {
    animation-name: bounce;
    animation-fill-mode: both;
    animation-duration: 1s;
  }

  .pulse {
    background: #d6d4d4;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 11px 0px 0px -12px;
    transform: rotateX(55deg);
    z-index: -2;
  }
  .pulse:after {
    content: "";
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #00cae9;
    animation-delay: 1.1s;
  }

  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translateY(-2000px) rotate(-45deg);
    }

    60% {
      opacity: 1;
      transform: translateY(30px) rotate(-45deg);
    }

    80% {
      transform: translateY(-10px) rotate(-45deg);
    }

    100% {
      transform: translateY(0) rotate(-45deg);
    }
  }
`;
=======
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
} from "@react-google-maps/api";
import GoogleMapReact, { fitBounds } from "google-map-react";
import React, { Component } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

const Marker = (props) => {
  const { color, name, id, rate } = props;
  return (
    <>
      <div
        onMouseUp={() => console.log("Ok")}
        onClick={() => {
          props.setSpotId({
            ...props.sId,
            spotId: id,
            price: rate,
          });
          props.setShowDetails(true);
        }}
        className="pin bounce"
        style={{ backgroundColor: color, cursor: "pointer" }}
        title={name}
      />
      <div className="pulse" />
    </>
  );
};

const SearchMap = (props) => {
  const location = useLocation();

  const defaultProps = {
    center: {
      lat: props.centerCoords.latitude,
      lng: props.centerCoords.longitude,
    },
    zoom: 11,
  };
  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      maxZoom: props.data.length == 0 ? 13 : null,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };

  console.log(props.data.length);
  const bounds = new window.google.maps.LatLngBounds();

  const centerLocation = new window.google.maps.LatLng(
    props.locationCoords?.latitude,
    props.locationCoords?.longitude
  );
  bounds.extend(centerLocation);

  return (
    <Wrapper style={props.viewMap ? { height: "100%" } : null}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBOxLBtGvegxeM8SRG98JYzg_UZMa1aYrk" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={getMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => map.fitBounds(bounds)}
      >
        {props?.data?.map((val, index) => {
          const location = new window.google.maps.LatLng(
            val?.latitude,
            val?.longitude
          );
          bounds.extend(location);

          return (
            <Marker
              key={index}
              id={val?.spotId}
              lat={val?.latitude}
              lng={val?.longitude}
              name={val?.spotName}
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
              color="red"
              setSpotId={props.setSpotId}
              setShowDetails={props.setShowDetails}
            />
          );
        })}

        <Marker
          lat={props.locationCoords?.latitude}
          lng={props.locationCoords?.longitude}
          name={"Current Location"}
          color="blue"
        />
      </GoogleMapReact>
    </Wrapper>
  );
};

export default SearchMap;

const Wrapper = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 720px) {
    width: 100%;
    height: 50%;
  }

  /* .marker {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    &:hover {
      z-index: 1;
    }
  } */
  .pin {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: #00cae9;
    position: absolute;
    transform: rotate(-45deg);
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -20px;
  }
  .pin:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #e6e6e6;
    position: absolute;
    border-radius: 50%;
  }

  .bounce {
    animation-name: bounce;
    animation-fill-mode: both;
    animation-duration: 1s;
  }

  .pulse {
    background: #d6d4d4;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 11px 0px 0px -12px;
    transform: rotateX(55deg);
    z-index: -2;
  }
  .pulse:after {
    content: "";
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #00cae9;
    animation-delay: 1.1s;
  }

  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translateY(-2000px) rotate(-45deg);
    }

    60% {
      opacity: 1;
      transform: translateY(30px) rotate(-45deg);
    }

    80% {
      transform: translateY(-10px) rotate(-45deg);
    }

    100% {
      transform: translateY(0) rotate(-45deg);
    }
  }
`;
>>>>>>> 8f47c7faa3bd862495483af5c2bbc36bb399fa0a
