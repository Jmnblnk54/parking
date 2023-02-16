/*global google*/
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import styled from "styled-components";
import { DirectionsRenderer } from "@react-google-maps/api";

import milesIcon from "../../assets/icons/milesIcon.svg";
import clock from "../../assets/icons/clock.svg";
import SendToMobileRoundedIcon from "@mui/icons-material/SendToMobileRounded";
import { IconButton } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function DirectionMap({
  destinationName,
  destinationLatitude,
  destinationLongitude,
  currentLatitude,
  currentLongitude,
  setShowModal,
}) {
  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const [distance, setDistance] = React.useState(null);
  const [duration, setDuration] = React.useState(null);

  const places = [
    { latitude: currentLatitude, longitude: currentLongitude },
    {
      latitude: destinationLatitude,
      longitude: destinationLongitude,
    },
  ];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBOxLBtGvegxeM8SRG98JYzg_UZMa1aYrk",
  });

  React.useEffect(() => {
    calculateRoute();
  }, [places]);

  async function calculateRoute() {
    const waypoints = places.map((p) => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true,
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  return (
    <Wrapper>
      {isLoaded ? (
        <>
          <GoogleMap
            zoom={10}
            mapContainerStyle={containerStyle}
            options={{
              streetViewControl: false,
            }}
          >
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                polylineOptions: {
                  strokeColor: "red",
                },
              }}
            />
          </GoogleMap>
          {distance && duration ? (
            <div className="details-main">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Destination: {destinationName}</h2>

                <IconButton sx={{ ml: 2 }} onClick={() => setShowModal(true)}>
                  <SendToMobileRoundedIcon
                    style={{ color: "rgb(8, 15, 40)" }}
                  />
                </IconButton>
              </div>
              <div className="details-bottom">
                <div className="details-bottom-l">
                  <div>
                    <img
                      src={milesIcon}
                      style={{ marginRight: "5px", width: "20px" }}
                    />
                    <h3>{distance}</h3>
                  </div>
                  <div>
                    <img
                      src={clock}
                      style={{ marginRight: "5px", width: "20px" }}
                    />
                    <h3>{duration}</h3>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

export default DirectionMap;

const Wrapper = styled.div`
  height: calc(100vh - 114.25px);

  .details-main {
    border-radius: 20px;
    padding: 15px;
    position: relative;
    bottom: 135px;
    left: 15px;
    background-color: rgb(183, 216, 199);
    width: 300px;
    min-width: 250px;
    width: fit-content;
    h2,
    h3 {
      color: rgb(8, 15, 40);
    }
    h2 {
      margin: 0px;
    }
    h3 {
      margin: 0px;
    }
    .details-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .details-bottom-l {
        display: "flex";
        flex-direction: "column";
        div {
          display: flex;
        }
      }
    }
  }
  @media screen and (max-width: 999px) {
    height: calc(100vh - 77.14px);
  }
`;
