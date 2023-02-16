import React from "react";
import styled from "styled-components";
import { useJsApiLoader } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";

const Marker = (props) => {
  const { color, name, id, rate } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: "pointer" }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};

const DataMap = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBOxLBtGvegxeM8SRG98JYzg_UZMa1aYrk",
  });

  // lat: 31.57636,
  // lng: -17.17967,

  const defaultProps = {
    center: {
      lat: Number(data[0]?.spotData?.latitude) || Number(data[0]?.latitude),
      lng: Number(data[0]?.spotData?.longitude) || Number(data[0]?.longitude),
    },
    zoom: 10,
  };
  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };

  return (
    <Wrapper>
      {isLoaded ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBOxLBtGvegxeM8SRG98JYzg_UZMa1aYrk" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={getMapOptions}
          yesIWantToUseGoogleMapApiInternals
        >
          {data?.map((val, index) => {
            return (
              <Marker
                lat={val?.spotData?.latitude || val?.latitude}
                lng={val?.spotData?.longitude || val?.longitude}
                name={val?.spotData?.spotName || val?.spotName}
                color="red"
              />
            );
          })}
        </GoogleMapReact>
      ) : null}
    </Wrapper>
  );
};

export default DataMap;

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

  .marker {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 35px;
    height: 35px;
    background-color: green;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    &:hover {
      z-index: 1;
    }
  }
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
