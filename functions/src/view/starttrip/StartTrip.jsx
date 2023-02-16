import React from "react";
import { useGeolocated } from "react-geolocated";
import { useLocation } from "react-router";
import Navbar from "../../components/common/navbar/Navbar";
import GMapModal from "../../components/gmapmodal/GMapModal";
import DirectionMap from "../../components/map/DirectionMap";
import { Wrapper } from "./StartTrip.styled";

function StartTrip() {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  const [showModal, setShowModal] = React.useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  React.useEffect(() => {
    setTimeout(() => setShowModal(true), 10000);
  }, []);

  React.useEffect(() => {
    if (!isGeolocationAvailable) {
      alert("Yes");
    } else if (!isGeolocationEnabled) {
    } else if (coords) {
      setCurrentLocation({
        ...currentLocation,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  }, [coords]);

  const handleURL = () => {
    var url = "https://www.google.com/maps/dir/?api=1";
    var origin =
      "&origin=" + currentLocation.latitude + "," + currentLocation.longitude;
    var destination =
      "&destination=" +
      location?.state?.spotData.latitude +
      "," +
      location?.state?.spotData.longitude;
    var newUrl = new URL(url + origin + destination);

    var win = window.open(newUrl, "_blank");

    win.focus();
  };

  return (
    <Wrapper>
      <Navbar />
      <DirectionMap
        destinationName={location?.state?.spotData.spotName}
        destinationLatitude={location?.state?.spotData.latitude}
        destinationLongitude={location?.state?.spotData.longitude}
        currentLatitude={currentLocation.latitude}
        currentLongitude={currentLocation.longitude}
        setShowModal={setShowModal}
      />
      <GMapModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleURL={handleURL}
      />
    </Wrapper>
  );
}

export default StartTrip;
