import React, { useState } from "react";
import Geocode from "react-geocode";
import { message } from "antd";
import { useHistory } from "react-router";
import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/common/navbar/Navbar";
import Info from "../../components/home/Info";
import YouFindYouGo from "../../components/home/YouFindYouGo";
import moment from "moment";
import fire from "../../config/config";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function Home() {
  Geocode.setApiKey("AIzaSyBOxLBtGvegxeM8SRG98JYzg_UZMa1aYrk");
  Geocode.enableDebug();

  const history = useHistory();
  const [spotType, setSpotType] = useState("");
  const [addressSearchByTraveler, setaddressSearchByTraveler] = useState("");
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const session = localStorage.getItem("Auth Token");
  const Usertype = localStorage.getItem("User Type");

  const HandleType = () => {
    if (session !== "" && Usertype === "TRAVELER") {
      if (spotType === "") {
        message.warning("Please Select Any Spot Type");
      } else if (addressSearchByTraveler === "") {
        message.warning("Address Required!");
      } else if (addressSearchByTraveler !== "" && spotType !== "") {
        const coords = { latitude: null, longitude: null };
        geocodeByAddress(addressSearchByTraveler)
          .then((results) => {
            getLatLng(results[0])
              .then((latLng) => {
                coords.latitude = latLng?.lat;
                coords.longitude = latLng?.lng;
                history.push("/traveler/search", {
                  searchedBy: "searchbyaddress",

                  spotType: spotType,
                  spotAddress: addressSearchByTraveler,
                  locationDetails: coords,
                });
              })
              .catch((error) => console.error("Error", error));
          })
          .catch((error) => console.error("Error", error));
      }
    } else {
      if (spotType === "") {
        message.warning("Please Select Any Spot Type");
      } else if (addressSearchByTraveler === "") {
        message.warning("Address Required!");
      } else if (addressSearchByTraveler !== "" && spotType !== "") {
        // console.log("spotType", spotType);
        history.push("/search", {
          searchedBy: "searchbyaddress",
          spotType: spotType,
          spotAddress: addressSearchByTraveler,
          locationDetails: locationData,
        });
      }
    }
  };

  const useMyLocation = () => {
    if (session !== "" && Usertype === "TRAVELER") {
      if (spotType === "") {
        message.warning("Please Select Any Spot Type");
      } else if (spotType !== "") {
        Geocode.fromLatLng(userLocation.latitude, userLocation.longitude).then(
          (response) => {
            const address = response.results[0];

            history.push("/traveler/search", {
              searchedBy: "searchbyuser",
              spotType: spotType,
              spotAddress: addressSearchByTraveler,
              locationDetails: locationData,
              userLocation: userLocation,
              userAddress: address,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } else {
      if (spotType === "") {
        message.warning("Please Select Any Spot Type");
      } else if (spotType !== "") {
        Geocode.fromLatLng(userLocation.latitude, userLocation.longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
            // console.log("spotType", spotType);
            history.push("/search", {
              searchedBy: "searchbyuser",
              spotType: spotType,
              spotAddress: addressSearchByTraveler,
              locationDetails: locationData,
              userLocation: userLocation,
              userAddress: address,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  };
  return (
    <>
      <Navbar />
      <YouFindYouGo
        spotType={spotType}
        setSpotType={setSpotType}
        addressSearchByTraveler={addressSearchByTraveler}
        setaddressSearchByTraveler={setaddressSearchByTraveler}
        handleMethod={HandleType}
        locationData={locationData}
        setLocationData={setLocationData}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        useMyLocation={useMyLocation}
      />
      <Info />
      <Footer />
    </>
  );
}
